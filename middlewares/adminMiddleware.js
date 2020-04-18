const adminService=require("../Services/adminService");
const jwt = require("jsonwebtoken");
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    service: 'user-service'
  },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error'
    }),

  ]
});
const adminMiddleware={};
adminMiddleware.checktoken=async(req,res,next)=>{

try {
    let _verify=await jwt.verify(req.headers.authtoken,"black");
    if(_verify)
    {
        console.log("verifiedd")
        next();
    }
    else{
        console.log("not verifiedd")
        res.json([]);
    }
} catch (error) {
  
    logger.log({
        level: 'error',
        message: error
      });
    res.json([]);
}



    
}


adminMiddleware.getUser=async(req,res,next)=>{
let _usercheck= adminService.checkExistingCredentials(req.body.username,"username");
let _emailcheck= adminService.checkExistingCredentials(req.body.email,"email");

let _allcheck=await Promise.all([_usercheck,_emailcheck]);
    if(!_allcheck[1] && ! _allcheck[0])
    {
        next();
    }
    else{
        res.json({"status":false});
    }
    //next();
}


module.exports=adminMiddleware;