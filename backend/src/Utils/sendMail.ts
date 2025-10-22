import sgMail from '@sendgrid/mail';

interface MailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

export async function sendMail({ to, subject, html, text }: MailOptions) {
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error('SENDGRID_API_KEY not set in environment variables');
    }

    if (!process.env.SENDGRID_FROM_EMAIL) {
        throw new Error('SENDGRID_FROM_EMAIL not set in environment variables');
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to,
        from: {
            email: process.env.SENDGRID_FROM_EMAIL,
            name: 'Evently Team'
        },
        subject,
        html,
        text: text || subject,
    };

    const [response] = await sgMail.send(msg);
    return response;
}