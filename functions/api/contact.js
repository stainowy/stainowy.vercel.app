export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const { nickname, email, message, turnstileResponse } = await request.json();

        if (!nickname || !email || !message || !turnstileResponse) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        const turnstileVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${encodeURIComponent(env.TURNSTILE_SECRET)}&response=${encodeURIComponent(turnstileResponse)}`
        });

        const turnstileData = await turnstileVerify.json();
        if (!turnstileData.success) {
            return new Response(JSON.stringify({ error: 'Captcha verification failed' }), { status: 403 });
        }

        const discordPayload = {
            content: "<@1168212040737890404>",
            embeds: [
                {
                    title: "New Message",
                    description: "You have received a new message.",
                    color: "0x000",
                    fields: [
                        { name: "Nickname", value: `\`${nickname}\``, inline: true },
                        { name: "Email", value: `\`${email}\``, inline: true },
                        { name: "Message", value: `\`\`\`${message}\`\`\`` }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        context.waitUntil(
            fetch(env.DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discordPayload)
            })
        );

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (err) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}