
const monggoose = require('mongoose');
//monggoose.connect("mongodb://localhost:28080/");


const privateMessageSchema = monggoose.Schema({

    // declear variable..
    messageBody: {type: String},
    senderName: {type:String},
    receiverName:  {type: String},
    createdAt: {type: Date, deafulet: Date.now}
}
);
module.exports = monggoose.model('AddPrivateChatToDatabase', privateMessageSchema );