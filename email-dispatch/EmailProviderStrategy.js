// EmailProviderStrategy.js
class EmailProviderStrategy {
    sendEmail(email) {
        throw new Error("Method 'sendEmail(email)' must be implemented.");
    }
}
class GmailEmailProvider extends EmailProviderStrategy {
    sendEmail(email) {
        console.log(`Sending email via Gmail: ${email.to}`);
        // Add Gmail email sending logic here
    }
}

class OutlookEmailProvider extends EmailProviderStrategy {
    sendEmail(email) {
        console.log(`Sending email via Outlook: ${email.to}`);
        // Add Outlook email sending logic here
    }
}

module.exports = EmailProviderStrategy, GmailEmailProvider,
OutlookEmailProvider;
