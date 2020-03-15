const indexMiddleware={};
indexMiddleware.registerUser=async(req,res,next)=>{

    console.log("got");
    next();
}



module.exports=indexMiddleware;