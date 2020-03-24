const adminService=require("../Services/adminService");

const adminController={};
adminController.registerUser=async(req,res)=>{

    //console.log("got");
    res.json("hii");
}


adminController.userLogin=async(req,res)=>{
    //console.log(req.body.username,req.body.password)
    //console.log(typeof 9);//
    let response=await adminService.getUserByUsername(req.body.username,req.body.password);
    res.json(response);
}


adminController.getUsers=async(req,res)=>{
   res.json(await adminService.getAllUsers());
}

adminController.registerUser=async(req,res)=>{
  console.log(req.body);

  if(req.body.update=="yes")
  {
    
    let _res=await adminService.updateUser(req.body);
   
      res.status(200).json({data:_res.data,message:_res.message});
  }

  else{

    console.log(req.body);
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
    if(formavalues.parentcategory=="")
    {
      formavalues.isParent=true;
    }
  
    else{
      formavalues.isParent=false;
    }
    let resw;
   if(req.body.save=="yes")
   {
     //console.log("Save called");
    resw=await adminService.saveCategory(formavalues);
   }
  else if(req.body.update=="yes"){
    //console.log("Update called",req.body._id);
    resw=await adminService.updateCategory(formavalues,req.body._id)
  }
  
    
   // //console.log(resw);
  
    if(resw)
    {
      res.json({status:true,"message":"Category Added",data:resw})
    }
  
    else{
      res.json({status:false,"message":"Category Already exists"})
    }
  
    ////console.log(resw);
    
  }
  catch(e)
  {
    //console.log(e);
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
  //console.log("delete called",req.body);

let _res=await adminService.deleteCategory(req.body.categoryid);

res.json({status:true,"message":"Category Deleted",data:_res})

}

adminController.updateCategory=async(req,res)=>{
  //console.log(req.body);
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

  //console.log(resw);




}

/*
Brands
*/

adminController.getAllBrands=async(req,res)=>{
 let _branddata=await adminService.getBrands();

 res.json(_branddata);


}

adminController.saveBrand=async(req,res)=>{
 
console.log(req.body);
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
     //console.log("Save called");
    resw=await adminService.saveBrand(formavalues);
   }
  else if(req.body.update=="yes"){
    //console.log("Update called",req.body._id);
    resw=await adminService.updateBrand(formavalues,req.body._id)
  }
  
    
   // //console.log(resw);
  
    if(resw)
    {
      res.json({status:true,"message":"Brand Added",data:resw})
    }
  
    else{
      res.json({status:false,"message":"Brand Already exists"})
    }
  
    ////console.log(resw);
    
  }
  catch(e)
  {
    //console.log(e);
  }
 




}

adminController.updateBrand=async(req,res)=>{
  req.body.imagelogo=req.files.imagelogo.path
  req.body.imagesidebar=req.files.imagesidebar.path
  let _brandsave=await adminService.saveBrand(req.body);
  if(_brandsave)
  {
    res.json({status:true})
  }
  
  else{
    res.json({status:false})
  }
  
  }

  adminController.deleteBrand=async(req,res)=>{


    //console.log("delete called",req.body);

let _res=await adminService.deleteBrand(req.body.brandid);

res.json({status:true,"message":"Brand Deleted",data:_res})

   

  }


  /**
   * Premium Brands
   */

   adminController.saveServices=async(req,res)=>{
     console.log("the req",req);

    try{

      let formavalues=JSON.parse(req.body.formavalues);
      if(req.files.imagelogo)
      {
        formavalues.imagelogo=req.files.imagelogo.path
      }
    
     
      
      
      
      let resw;
     if(req.body.save=="yes")
     {
       //console.log("Save called");
      resw=await adminService.saveServices(formavalues);
     }
    else if(req.body.update=="yes"){
      console.log("Update called",req.body._id);
      resw=await adminService.updateServices(formavalues,req.body._id)
    }
    
      
     // //console.log(resw);
    
      if(resw)
      {
        res.json({status:true,"message":"Service Added",data:resw})
      }
    
      else{
        res.json({status:false,"message":"Service Already exists"})
      }
    
      ////console.log(resw);
      
    }
    catch(e)
    {
      //console.log(e);
    }
   


   }




    adminController.deleteServices=async(req,res)=>{
  console.log(req.body);
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
    console.log("the req",req);

    try{

        let formavalues=JSON.parse(req.body.formavalues);
        if(req.files.imagelogo)
        {
            formavalues.imagelogo=req.files.imagelogo.path
        }





        let resw;
        if(req.body.save=="yes")
        {
            //console.log("Save called");
            resw=await adminService.saveOffer(formavalues);
        }
        else if(req.body.update=="yes"){
            console.log("Update called",req.body._id);
            resw=await adminService.updateOffer(formavalues,req.body._id)
        }


        // //console.log(resw);

        if(resw)
        {
            res.json({status:true,"message":"Offer Added",data:resw})
        }

        else{
            res.json({status:false,"message":"Offer Already exists"})
        }

        ////console.log(resw);

    }
    catch(e)
    {
        //console.log(e);
    }



}




