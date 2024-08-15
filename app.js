const express = require('express');
const EmailService = require('./email-dispatch/EmailService');
const DeliverabilityTracker = require('./deliverability-tracking/DeliverabilityTracker');
require('dotenv').config();
const app = express();
const emailService = new EmailService();
new DeliverabilityTracker();

app.use(express.json());

app.post('/send-email', async (req, res) => {
    const email = req.body;
    try {
        await emailService.sendEmail(email);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Failed to send email');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Email Notification Service running on port ${PORT}`);
});
