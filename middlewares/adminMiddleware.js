const adminService=require("../Services/adminService");
const adminMiddleware={};
adminMiddleware.registerUser=async(req,res,next)=>{

    console.log("got");
    next();
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