const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const EmailProviderStrategy = require('./EmailProviderStrategy');

class OutlookEmailProvider extends EmailProviderStrategy {
    constructor() {
        super(); // Call the parent class constructor
        this.transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.OUTLOOK_USER, // Your Outlook email address
                pass: process.env.OUTLOOK_PASS  // Your Outlook password
            }
        });
    }

    async sendEmail(email) {
        const mailOptions = {
            from: process.env.OUTLOOK_USER,
            to: email.to,
            subject: email.subject,
            text: email.body
        };

        return this.transporter.sendMail(mailOptions);
    }
}

module.exports = OutlookEmailProvider;
