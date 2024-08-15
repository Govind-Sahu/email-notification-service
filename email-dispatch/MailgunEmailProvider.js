const mailgun = require('mailgun-js');
const EmailProviderStrategy = require('./EmailProviderStrategy');

class MailgunEmailProvider extends EmailProviderStrategy {
    constructor() {
        super();
        this.domain = 'your-domain.com'; // Replace with your domain
        this.mailgun = mailgun({ 
            apiKey: process.env.MAILGUN_API_KEY, 
            domain: this.domain 
        });
    }

    async sendEmail(email) {
        const data = {
            from: `your-email@${this.domain}`, // Replace with your verified sender email
            to: email.to,
            subject: email.subject,
            text: email.body
        };

        return this.mailgun.messages().send(data);
    }
}

module.exports = MailgunEmailProvider;
