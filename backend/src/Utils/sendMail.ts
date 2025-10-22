import sgMail from '@sendgrid/mail';

interface MailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendMail({ to, subject, html }: MailOptions) {
    try {
        console.log('=====================================');
        console.log('📧 Sending email via SendGrid...');
        console.log('To:', to);
        console.log('From:', process.env.SENDGRID_FROM_EMAIL);
        console.log('API Key exists:', !!process.env.SENDGRID_API_KEY);
        console.log('=====================================');

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
        };

        const [response] = await sgMail.send(msg);

        console.log('✅ Email sent successfully via SendGrid!');
        console.log('Status code:', response.statusCode);
        console.log('Message ID:', response.headers['x-message-id']);
        console.log('=====================================');

        return response;
    } catch (error: any) {
        console.error('=====================================');
        console.error('❌ SendGrid email failed');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);

        if (error.response?.body) {
            console.error('Response body:', JSON.stringify(error.response.body, null, 2));
        }

        console.error('=====================================');
        throw error;
    }
}