/**
 * this class will handdle connected clients activities
 */

class Clients {
    constructor(){

        this.clients = [];

    }

    AddNewClientData(id, username){
        let client = {id,username};
        this.clients.push(client);
        return client;
       
    }

  
    
    RemoveUser(id){
        let client = this.GetClient(id);
        if(client){
            // review assignment later
            this.clients = this.clients.filter((client) => client.id !== id);
            }
        }
    

    GetClient(id){

        let getClient = this.clients.filter((clientId) =>{
            return clientId.id === id; })[0];

        return getClient;
    }

    GetAllClientList(allNames){

        // review statments later
        let clients = this.clients.filter((clients) => clients.allNames === names);

        let clientNames = clients.map((client)=>{
            return client.allNames;
        });


        return clientNames;
    }
    

}
module.exports = {Clients};