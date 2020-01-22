/**
 * Author Shubham 
 * Service File For Mongoose functions
 * 
 */

const jwt = require("jsonwebtoken");
const User=require('../models/users');
const Category=require("../models/categories");
const StateAndDistrict=require("../models/stateanddistricts");
const Brand=require('../models/brands');

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'./logs/logs.json',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );
const adminService={};

adminService.getUserByUsername=async(username,password)=>{
    try {
        let user = await User.findOne({
          username: username,
          isactive:true
        });
        if (!user) {
          return {"status":false,message:"User Not Found"};
        } 
        else {
          // checking password here for user
          if (password == user.password) {
    
           
            // authentication success
            const token = jwt.sign({
              "username": user.username,
              "role": user.role,
              "time":new Date()
              
            }, secretkey, {
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
        log.error({type:"error while requesting username",date:new Date(),error:err});
        return{
            status:false,
            message:"Internal Server Error Occurred"
        }
      }
    


}

adminService.getAllUsers=async()=>{

    
    return  await User.find({},{_id:0});

}

adminService.saveUser=async(...userdata)=>{
  console.log(userdata)
  try{
    let user =new User({

        username:userdata[0],
        password:userdata[1],
        role:userdata[2],
        isactive:userdata[3],
        name:userdata[4],
        email:userdata[5]
  
      });
  
      return await user.save();
  }
    catch(err)
    {
        log.error({type:"error while saving new user"+userdata[0],date:new Date(),error:err});
        return null;
    }
   

}

adminService.checkExistingCredentials=async(credential,type)=>{
  
  return await User.findOne({type:credential});


}

adminService.deleteUser=async(username)=>{
return await User.deleteOne({username:username});

}

/**
 * Categories Services
 * 
 */

  // it returns the categories that are not embedded in the documents
 adminService.getParentCategories=async()=>{

  let category_array= await Category.find();
  if(category_array)
  {
     return category_array;
  }

  else{
    return [];
  }

 }

 // GET ALL CATEGORIES 
/**
 * adminService.getAllCategories=async()=>{
   return await Category.aggregate([
    {$unwind:"$subcategories"},
    { $project: { "_id": 0 }}

   ])



 }
 * 
 */
 

 /*
 Categories
 */

 adminService.saveCategory=async(data)=>{
  
   try{

    let category=new Category(data);
      category.subcategories=[]; // assigning empty array to subcategory
       return await category.save();

   }
   catch(e)
   {

   }
  
  
 }


 adminService.deleteCategory=async(categoryid)=>{
  let category_=await Category.findById(categoryid);
  if(category_.isParent)
  {
  let _one=  Category.deleteOne({_id:categoryid});
    let _two=Category.deleteMany({parentcategory:category_.name});
    return await Promise.all([_one,_two])

  }
  else{
    return await Category.deleteOne({_id:categoryid});
  }

 }

 adminService.updateCategory=async(category)=>
 {

 return await Category.updateOne({category_name:category.name},category);


 }


 /**
  * 
  * Brands
  * 
  */
adminService.saveBrand=async(data)=>{

}

adminService.getBrands=async()=>{

  return await Brand.find({});


}

/**
 * 
 * States and Districts for Brands
 * 
 */

 adminService.getAllStates=async(data)=>{
return await StateAndDistrict.find({});


 }

module.exports=adminService;