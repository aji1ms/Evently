import { transporter } from "../config/mail";

interface MailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendMail({ to, subject, html }: MailOptions) {
    await transporter.sendMail({
        from: `"Evently Team" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
    });
}
