const adminService=require("../Services/adminService");
const mongoose = require('mongoose');


const adminController={};



adminController.userLogin=async(req,res)=>{
    ////console.log(req.body.username,req.body.password)
    ////console.log(typeof 9);//
    let response=await adminService.getUserByUsername(req.body.username,req.body.password);
    res.json(response);
}


adminController.getUsers=async(req,res)=>{
   res.json(await adminService.getAllUsers());
}

adminController.registerUser=async(req,res)=>{
  //console.log(req.body);

  if(req.body.update=="yes")
  {
    
    let _res=await adminService.updateUser(req.body);
   
      res.status(200).json({data:_res.data,message:_res.message});
  }

  else{

    //console.log(req.body);
  let username=req.body.username;
  let name=req.body.name;
  let email=req.body.email;
  let password=req.body.password;
  let role=req.body.role;
  let isactive=req.body.isactive || true;
  let _res=await adminService.saveUser(username,password,role,isactive,name,email)
 
  res.status(200).json({data:_res.data,message:_res.message});
  }
  
  
 

}
adminController.checkEmail=async(req,res)=>{
  if(adminService.checkExistingCredentials(req.body.username,"email"))
  {
    res.json({status:true});
  }
  else{
    res.json({status:false});
  }

}

adminController.checkUsername=async(req,res)=>{

  if(adminService.checkExistingCredentials(req.body.username,"username"))
  {
    res.json({status:true});
  }
  else{
    res.json({status:false});
  }

  
}

adminController.deleteUser=async(req,res)=>{
  let _res=await adminService.deleteUser(req.body._id);
  res.json({data:_res.data,message:_res.message});
}


/**
 * Categories Controllers
 * 
 */

// Uploading the catgories

adminController.saveCategory=async(req,res)=>{

  try{

    let formavalues=JSON.parse(req.body.formavalues);
    if(req.files.imagelogo)
    {
      formavalues.imagelogo=req.files.imagelogo.path
    }
  
    if(req.files.imagesidebar)
    {
      formavalues.imagesidebar=req.files.imagesidebar.path
    }
    
    
    formavalues.brands=formavalues.brand
    if(formavalues.parentcategory=="" || formavalues.parentcategory=="None")
    {
      formavalues.isParent=true;
    }
  
    else{
      formavalues.isParent=false;
    }
    let resw;
   if(req.body.save=="yes")
   {
    console.log("Save called");
    resw=await adminService.saveCategory(formavalues);
   }
  else if(req.body.update=="yes"){
    ////console.log("Update called",req.body._id);
    resw=await adminService.updateCategory(formavalues,req.body._id)
  }
  
    
   // ////console.log(resw);
  
    if(resw)
    {
      res.json({status:true,"message":"Category Added",data:resw})
    }
  
    else{
      res.json({status:false,"message":"Category Already exists"})
    }
  
    //////console.log(resw);
    
  }
  catch(e)
  {
    ////console.log(e);
  }
 


}

adminController.getParentsCategory=async(req,res)=>{
let parent_cate=await adminService.getParentCategories();
let response=parent_cate.map(ele=>ele.name);
  res.json({"categories":response});

  
}

// getting all categories using aggreagtion pipe line in node js

adminController.getAllCategories=async(req,res)=>{
  let data_res=await adminService.getAllCategories();
  

  res.json(data_res);

}

adminController.deleteCategory=async(req,res)=>{
  ////console.log("delete called",req.body);

let _res=await adminService.deleteCategory(req.body.categoryid);

res.json({status:true,"message":"Category Deleted",data:_res})

}

adminController.updateCategory=async(req,res)=>{
  ////console.log(req.body);
  req.body.imagelogo=req.files.imagelogo.path
  req.body.imagesidebar=req.files.imagesidebar.path
  req.body.brands=req.body.brands.split(",");
  let resw=await adminService.updateCategory(req.body);
 

  if(resw)
  {
    res.json({status:true,"message":"Category Updated"})
  }

  else{
    res.json({status:false,"message":"Internal Server Error"})
  }

  ////console.log(resw);




}

/*
Brands
*/

adminController.getAllBrands=async(req,res)=>{
 let _branddata=await adminService.getBrands();

 res.json(_branddata);


}

