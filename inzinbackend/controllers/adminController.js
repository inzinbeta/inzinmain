const adminService=require("../Services/adminService");

const adminController={};
adminController.registerUser=async(req,res)=>{

    console.log("got");
    res.json("hii");
}


adminController.userLogin=async(req,res)=>{
    console.log(req.body.username,req.body.password)
    console.log(typeof 9);//
    let response=await adminService.getUserByUsername(req.body.username,req.body.password);
    res.json(response);
}


adminController.getUsers=async(req,res)=>{
   res.json(await adminService.getAllUsers());
}

adminController.registerUser=async(req,res)=>{
  let username=req.body.username;
  let name=req.body.name;
  let email=req.body.email;
  let password=req.body.password;
  let role=req.body.role;
  let isactive=req.body.isactive || true;
  if(adminService.saveUser(username,password,role,isactive,name,email))
  {
    res.json({message:"Success",status:true});
  }
  else{
    res.json({message:"Failed",status:false});
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
  let _res=adminService.deleteUser(req.body.username);
  res.json(_res);
}


/**
 * Categories Controllers
 * 
 */

// Uploading the catgories

adminController.saveCategory=async(req,res)=>{
  //console.log(req);
  
  req.body.imagelogo=req.files.imagelogo.path
  req.body.imagesidebar=req.files.imagesidebar.path
  req.body.brands=req.body.brands.split(",");
  let resw=await adminService.saveCategory(req.body);
  console.log(resw);

  if(resw)
  {
    res.json({status:true,"message":"Category Added"})
  }

  else{
    res.json({status:false,"message":"Category Already exists"})
  }

  console.log(resw);
  


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

let _res=await adminService.deleteCategory(req.body._id);
console.log(_res);
res.json({"status":true});

}

adminController.updateCategory=async(req,res)=>{
  console.log(req.body);
  req.body.imagelogo=req.files.imagelogo.path
  req.body.imagesidebar=req.files.imagesidebar.path
  req.body.brands=req.body.brands.split(",");
  let resw=await adminService.updateCategory(req.body);
  console.log(resw);

  if(resw)
  {
    res.json({status:true,"message":"Category Updated"})
  }

  else{
    res.json({status:false,"message":"Internal Server Error"})
  }

  console.log(resw);




}

/*
Brands
*/

adminController.getAllBrands=async(req,res)=>{
 let _branddata=await adminService.getBrands();

 res.json(_branddata);


}

adminController.saveBrand=async(req,res)=>{

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

    let _brandsave=await adminService.deleteBrand(req.body);
    if(_brandsave)
    {
      res.json({status:true})
    }
    
    else{
      res.json({status:false})
    }
    

  }


  /**
   * Premium Brands
   */

   adminController.savePremiumBrand=async(req,res)=>{

    req.body.imagelogo=req.files.imagelogo.path
    req.body.imagesidebar=req.files.imagesidebar.path
  let _brandsave=await adminService.savePremiumBrand(req.body);
  if(_brandsave)
  {
    res.json({status:true})
  }
  
  else{
    res.json({status:false})
  }




   }



   adminController.updatePremiumBrand=async(req,res)=>{
    req.body.imagelogo=req.files.imagelogo.path
    req.body.imagesidebar=req.files.imagesidebar.path
    let _brandsave=await adminService.updatePremiumBrand(req.body);
    if(_brandsave)
    {
      res.json({status:true})
    }
    
    else{
      res.json({status:false})
    }
    
    }
  
    adminController.deletePremiumBrand=async(req,res)=>{
  
      let _brandsave=await adminService.deletePremiumBrand(req.body);
      if(_brandsave)
      {
        res.json({status:true})
      }
      
      else{
        res.json({status:false})
      }
      
  
    }


    adminController.getAllPremiumBrands=async(req,res)=>{
      let _branddata=await adminService.getPremiumBrands();
     
      res.json(_branddata);
     
     
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


module.exports=adminController;