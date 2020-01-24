var express = require('express');
//ls =require('../../inzinfrontend/src/assets')
var router = express.Router();
const adminController=require("../controllers/adminController");
const adminMiddleware=require("../middlewares/adminMiddleware");
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



 /*
 Post Routes
 */

 router.post("/login",adminController.userLogin);
 router.post("/getUsers",adminController.getUsers);
 router.post("/deleteUser",adminController.deleteUser);
 router.post("/registeruser",adminMiddleware.registerUser,adminController.registerUser);
 router.post("/checkEmail",adminMiddleware.registerUser,adminController.checkEmail);
 router.post("/checkUsername",adminMiddleware.registerUser,adminController.checkUsername);
 /**
  * Categories
  */


 router.post("/saveCategory",adminMiddleware.registerUser,multipartMiddleware,adminController.saveCategory);

 router.post("/getParentsCategory",adminMiddleware.registerUser,adminController.getParentsCategory);

 router.post("/getAllCategory",adminMiddleware.registerUser,adminController.getAllCategories);
 router.post("/deleteCategory",adminController.deleteCategory)
 router.post("/updateCategory",adminMiddleware.registerUser,multipartMiddleware,adminController.updateCategory)

 /**
  * Brands
  */
 router.post("/getAllBrands",adminMiddleware.registerUser,adminController.getAllBrands);
 router.post("/saveBrand",adminMiddleware.registerUser,multipartMiddleware,adminController.saveBrand)
 router.put("/updateBrand",adminMiddleware.registerUser,multipartMiddleware,adminController.updateBrand)
 router.delete("/deleteBrand",adminMiddleware.registerUser,adminController.deleteBrand)

/**
 * Premium Brands
 * 
 */

router.post("/getAllPremiumBrands",adminMiddleware.registerUser,adminController.getAllPremiumBrands);
router.post("/savePremiumBrands",adminMiddleware.registerUser,multipartMiddleware,adminController.savePremiumBrand)
router.put("/updatePremiumBrand",adminMiddleware.registerUser,multipartMiddleware,adminController.updatePremiumBrand)
router.delete("/deletePremiumBrand",adminMiddleware.registerUser,adminController.deletePremiumBrand)




/**
 * 
 * States
 */

router.post("/getAllStates",adminMiddleware.registerUser,adminController.getAllStates);



module.exports = router;