adminController.saveBrand=async(req,res)=>{
 
//console.log(req.body);
  try{

    let formavalues=JSON.parse(req.body.formavalues);
    if(req.files.imagelogo)
    {
      formavalues.imagelogo=req.files.imagelogo.path
    }
  
    if(req.files.imagesidebar)
    {
      formavalues.imagesidebar=req.files.imagesidebar.path
    }
    
    
    
    let resw;
   if(req.body.save=="yes")
   {
     ////console.log("Save called");
    resw=await adminService.saveBrand(formavalues);
   }
  else if(req.body.update=="yes"){
    ////console.log("Update called",req.body._id);
    resw=await adminService.updateBrand(formavalues,req.body._id)
  }
  
    
   // ////console.log(resw);
  
    if(resw)
    {
      res.json({status:true,"message":"Brand Added",data:resw})
    }
  
    else{
      res.json({status:false,"message":"Brand Already exists"})
    }
  
    //////console.log(resw);
    
  }
  catch(e)
  {
    ////console.log(e);
  }
 




}

adminController.updateBrandCity=async(req,res)=>{


    try{
        let data=await adminService.updateBrandCity(req.body)
        res.json({status:200,data:data,message:"Availability Added"});
    }

    catch(e)
    {
        //console.log(e);
    }
  
  }




adminController.getBrandAvailability=async(req,res)=>{


    try{
        let data=await adminService.getBrandAvailability();
        res.json({status:200,data:data});
    }

    catch(e)
    {
        //console.log(e);
    }

}


adminController.deleteBrand=async(req,res)=>{


    ////console.log("delete called",req.body);

let _res=await adminService.deleteBrand(req.body.brandid);

res.json({status:true,"message":"Brand Deleted",data:_res})

   

  }


  /**
   * Premium Brands
   */

   adminController.saveServices=async(req,res)=>{
     //console.log("the req",req);

    try{

      let formavalues=JSON.parse(req.body.formavalues);
      if(req.files.imagelogo)
      {
        formavalues.imagelogo=req.files.imagelogo.path
      }
    
     
      
      
      
      let resw;
     if(req.body.save=="yes")
     {
       ////console.log("Save called");
      resw=await adminService.saveServices(formavalues);
     }
    else if(req.body.update=="yes"){
      //console.log("Update called",req.body._id);
      resw=await adminService.updateServices(formavalues,req.body._id)
    }
    
      
     // ////console.log(resw);
    
      if(resw)
      {
        res.json({status:true,"message":"Service Added",data:resw})
      }
    
      else{
        res.json({status:false,"message":"Service Already exists"})
      }
    
      //////console.log(resw);
      
    }
    catch(e)
    {
      ////console.log(e);
    }
   


   }




    adminController.deleteServices=async(req,res)=>{
  //console.log(req.body);
      let _brandsave=await adminService.deleteServices(req.body.brandid);
      res.json({status:true,"message":"Service Deleted",data:_brandsave})
      
  
    }


    adminController.getAllServices=async(req,res)=>{
      let _branddata=await adminService.getServices();
     
      res.json(_branddata);
     
     
     }
/**
 * Offers
  */




adminController.saveOffer=async(req,res)=>{
    //console.log("the req",req);

    try{

        let formavalues=JSON.parse(req.body.formavalues);
        if(req.files.imagelogo)
        {
            formavalues.imagelogo=req.files.imagelogo.path
        }





        let resw;
        if(req.body.save=="yes")
        {
            ////console.log("Save called");
            resw=await adminService.saveOffer(formavalues);
        }
        else if(req.body.update=="yes"){
            //console.log("Update called",req.body._id);
            resw=await adminService.updateOffer(formavalues,req.body._id)
        }


        // ////console.log(resw);

        if(resw)
        {
            res.json({status:true,"message":"Offer Added",data:resw})
        }

        else{
            res.json({status:false,"message":"Offer Already exists"})
        }

        //////console.log(resw);

    }
    catch(e)
    {
        ////console.log(e);
    }



}




