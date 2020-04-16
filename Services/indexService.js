/**
 * Author Shubham 
 * Service File For Mongoose functions
 * 
 */

const jwt = require("jsonwebtoken");
const mongoose=require("mongoose");
const User=require('../models/users');

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'./logs/logs.json',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );
const indexService={};

mongoose.connect(process.env.MONGO_LOCAL_CONN_URL,{ useUnifiedTopology: true, useNewUrlParser: true  })
  .then(() => {
  // log.info("Mongodb Connected");
  }).catch(err =>  log.error("Mongoose Connection Error",err));

indexService.getUserByUsername=async(username,password)=>{
    try {
        console.log("called");
        let user = await User.findOne({
          username: username,
          isactive:true
        });
        if (!user) {
          return {"status":false,message:"User Not Found"};
        } 
        else {
          // checking password here for user
          if (password == user.password && user.role=="admin") {
    
           
            // authentication success
            const token = jwt.sign({
              "username": user.username,
              "role": user.role,
              "time":new Date()
              
            }, "black", {
              expiresIn: "1h"
            })
    
            
           return {
               "status":true,
              "message": "Successfull Login",
              "token": token,
              "user": user.username,
              "role": user.role,
            
              
            }
    
          } else {
           
            return{
              "status":false,
              "message": "Wrong Password or Username"
            }
          }
        }
      } catch (err) {
        console.log(err);
       // log.error({type:"error while requesting username",date:new Date(),error:err});
        return{
            status:false,
            message:"Internal Server Error Occurred"
        }
      }
    


}

indexService.oauthLogin=async(data)=>{

  try {
    let user = await User.findOne({
      username: data.email,
      isactive:true
    });
    if (!user) {
      // register user here
      let _user =new User({
        username: data.email,
      isactive:true,
      role:"user",
      password:data.email,
      email:data.email,
      name:data.name,

      })

      await _user.save();

     // signing in user

      // authentication success
      const token = jwt.sign({
        "username": data.email,
        "role": "user",
        "time":new Date()
        
      }, "black", {
        expiresIn: "1h"
      })

      
     return {
         "status":true,
        "message": "Successfull Login",
        "token": token,
        "user": data.email,
        "role":"user",
      
        
      }

    } 
    else {
     

       
        // authentication success
        const token = jwt.sign({
          "username": data.email,
          "role": "user",
          "time":new Date()
          
        }, "black", {
          expiresIn: "1h"
        })

        
       return {
           "status":true,
          "message": "Successfull Login",
          "token": token,
          "user": data.email,
          "role": "user",
        
          
        }

     
    }
  } catch (err) {
    console.log(err);
   // log.error({type:"error while requesting username",date:new Date(),error:err});
    return{
        status:false,
        message:"Internal Server Error Occurred"
    }
  }




}


module.exports=indexService;