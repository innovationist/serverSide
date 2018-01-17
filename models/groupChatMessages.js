/**
 * mongoose schema
 */
const monggoose = require('mongoose');
//monggoose.connect("mongodb://localhost:28080/");


const groupMessageSchema = monggoose.Schema({

    // declear variable..
    senderName: {type: String },
    messageBody: {type: String},
    createdAt: {type: Date, default: Date.now}
});
module.exports = monggoose.model('AddGroupChatToDatabase', groupMessageSchema);