adminController.deleteOffer=async(req,res)=>{
    //console.log(req.body);
    let _brandsave=await adminService.deleteOffer(req.body.brandid);
    res.json({status:true,"message":"Service Deleted",data:_brandsave})


}


adminController.getAllOffers=async(req,res)=>{
    let _branddata=await adminService.getAllOffers();

    res.json(_branddata);


}


/**
 * Home
 */




adminController.saveHome=async(req,res)=>{
    //console.log("the req",req);

    try{

        let formavalues=JSON.parse(req.body.formavalues);
        if(req.files.imagelogo)
        {
            formavalues.imagelogo=req.files.imagelogo.path
        }





        let resw;
        if(req.body.save=="yes")
        {
            ////console.log("Save called");
            resw=await adminService.saveHome(formavalues);
        }
        else if(req.body.update=="yes"){
            //console.log("Update called",req.body._id);
            resw=await adminService.updateHome(formavalues,req.body._id)
        }


        // ////console.log(resw);

        if(resw)
        {
            res.json({status:true,"message":"Offer Added",data:resw})
        }

        else{
            res.json({status:false,"message":"Offer Already exists"})
        }

        //////console.log(resw);

    }
    catch(e)
    {
        ////console.log(e);
    }



}




adminController.deleteHome=async(req,res)=>{
    //console.log(req.body);
    let _brandsave=await adminService.deleteHome(req.body.categoryid);
    res.json({status:true,"message":"Banner Deleted",data:_brandsave})


}


adminController.getAllHome=async(req,res)=>{
    let _branddata=await adminService.getAllHome();

    res.json(_branddata);


}





adminController.saveHowItworks=async(req,res)=>{


    try{

        let formavalues=JSON.parse(req.body.formavalues);
        if(req.files.imagelogo)
        {
            formavalues.imagelogo=req.files.imagelogo.path
        }





        let resw;
        if(req.body.save=="yes")
        {
            ////console.log("Save called");
            resw=await adminService.saveHowItworks(formavalues);
        }
        else if(req.body.update=="yes"){
            //console.log("Update called",req.body._id);
            resw=await adminService.updateHowItworks(formavalues,req.body._id)
        }


        // ////console.log(resw);

        if(resw)
        {
            res.json({status:true,"message":" Added",data:resw})
        }

        else{
            res.json({status:false,"message":" Already exists"})
        }

        //////console.log(resw);

    }
    catch(e)
    {
        ////console.log(e);
    }



}




adminController.deleteHowItworks=async(req,res)=>{
    //console.log(req.body);
    let _brandsave=await adminService.deleteHowItworks(req.body.categoryid);
    res.json({status:true,"message":"Banner Deleted",data:_brandsave})


}


adminController.getAllHowItworks=async(req,res)=>{
    let _branddata=await adminService.getAllHowItworks();

    res.json(_branddata);


}


/**
 * Site info
 */


adminController.saveInfo=async(req,res)=>{


    try{


      let _data= await  adminService.saveInfo(req.body);

        res.json({message:"Success",data:_data}).status(200);

    }
    catch(e)
    {
        //console.log(e);
    }



}




adminController.getInfo=async(req,res)=>{


    try{
         let _data=await  adminService.getInfo();

      res.json({message:"Success",data:_data}).status(200);

    }
    catch(e)
    {
        //console.log(e);
    }



}


/**
 * Business Profile
 */








adminController.saveBusinessProfile=async(req,res)=>{

 try{
     //console.log(req.files);

        let formavalues=JSON.parse(req.body.formavalues);

        for(let i=1;i<=4;i++)
        {
            if(req.files[`slider${i}`])
            {
                formavalues[`slider${i}`]=req.files[`slider${i}`].path
            }
        }


     for(let i=1;i<=3;i++)
     {
         if(req.files[`related${i}`])
         {
             formavalues[`related${i}`]=req.files[`related${i}`].path
         }
     }






     let resw;
        if(req.body.save=="yes")
        {
            //console.log("Save called",formavalues);
            resw=await adminService.saveBusinessProfile(formavalues);
        }
        else if(req.body.update=="yes"){
            //console.log("Update called",req.body._id);
            resw=await adminService.updateBusinessProfile(formavalues,req.body._id)
        }


        // ////console.log(resw);

      res.json({sttaus:true,message:"Success",data:resw});
        //////console.log(resw);

    }
    catch(e)
    {
        //console.log(e);
    }



}

