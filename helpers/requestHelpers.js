module.exports = function(res,req){

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
                newUser.save((err,user_) => {
    
                    console.log(user_);
    
                if(err){
                _res.json({
                    message: 'error unable account use a unique username',
                    error: true
                });
    
                }else{
    
                    const token = jwt.sign({name:newUser.username},'this-is-secret-key');
    
                _res.status(201).json({
                    message: 'registration sucessfull',
                    user_,
                    token : token,
                    error:false
                }); 
                 }
            
                });
             }}
            
        });
       
    }
    
    function login(_req,_res){
    
        const newUser = new User();
        
        newUser.email = _req.body.email;
        newUser.password = _req.body.password;
    
        User.findOne({'email': newUser.email}, (err, user_) =>{
            
            if(err){
                console.log("an error occured");
            }else{
                const token = jwt.sign({name:newUser.email},'this-is-secret-key');
    
                if(user_ != null){
                    _res.status(200).json({
                        user_,
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
           
         });
    }
    
    function protectedRoute(_req,_res){
        _res.json({message: 'welcome to the protected route '});
    }
    
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

};
