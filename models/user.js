
const monggoose = require('mongoose');
//monggoose.connect("mongodb://localhost:28080/");


const userSchema = monggoose.Schema({

    // declear variable..
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password:  {type: String,  default: ''},
    friends:[{
        friendName: {type: String, default: ' '}
    }]
});
module.exports = monggoose.model('User', userSchema);