adminController.deleteOffer=async(req,res)=>{
    console.log(req.body);
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
    console.log("the req",req);

    try{

        let formavalues=JSON.parse(req.body.formavalues);
        if(req.files.imagelogo)
        {
            formavalues.imagelogo=req.files.imagelogo.path
        }





        let resw;
        if(req.body.save=="yes")
        {
            //console.log("Save called");
            resw=await adminService.saveHome(formavalues);
        }
        else if(req.body.update=="yes"){
            console.log("Update called",req.body._id);
            resw=await adminService.updateHome(formavalues,req.body._id)
        }


        // //console.log(resw);

        if(resw)
        {
            res.json({status:true,"message":"Offer Added",data:resw})
        }

        else{
            res.json({status:false,"message":"Offer Already exists"})
        }

        ////console.log(resw);

    }
    catch(e)
    {
        //console.log(e);
    }



}




adminController.deleteHome=async(req,res)=>{
    console.log(req.body);
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
            //console.log("Save called");
            resw=await adminService.saveHowItworks(formavalues);
        }
        else if(req.body.update=="yes"){
            console.log("Update called",req.body._id);
            resw=await adminService.updateHowItworks(formavalues,req.body._id)
        }


        // //console.log(resw);

        if(resw)
        {
            res.json({status:true,"message":" Added",data:resw})
        }

        else{
            res.json({status:false,"message":" Already exists"})
        }

        ////console.log(resw);

    }
    catch(e)
    {
        //console.log(e);
    }



}




adminController.deleteHowItworks=async(req,res)=>{
    console.log(req.body);
    let _brandsave=await adminService.deleteHowItworks(req.body.categoryid);
    res.json({status:true,"message":"Banner Deleted",data:_brandsave})


}


adminController.getAllHowItworks=async(req,res)=>{
    let _branddata=await adminService.getAllHowItworks();

    res.json(_branddata);


}




/**
 * 
 * Tags
 * 
 */
adminController.getAllTags=async(req,res)=>{

  let _data=await adminService.getAllTags();

  res.status(200).json({status:true,data:_data})


}


adminController.saveTags=async(req,res)=>{
  console.log(req.body);

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
  //console.log(req.body);
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
  console.log(req.body);

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
  //console.log(req.body);
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

 adminController.getAllTags=async(req,res)=>{
  let data_res=await adminService.getAllTags();
  console.log("admincontroller");

  res.json(data_res);

}
 /**
  * All Products
  */
 adminController.getAllProducts=async(req,res)=>{
  let data_res=await adminService.getAllProducts();
  
  console.log("admincontroller",data_res);

  res.json(data_res);

}


adminController.saveProduct=async(req,res)=>{

    try{
console.log(req.body);
        let formavalues=JSON.parse(req.body.formavalues);
        if(req.files.imagelogo)
        {
            formavalues.imagelogo=req.files.imagelogo.path
        }






        let resw;
        if(req.body.save=="yes")
        {
            //console.log("Save called");
            resw=await adminService.saveProduct(formavalues);
        }
        else if(req.body.update=="yes"){
            //console.log("Update called",req.body._id);
            resw=await adminService.updateProduct(formavalues,req.body._id)
        }


        // //console.log(resw);

        if(resw)
        {
            res.json({status:true,"message":"Product Added",data:resw})
        }

        else{
            res.json({status:false,"message":"Product Already exists"})
        }

        ////console.log(resw);

    }
    catch(e)
    {
        //console.log(e);
    }



}





adminController.deleteProduct=async(req,res)=>{
    //console.log(req.body);
    let _data=await adminService.deleteProduct(req.body._id);

    res.status(200).json({status:true,data:_data,message:'Deleted Product'})

}


module.exports=adminController;