const indexService=require("../Services/indexService");
const indexContoller={};
indexContoller.registerUser=async(req,res)=>{

    console.log("got");
    res.json("hii");
}


indexContoller.userLogin=async(req,res)=>{
    console.log(req.body.username,req.body.password)
    console.log(typeof 9);//
    let response=await indexService.getUserByUsername(req.body.username,req.body.password);
    res.json(response);
}

indexContoller.oauthLogin=async(req,res)=>{
    let response=await indexService.oauthLogin(req.body.userdata);
    res.json(response);
}

module.exports=indexContoller;