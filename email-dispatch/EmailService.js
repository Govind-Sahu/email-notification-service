const EmailProviderFactory = require('./EmailProviderFactory');
const { emailSentEvent } = require('../events/EmailEvents');
require('dotenv').config();

class EmailService {
    constructor() {
        this.primaryProvider = EmailProviderFactory.create('Gmail'); // Using Gmail as primary
        this.fallbackProvider = EmailProviderFactory.create('Outlook'); // Backup provider (Outlook)
        this.maxRetries = 3; // Maximum number of retries before switching to backup
    }

    async sendEmail(email) {
        let attempt = 0;
        let sent = false;

        while (attempt < this.maxRetries && !sent) {
            try {
                await this.primaryProvider.sendEmail(email);
                emailSentEvent.emit('sent', email); // Emit success event
                sent = true;
                console.log('Email sent successfully using the primary provider.');
            } catch (error) {
                attempt++;
                console.error(`Attempt ${attempt} failed: ${error.message}`);
            }
        }

        if (!sent) {
            console.log('Switching to backup provider...');
            try {
                await this.fallbackProvider.sendEmail(email);
                emailSentEvent.emit('sent', email); // Emit success event
                console.log('Email sent successfully using the backup provider.');
            } catch (fallbackError) {
                console.error('Failed to send email using the backup provider as well:', fallbackError.message);
                emailSentEvent.emit('failed', email); // Emit failure event
            }
        }
    }
}

module.exports = EmailService;
