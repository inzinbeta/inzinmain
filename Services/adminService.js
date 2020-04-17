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
const Services=require('../models/services');
const Products=require("../models/products");
const Section=require("../models/sections");
const Offers=require("../models/offers");
const Home =require("../models/home");
const Enquiry=require('../models/enquiries');
const HowItworks=require('../models/howitworks');
const SiteInfo=require('../models/siteinfo');
const BusinessProfile=require('../models/businessprofile')
const mongoose=require("mongoose");
const av=require("../models/avilability");
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
          //console.log("ee",user);
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
  //console.log(userdata)
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
// console.log("000000",JSON.parse(data));
   try{
//console.log(data);
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
//console.log(category);
 await Category.updateOne({_id:_id},{ $set: category });
 return await Category.find();
 }


 /**
  * 
  * Brands
  * 
  */
adminService.saveBrand=async(data)=>{
    //console.log("brand",data);
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
//console.log(e);
  }

}



adminService.updateBrandCity=async(brand)=>{
    try{
//console.log("----",brand);
        await new av(brand).save();
        return await av.find();
    }


    catch(e)
    {
        //console.log(e);
    }

}


adminService.getBrandAvailability=async()=>{
    try{


        return await av.find();
    }


    catch(e)
    {
        //console.log(e);
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
  //console.log(await Brand.find({}))
  return await Brand.find({});


}

/**
 * Premium Brands
 */

adminService.saveServices=async(data)=>{
  try{
    let brand =new Services(data);
    await brand.save();
    return await Services.find();
   
  }
  

  catch(e)
  {

  }

}


adminService.updateServices=async(brand,_id)=>{
  try{
     await Services.updateOne({_id:_id},{$set:brand})
    return await Services.find();
  }
  

  catch(e)
  {

  }

}


adminService.deleteServices=async(brandid)=>{
  try{
    await Services.deleteOne({_id:brandid});
    return await Services.find();
  }
  
  catch(e)
  {
  
  }

}

adminService.getServices=async()=>{
  ////console.log(await Brand.find({}))
  return await Services.find({});


}

/**
 * Offers
 */






adminService.saveOffer=async(data)=>{
    try{
        let brand =new Offers(data);
        await brand.save();
        return await Offers.find();

    }


    catch(e)
    {

    }

}


adminService.updateOffer=async(brand,_id)=>{
    try{
        await Offers.updateOne({_id:_id},{$set:brand})
        return await Offers.find();
    }


    catch(e)
    {

    }

}


adminService.deleteOffer=async(brandid)=>{
    try{
        await Offers.deleteOne({_id:brandid});
        return await Offers.find();
    }

    catch(e)
    {

    }

}

adminService.getAllOffers=async()=>{
    ////console.log(await Brand.find({}))
    return await Offers.find({});


}

/**
 * Home banner
 */



adminService.saveHome=async(data)=>{
    try{
        let brand =new Home(data);
        await brand.save();
        return await Home.find();

    }


    catch(e)
    {

    }

}


adminService.updateHome=async(brand,_id)=>{
    try{
        await Home.updateOne({_id:_id},{$set:brand})
        return await Home.find();
    }


    catch(e)
    {

    }

}


adminService.deleteHome=async(brandid)=>{
    try{
        //console.log(brandid);
        await Home.deleteOne({_id:brandid});
        return await Home.find();
    }

    catch(e)
    {

    }

}

adminService.getAllHome=async()=>{
    ////console.log(await Brand.find({}))
    return await Home.find({});


}


/**
 * How it works
 */



adminService.saveHowItworks=async(data)=>{
    try{
        //console.log("service",data);
        let brand =new HowItworks(data);
        await brand.save();
        return await HowItworks.find();

    }


    catch(e)
    {
//console.log(e);
    }

}


adminService.updateHowItworks=async(brand,_id)=>{
    try{
        await HowItworks.updateOne({_id:_id},{$set:brand})
        return await HowItworks.find();
    }


    catch(e)
    {

    }

}


adminService.deleteHowItworks=async(brandid)=>{
    try{

        await HowItworks.deleteOne({_id:brandid});
        return await HowItworks.find();
    }

    catch(e)
    {

    }

}

adminService.getAllHowItworks=async()=>{
    ////console.log(await Brand.find({}))
    return await HowItworks.find({});


}



/**
 * Tags
 */

adminService.getAllTags=async(type)=>{
   try{
       console.log("Service Called----------------",type)
       if(type=="all")
       {
           return await Tags.find(); // mongoose
       }
       else{
           return await Tags.find({type:type}); // mongoose
       }


   }
   catch(e)
   {

   }


}

adminService.saveTags=async(tags)=>{

    //console.log(tags);
  try{
   let _tag=new Tags(tags);
   await _tag.save(); // 
  return await Tags.find(); // mongoose 
   }
   catch(e)
   {
//console.log(e);
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
//console.log(e);
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


 /**
  * All Products
  */
 adminService.getAllProducts=async()=>{
 
  return await Products.find({});


}



adminService.saveProduct=async(tags)=>{

    try{
        let _tag=new Products(tags);
        await _tag.save(); //
        return await Products.find(); // mongoose
    }
    catch(e)
    {
        //console.log(e);
    }


}


adminService.updateProduct=async(tags,tagid)=>{

    try
    {
        //console.log("hey",tags);
        await Products.updateOne({_id:tagid},{$set:tags});
        return await Products.find(); // mongoose

    }
    catch(e)
    {
        //console.log(e);
    }


}

adminService.deleteProduct=async(tagid)=>{

    try
    {
        await Products.deleteOne({_id:tagid});
        return await Products.find(); // mongoose

    }
    catch(e)
    {

    }
}




/**
 * Sections
 */


adminService.saveSection=async(section)=>{

  try{
   let _tag=new Section(tags);
   await _tag.save(); // 
  return await Section.find(); // mongoose 
   }
   catch(e)
   {
//console.log(e);
   }


}


adminService.updateSection=async(tags,tagid)=>{

try
{
   await Section.updateOne({_id:tagid},{$set:tags});
   return await Section.find(); // mongoose 

}
catch(e)
{

}


}

adminService.deleteSection=async(tagid)=>{

  try
  {
     await Section.deleteOne({_id:tagid});
     return await Section.find(); // mongoose 
  
  }
  catch(e)
  {
  
  }
}

/**
 * Site Info
 */
adminService.saveInfo=async(data)=>{
    try{
    if(!data._id)
    {
      await  new SiteInfo(data).save();
        return await SiteInfo.find();
    }

    else{
        let id=data._id;
        delete data._id;
        await SiteInfo.update({_id:id},{$set:data});

        return await SiteInfo.find()
    }



    }

    catch (e) {
     //console.log(e);
    }
  ;
}


adminService.getInfo=async(data)=>{


    try{



        return SiteInfo.find()
    }

    catch (e) {
        //console.log(e);
    }
    ;
}


/**
 * Businesss PRofile
 */


adminService.getBusinessProfile=async()=>{

    try {
        return await BusinessProfile.find();
    }

    catch (e) {

    }
}


adminService.saveBusinessProfile=async(data)=>{
    try{
       await new BusinessProfile(data).save();
       return await BusinessProfile.find();
    }

    catch (e) {
        //console.log(e);
    }
    ;
}


adminService.updateBusinessProfile=async(data,id)=>{
    try{
        //console.log(data);
        //console.log(id);
        await  BusinessProfile.update({_id:id},{$set:data})
        return await BusinessProfile.find();
    }

    catch (e) {
        //console.log(e);
    }
    ;
}

adminService.deleteBusinessProfile=async(data)=>{
    try{
        await  BusinessProfile.deleteOne({_id:data})
        return await BusinessProfile.find();
    }

    catch (e) {
        //console.log(e);
    }

}



module.exports=adminService;