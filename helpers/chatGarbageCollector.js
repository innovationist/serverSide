/**
 * chat older
 */

class GroupChatCollector {

    constructor(){

        this.chatGarbageCollector = [];
        this.privatechatGarbageCollector = [];
    }

    ChatGrbageCollector(senderId, senderName, messageBody,dateCreated){

        let chatDumps = {senderId, senderName, messageBody,dateCreated};
        this.chatGarbageCollector.push(chatDumps);


        return chatDumps;
    }
   
   
}

module.exports = {GroupChatCollector};