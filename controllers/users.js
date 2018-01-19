/**
 * 
 * Created by INNOVATIONISTv1.2 on 1/16/2018.
 * the users script with handdle all the routes and also the funtion for the API....
 * JWT HS BEEN IMPLEMENTED....
 */

const User = require('../models/user');
const AddFriend = require('../models/addFriend');
const AddGroupChatToDatabase = require('../models/groupChatMessages');
const AddPrivateChatToDatabase = require('../models/privateMessage');
const jwt = require('jsonwebtoken');
const RequestHelper = require('../helpers/requestHelpers'); 





module.exports = function(_){

    return {
        SetRouting: function (router) {
            router.get('/', this.indexPage);
            router.get('/protected',verifyToken,this.protectedRout);
            router.get('/friendlist',this.friendslist);
            router.get('/getsavedprivatemessage', verifyToken,this.saveprivatemessageRoute);
            router.get('/getsavedgroupmessage', this.savegroupchatroute);


            router.post('/addnewuser', this.addNewUser);
            router.post('/addfriend',this.addFriendRoute);
            router.post('/login',this.logInUser);

        },
        indexPage: function(req, res){
            res.json('welcome to greate health network interview app');
        },
        addNewUser: function(req, res){
            AddNewUser(req,res);    
        },
        logInUser: function(req,res){
            login(req, res);
        },
        friendslist: function(req,res){
            friendslists(req,res);
        },
        protectedRout: function(req,res){
            protectedRoute(req,res);
        },
        addFriendRoute: function(req,res){
            newFriend(req,res);
        },
        saveprivatemessageRoute: function(req,res){
           getSavedPrivateMessage(req,res);
        },savegroupchatroute: function(req,res){
            getSavedGroupMessage(req,res);
        }

    };
};

// add to friends list AND STORE TO DB
function newFriend (_req,_res){

    const newFriend = new AddFriend();

    newFriend.userid = _req.body.id;
    newFriend.friends = _req.body.friendname;
    console.log( _req.body.id + _req.body.friendname);

    AddFriend.findOne({'friends':newFriend.friends}, (err, friend_)=>{

        if(err){
            console.log("an error occured");
        }else{

            if(friend_ != null){
                _res.status(200).json({
                    message:"friend already exist",
                    error: true
                });

        }else{

            newFriend.save((err,friend) => {

                if(err){
                    _res.status(200).json({
                        message: 'error unable to add friend',
                        error: true
                    }); 
                }else{
            
            
                    _res.status(201).json({
                        message: 'friend added',
                        friend,
                        error:false
                    }); 
                }
            
            });
        }
    }

    });
   
}


// get friend list FROM DB
function friendslists (_req,_res){


    AddFriend.find({}, (err, friendnames) => {

        console.log(friendnames);

        _res.status(201).json({
            
            friendnames,
            error:false
        }); 

    });
   
}


// not done AddPrivate ChatToDatabase
function getSavedPrivateMessage (_req,_res){

    AddPrivateChatToDatabase.find({}, (err, privateUsers) => {

        if(err){

            _res.status(200).json({
            
                message:'unable to get group chat',
                error:true
            }); 
    
        }else{
            _res.status(200).json({
            
                privateUsers,
                error:false
            }); 
    
        }

       

    });
   
}

// AddPGroupChatToDatabase
function getSavedGroupMessage (_req,_res){


    AddGroupChatToDatabase.find({}, (err, groupUsers) => {

        if(err){

            _res.status(200).json({
            
                message:'unable to get group chat',
                error:true
            }); 
    
        }else{
            _res.status(200).json({
            
                groupUsers,
                error:false
            }); 
    
        }

       

    });
}

//  create new user or  register.. no complicated verification added.....
function AddNewUser(_req,_res){

    //const idfromuser = {id:1};
    const newUser = new User();

    newUser.username = _req.body.username;
    newUser.email = _req.body.email;
    newUser.password = _req.body.password;
    // jwt

    User.findOne({'email': newUser.email}, (err, user_)=>{
        if(err){
           console.log("an error occured");
        }else{
           
            if(user_ != null){
                _res.status(200).json({
                    message:"user already exist",
                    error: true
                });
            }else{

                 // else create new user...
            newUser.save((err,user_details) => {

                console.log(user_details);

            if(err){
            _res.json({
                message: 'error unable account use a unique username',
                error: true
            });

            }else{

                const token = jwt.sign({name:newUser.username},'this-is-secret-key');

            _res.status(201).json({
                message: 'registration sucessfull',
                user_details,
                token : token,
                error:false
            }); 
             }
        
            });
         }}
        
    });
   
}


//  users login complicated verification added.....
//  users login complicated verification added.....
function login(_req,_res){

    const newUser = new User();
    
    newUser.email = _req.body.email;
    newUser.password = _req.body.password;

    User.findOne({'email': newUser.email}, (err, user_details) =>{
        
        if(err){
            console.log("an error occured");
        }else{

            if(user_details.password !== newUser.password){

                _res.status(200).json({
                    message: 'invalid email or password',
                    error:true
                });

            }else{
                
                const token = jwt.sign({name:newUser.email},'this-is-secret-key');

            if(user_details.email === newUser.email){
                _res.status(200).json({
                    user_details,
                    token:token,
                    error: false
                }); 
            }else{
                _res.status(200).json({
                    message: 'invalid email or password',
                    error:true
                });
            }
            }

            
        }
       
     });
}



// testing jwt verification rout
function protectedRoute(_req,_res){
    _res.json({message: 'welcome to the protected route '});
}

// verify  jwttoken function....
function verifyToken(req, res, next){
    const bearerHeader = req.headers["authorization"];

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }

}



