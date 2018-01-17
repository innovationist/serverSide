const monggoose = require('mongoose');
//monggoose.connect("mongodb://localhost:28080/");


const privateMessageSchema = monggoose.Schema({

    // declear variable..
    name:String,
    userid: {type: monggoose.Schema.Types.ObjectId, unique: true, ref: 'User'},
    friends:{type: String , deafult: ''}
}
);
module.exports = monggoose.model('AddFriend', privateMessageSchema );



