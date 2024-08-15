const nodemailer = require('nodemailer');
const EmailProviderStrategy = require('./EmailProviderStrategy');

class GmailEmailProvider extends EmailProviderStrategy {
    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Your Gmail email address
                pass: process.env.GMAIL_PASS  // Your Gmail app password
            }
        });
    }

    async sendEmail(email) {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email.to,
            subject: email.subject,
            text: email.body
        };

        return this.transporter.sendMail(mailOptions);
    }
}

module.exports = GmailEmailProvider;
