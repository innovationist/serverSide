/**
 * 
 * @param {*} io 
 * @param {*} Clients 
 * @param {*} GroupChatCollector 
 * 
 * this will handle all groupchact operations,,
 * 
 * it will manage connected clients and also
 * collect all chat dumps.
 * and save chat to db
 * 
 * 
 */
module.exports = function(io, Clients, GroupChatCollector){
// listen for connection..

const clients = new Clients();
const chatGarbageCollector = new GroupChatCollector();

io.on('connection', (socket) =>{

    console.log( 'Socket is now open ' );

    // now set username for the added clients...
    socket.on('set-ion-username',(username)=>{
        console.log(`user connected to sock with  ${username.name} ${socket.id}`);

        // add users to client list....
       clients.AddNewClientData(socket.id, username.name);


        //change socket username to ....
        socket.username = username.name;

        // emit list of client to users...
        io.emit('user-list',{

            values:clients
        });

        // used for ion tost notificatioj
        io.emit('groupuser-status', {
            text: ` ${username.name} Has Joined Group`,
            status: 'ready',
            
            
        });


    });

    // so i am sending a message from ionic and i expect you to read and send to me too :)

    socket.on('message-from-ionUser', (message) =>{

        // collecting chat garbage 
        chatGarbageCollector.ChatGrbageCollector(socket.id,socket.username,message.text,new Date());

        if(chatGarbageCollector){
            const AddGroupChatToDatabase = require('../models/groupChatMessages');

           const save_chat_db = new  AddGroupChatToDatabase();

           
            save_chat_db.senderName =  socket.username;
            save_chat_db.messageBody = message.text;
           //{senderid:socket.id,senderName: message.username, messageBody: message.text}

           
           save_chat_db.save((err,chatdump) => {

            if(err){

                console.log(err);
            }else{

                console.log(chatdump);
            }

           });
        }

        // send message back to ion client
        io.emit('message-to-ion-user', {
            text: message.text,
            from: socket.username,
            date: new Date()
        });
        console.log(`users are ${socket.username}`);

      
    });

    socket.on('disconnect', (message)=>{

        clients.RemoveUser(socket.id);

        // now if client disconnet push to bulk dump database... (*** dont implement ****)


        io.emit('groupuser-status',{
            text: ` ${socket.username} Has Left`,
            status: 'not-ready'
        });
    });
});
};