/**
 * 
 * @param {*} io 
 * 
 * this will handle all privatechact operations,,
 *  collect all chat dumps.
 */
module.exports = function(io){
    // listen for connection..

let sendersData = '';
io.on('connection', (socket) => { 


        // now set username for the added clients...
        socket.on('join-pm',(usersPM)=>{

            
            if(usersPM){

                socket.username = usersPM.name;
                sendersData = usersPM.sendersName;
            }

          console.log(socket.username);
          
        });
    //io.sockets.socket(usernames[usr]).emit('msg_user_handle', username, msg);
    // new rout for pm...
        socket.on('private-message',( message)=>{

                const AddPrivateChatToDatabase = require('../models/privateMessage');

                const save_chat_db = new AddPrivateChatToDatabase();

                save_chat_db.receiverName =  socket.username;
                save_chat_db.senderName =  sendersData;
                save_chat_db.messageBody = message.text;

                save_chat_db.save((err,chatdump) => {

                    if(err){
        
                        console.log(err);
                    }else{
        
                        //console.log(chatdump);
                    }
        
                   });
            

            console.log(message.text);
            
           
            io.emit('new-message-to-both', {

                text: message.text,
                date: new Date(),
                to:sendersData,
                from:socket.username

                
               
            });

            

            io.emit('message-display', {});
            //callback();
          });
    
          //console.log(user1+user2 + " hello");
        

});

};
