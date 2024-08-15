const { emailSentEvent } = require('../events/EmailEvents');

class DeliverabilityTracker {
    constructor() {
        emailSentEvent.on('sent', (email) => this.trackDeliverability(email, 'success'));
        emailSentEvent.on('failed', (email) => this.trackDeliverability(email, 'failure'));
    }

    trackDeliverability(email, status) {
        console.log(`Email to ${email.to} ${status}.`);
        // Add logic to track and store deliverability status
    }
}

module.exports = DeliverabilityTracker;
