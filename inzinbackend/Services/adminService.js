/**
 * Author Shubham 
 * Service File For Mongoose functions
 * 
 */

const jwt = require("jsonwebtoken");
const User=require('../models/users');
const Category=require("../models/categories");
const StateAndDistrict=require("../models/stateanddistricts");
const Tags=require("../models/tags");
const Brand=require('../models/brands');
const PremiumBrand=require('../models/premiumbrands');
<<<<<<< HEAD
const Products=require("../models/products");
=======
const Tags=require('../models/tags');
const Enquiry=require('../models/enquiries');
>>>>>>> 11db318ee8ccd68fc8719cc43cfbd5ac68a6be76

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

    
    return  await User.find({});

}

adminService.saveUser=async(...userdata)=>{
 try{
let _userfind=await User.find({username:userdata[0]});

if(! _userfind)
{

 let user =new User({

        username:userdata[0],
        password:userdata[1],
        role:userdata[2],
        isactive:userdata[3],
        name:userdata[4],
        email:userdata[5]
  
      });
  
       await user.save();
       return {data: await User.find({}),message:"User Saved"};

    }
    else{
      return {data: await User.find({}),message:"User Already Exists"};
    }
  }
    catch(err)
    {
        log.error({type:"error while saving new user"+userdata[0],date:new Date(),error:err});
        return null;
    }
   

}


adminService.updateUser=async(userdata)=>{
  console.log(userdata)
  try{
    
  
       await User.updateOne({_id:userdata._id},{$set:userdata});
       return {data: await User.find({}),message:"User Saved"};
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

adminService.deleteUser=async(_id)=>{
await User.deleteOne({_id:_id});
return {data: await User.find({}),message:"User Deleted"};

}

/**
 * Categories Services
 * 
 */

  // it returns the categories that are not embedded in the documents
  // only getting the parent categories
 adminService.getParentCategories=async()=>{

  let category_array= await Category.find({isParent:true});
  if(category_array)
  {
     return category_array;
  }

  else{
    return [];
  }

 }


 adminService.getAllCategories=async()=>{

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
 // console.log(JSON.parse(data));
   try{

    let category=new Category(data);
      
       await category.save();
       return await Category.find();

   }
   catch(e)
   {
console.log(e);
   }
  
  
 }


 adminService.deleteCategory=async(categoryid)=>{
  await Category.deleteOne({_id:categoryid});
  return await Category.find();

 }

 adminService.updateCategory=async(category,_id)=>
 {
console.log(category);
 await Category.updateOne({_id:_id},{ $set: category });
 return await Category.find();
 }


 /**
  * 
  * Brands
  * 
  */
adminService.saveBrand=async(data)=>{
try{
    let brand =new Brand(data);
     await brand.save();
     return await Brand.find();
  }
  

  catch(e)
  {

  }

}


adminService.updateBrand=async(brand,_id)=>{
  try{
 
    await Brand.updateOne({_id:_id},{ $set:brand });
    return await Brand.find();
  }
  

  catch(e)
  {
console.log(e);
  }

}


adminService.deleteBrand=async(brandid)=>{
try{
  await Brand.deleteOne({_id:brandid});
  return await Brand.find();
}

catch(e)
{

}

}

adminService.getBrands=async()=>{
  console.log(await Brand.find({}))
  return await Brand.find({});


}

/**
 * Premium Brands
 */

adminService.savePremiumBrand=async(data)=>{
  try{
    let brand =new PremiumBrand(data);
    await brand.save();
    return await PremiumBrand.find();
   
  }
  

  catch(e)
  {

  }

}


adminService.updatePremiumBrand=async(brand,_id)=>{
  try{
     await PremiumBrand.updateOne({_id:_id},{$set:brand})
    return await PremiumBrand.find();
  }
  

  catch(e)
  {

  }

}


adminService.deletePremiumBrand=async(brandid)=>{
  try{
    await PremiumBrand.deleteOne({_id:brandid});
    return await PremiumBrand.find();
  }
  
  catch(e)
  {
  
  }

}

adminService.getPremiumBrands=async()=>{
  //console.log(await Brand.find({}))
  return await PremiumBrand.find({});


}

/**
 * Tags
 */

adminService.getAllTags=async()=>{
   try{

    return await Tags.find(); // mongoose 
   }
   catch(e)
   {

   }


}

adminService.saveTags=async(tags)=>{

  try{
   let _tag=new Tags(tags);
   await _tag.save(); // 
  return await Tags.find(); // mongoose 
   }
   catch(e)
   {
console.log(e);
   }


}


adminService.updateTag=async(tags,tagid)=>{

try
{
   await Tags.updateOne({_id:tagid},{$set:tags});
   return await Tags.find(); // mongoose 

}
catch(e)
{

}


}

adminService.deleteTag=async(tagid)=>{

  try
  {
     await Tags.deleteOne({_id:tagid});
     return await Tags.find(); // mongoose 
  
  }
  catch(e)
  {
  
  }
}

/**
 * Enquiries
 */



/**
 * Tags
 */

adminService.getAllEnquiries=async()=>{
  try{

   return await Enquiry.find(); // mongoose 
  }
  catch(e)
  {

  }


}

adminService.saveEnquiry=async(enquiry)=>{

 try{
  let _tag=new Enquiry(tags);
  await _tag.save(); // 
 return await Enquiry.find(); // mongoose 
  }
  catch(e)
  {
console.log(e);
  }


}


adminService.updateEnquiry=async(tags,tagid)=>{

try
{
  await Enquiry.updateOne({_id:tagid},{$set:tags});
  return await Enquiry.find(); // mongoose 

}
catch(e)
{

}


}

adminService.deleteEnquiry=async(tagid)=>{

 try
 {
    await Enquiry.deleteOne({_id:tagid});
    return await Enquiry.find(); // mongoose 
 
 }
 catch(e)
 {
 
 }
}


/**
 * 
 * States and Districts for Brands
 * 
 */

 adminService.getAllStates=async(data)=>{
return await StateAndDistrict.find({});


 }
 /**
  * Tags
  */
 adminService.getAllTags=async()=>{
 
  return await   Tags.find({});


}

 /**
  * All Products
  */
 adminService.getAllProducts=async()=>{
 
  return await Products.find({});


}


module.exports=adminService;