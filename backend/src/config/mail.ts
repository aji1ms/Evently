const nodemailer = require("nodemailer");

console.log('🔧 Initializing email transporter...');
console.log('MAIL_USER:', process.env.MAIL_USER);
console.log('MAIL_PASS exists:', !!process.env.MAIL_PASS);

if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.error('⚠️  WARNING: MAIL_USER or MAIL_PASS not set in environment variables!');
}

// Try port 465 with secure connection (alternative to port 587)
// Some hosting providers block port 587 but allow 465
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

// Verify connection on startup
transporter.verify(function (error: any, success: any) {
    if (error) {
        console.error('❌ Email transporter verification failed:', error.message);
        console.error('This usually means SMTP ports are blocked or credentials are wrong');
    } else {
        console.log('✅ Email transporter is ready to send emails');
    }
});