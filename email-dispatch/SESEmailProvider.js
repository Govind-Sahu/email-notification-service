const AWS = require('aws-sdk');
const EmailProviderStrategy = require('./EmailProviderStrategy');

class SESEmailProvider extends EmailProviderStrategy {
    constructor() {
        super();
        this.ses = new AWS.SES({
            region: 'us-east-1', // Replace with your region
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }

    async sendEmail(email) {
        const params = {
            Source: 'your-email@example.com', // Replace with your verified sender email
            Destination: {
                ToAddresses: [email.to]
            },
            Message: {
                Subject: {
                    Data: email.subject
                },
                Body: {
                    Text: {
                        Data: email.body
                    }
                }
            }
        };

        return this.ses.sendEmail(params).promise();
    }
}

module.exports = SESEmailProvider;