adminController.getBusinessProfile=async(req,res)=>{


    try {
        let _data=await adminService.getBusinessProfile();
        res.json({sttaus:true,message:"Success",data:_data});
    }
catch (e) {
    //console.log(e);
}
}


adminController.deleteBusinessProfile=async(req,res)=>{

//console.log(req.body);
    try {
let _data=await  adminService.deleteBusinessProfile(req.body._id);
res.json({data:_data,message:"Success"});
    }
    catch (e) {
        //console.log(e);
    }
}


/**
 * 
 * Tagssa
 * 
 */
adminController.getAllTags=async(req,res)=>{
   

  let _data=await adminService.getAllTags(req.body.type);


  res.status(200).json(_data)


}


adminController.saveTags=async(req,res)=>{
  //console.log(req.body);

  let _data;
  if(req.body.save=="yes")
  {
  _data= await adminService.saveTags(req.body.tag);
  }
else if(req.body.update=="yes")
{
  _data= await adminService.updateTag(req.body.tag,req.body._id);
}
  

  res.status(200).json({status:true,data:_data,message:"Tag Saved"});
  
}





adminController.deleteTags=async(req,res)=>{
  ////console.log(req.body);
  let _data=await adminService.deleteTag(req.body._id);

  res.status(200).json({status:true,data:_data,message:'Deleted Tag'})
  
}


/**
 * Emquiries
 */


adminController.getAllEnquiries=async(req,res)=>{

  let _data=await adminService.getAllEnquiries();

  res.status(200).json({status:true,data:_data})


}


adminController.saveEnquiry=async(req,res)=>{
  //console.log(req.body);

  let _data;
  if(req.body.save=="yes")
  {
  _data= await adminService.saveEnquiry(req.body.tag);
  }
else if(req.body.update=="yes")
{
  _data= await adminService.updateEnquiry(req.body.tag,req.body._id);
}
  

  res.status(200).json({status:true,data:_data,message:"Tag Saved"});
  
}





adminController.deleteEnquiry=async(req,res)=>{
  ////console.log(req.body);
  let _data=await adminService.deleteEnquiry(req.body._id);

  res.status(200).json({status:true,data:_data})
  
}



/**
 * 
 * States and Districts
 * 
 */

 adminController.getAllStates=async(req,res)=>{
    let states=await adminService.getAllStates();
     res.json({states:states});

 }

 /**
  * Tag
  */


 /**
  * All Products
  */
 adminController.getAllProducts=async(req,res)=>{
  let data_res=await adminService.getAllProducts();
  
  //console.log("admincontroller",data_res);

  res.json(data_res);

}


adminController.saveProduct=async(req,res)=>{

    try{
      
        let formavalues=JSON.parse(req.body.formavalues);
        if(req.files.imagelogo)
        {
            formavalues.imagelogo=req.files.imagelogo.path
        }


        let resw;
        if(req.body.save=="yes")
        {
    
            resw=await adminService.saveProduct(formavalues);
        }
        else if(req.body.update=="yes"){
       
            resw=await adminService.updateProduct(formavalues,req.body._id)
        }


      
        if(resw)
        {
            res.json({status:true,"message":"Product Added",data:resw})
        }

        else{
            res.json({status:false,"message":"Product Already exists"})
        }



    }
    catch(e)
    {//console.log(e);
    }


/**
 * Save Profile picture
 * 
 * 
 */


}





adminController.deleteProduct=async(req,res)=>{
    ////console.log(req.body);
    let _data=await adminService.deleteProduct(req.body._id);

    res.status(200).json({status:true,data:_data,message:'Deleted Product'})

}


adminController.saveProfilePic=async(req,res)=>{



  await adminService.savePicture(req.files.file.originalFilename.split(".")[0],req.files.file.path);
  res.json({message:"Success"}).status(200);
 
 
 }

 adminController.getProfilePic=async(req,res)=>{

 

  let data=await adminService.getPicture(req.body.type);
  res.json({message:"Success",data:data}).status(200);
 
 
 }


module.exports=adminController;