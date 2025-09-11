class GitHubContentLoader {
    constructor() {
        this.contentSelector = '.content';
        this.lastUpdate = null;
        this.enteredDate = null;

        const dataSourceElement = document.querySelector('[data-src]');
        if (!dataSourceElement) {
            throw new Error('No element with data-src found!');
        }

        this.githubRawUrl = dataSourceElement.getAttribute('data-src');
        this.init();
    }

    async init() {
        try {
            await this.loadContent();
        } catch (error) {
            this.handleError(error);
        }
    }

    async loadContent() {
        const response = await fetch(this.githubRawUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const content = await response.text();

        const processedContent = this.extractMetadata(content);
        const htmlContent = this.parseMarkdown(processedContent);
        this.insertContent(htmlContent);

        const lastUpdateSpan = document.getElementById("lastEdited")
        const enteredDateSpan = document.getElementById("enteredDate")

        if (lastUpdateSpan) lastUpdateSpan.textContent = this.lastUpdate;
        if (enteredDateSpan) enteredDateSpan.textContent = this.enteredDate;
    }

    extractMetadata(content) {
        const lines = content.split('\n');
        let contentStartIndex = 0;

        for (let i = 0; i < Math.min(5, lines.length); i++) {
            const line = lines[i].trim();

            if (line.startsWith('LAST_UPDATE:')) {
                this.lastUpdate = line.replace('LAST_UPDATE:', '').trim();
                contentStartIndex = Math.max(contentStartIndex, i + 1);
            } else if (line.startsWith('ENTERED:')) {
                this.enteredDate = line.replace('ENTERED:', '').trim();
                contentStartIndex = Math.max(contentStartIndex, i + 1);
            }
        }

        while (contentStartIndex < lines.length && lines[contentStartIndex].trim() === '') {
            contentStartIndex++;
        }
        return lines.slice(contentStartIndex).join('\n');
    }

    parseMarkdown(markdown) {
        let html = markdown;

        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

        html = html.replace(/^\* (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        html = html.replace(/```([^`]+)```/gs, '<pre><code>$1</code></pre>');

        html = html.replace(/<br>/g, '<br>');

        html = html.replace(/^\*\*(\d+\.\d+)\*\*/gm, '<strong>$1</strong>');

        html = html.split('\n\n').map(paragraph => {
            paragraph = paragraph.trim();
            if (!paragraph) return '';
            
            if (paragraph.startsWith('<') || paragraph.includes('<br>')) {
                return paragraph;
            }
            
            return `<p>${paragraph}</p>`;
        }).join('\n');

        return html;
    }

    insertContent(content) {
        const contentDiv = document.querySelector(this.contentSelector);
        if (!contentDiv) throw new Error(`Element with selector ${this.contentSelector} not found!`);

        contentDiv.style.opacity = '0';
        contentDiv.innerHTML = content;

        setTimeout(() => {
            contentDiv.style.transition = 'opacity 0.5s ease-in-out';
            contentDiv.style.opacity = '1';
        }, 100);
    }

    handleError(error) {
        console.error('GitHubContentLoader Error:', error);
        const contentDiv = document.querySelector(this.contentSelector);
        if (contentDiv) {
            contentDiv.innerHTML = `
                <div class="error-message" style="
                    border-radius: 5px;
                    margin: 20px 0;
                    padding: 20px;
                    color: #c33;
                ">
                    <h3>Error with loading a document</h3>
                    <p>Could not load or format file from Github.</p>
                    <p>This does not mean that the document is not binding. <a style="color: #c33;" href="https://github.com/stainowy/stainowy" target="_blank">Its version is available on Github</a></p>
                    <p>Try refreshing the page and inform our support about this problem with the error code: ${error.message}</p>
                </div>
            `;
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new GitHubContentLoader());
} else {
    new GitHubContentLoader();
}