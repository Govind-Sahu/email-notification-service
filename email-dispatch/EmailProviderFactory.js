const GmailEmailProvider = require('./GmailEmailProvider');
const OutlookEmailProvider = require('./OutlookEmailProvider');

class EmailProviderFactory {
    static create(providerName) {
        switch (providerName) {
            case 'Gmail':
                return new GmailEmailProvider();
            case 'Outlook':
                return new OutlookEmailProvider();
            default:
                throw new Error('Unknown provider');
        }
    }
}

module.exports = EmailProviderFactory;
