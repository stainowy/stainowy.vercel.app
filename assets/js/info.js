document.addEventListener("DOMContentLoaded", () => {
    const features = [
        {
            icon: "fa-code",
            title: "Junior Developer",
            text: "I'm a junior frontend and backend developer. I work primarily in Python and JavaScript."
        },
        {
            icon: "fa-gear",
            title: "Projects Coordinator",
            text: "I coordinate projects and manage the community. I have experience in managing people and tasks."
        },
        {
            icon: "fa-palette",
            title: "Amateur designer",
            text: "I create designs and mockups for various projects. I'm always looking to improve my skills."
        }
    ];

    const card = document.getElementById("feature-card");
    const icon = card.querySelector("i");
    const title = card.querySelector("h4");
    const text = card.querySelector("p");

    let index = 0;

    function updateCard() {
        card.classList.remove("visible");

        setTimeout(() => {
            index = (index + 1) % features.length;
            const current = features[index];

            icon.className = `fa-solid ${current.icon}`;
            title.textContent = current.title;
            text.textContent = current.text;

            card.classList.add("visible");
        }, 50);
    }

    setTimeout(() => {
        card.classList.add("visible");
    }, 100);

    setInterval(updateCard, 4000); 

});