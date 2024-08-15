const EventEmitter = require('events');
const emailSentEvent = new EventEmitter();

module.exports = { emailSentEvent };
