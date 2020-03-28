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
  * Tags
  */
 
 router.post("/getAllTags",adminMiddleware.registerUser,adminController.getAllTags);



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
 router.post("/deleteBrand",adminMiddleware.registerUser,adminController.deleteBrand)

/**
 * Premium Brands
 * 
 */

router.post("/getAllServices",adminMiddleware.registerUser,adminController.getAllServices);
router.post("/saveServices",adminMiddleware.registerUser,multipartMiddleware,adminController.saveServices)

router.post("/deleteServices",adminMiddleware.registerUser,adminController.deleteServices)


router.post("/getAllOffers",adminMiddleware.registerUser,adminController.getAllOffers);
router.post("/saveOffer",adminMiddleware.registerUser,multipartMiddleware,adminController.saveOffer)

router.post("/deleteOffer",adminMiddleware.registerUser,adminController.deleteOffer)



router.post("/getAllHome",adminMiddleware.registerUser,adminController.getAllHome);
router.post("/saveHome",adminMiddleware.registerUser,multipartMiddleware,adminController.saveHome)

router.post("/deleteHome",adminMiddleware.registerUser,adminController.deleteHome);


router.post("/getAllHowItworks",adminMiddleware.registerUser,adminController.getAllHowItworks);
router.post("/saveHowItworks",adminMiddleware.registerUser,multipartMiddleware,adminController.saveHowItworks)

router.post("/deleteHowItworks",adminMiddleware.registerUser,adminController.deleteHowItworks);


router.post("/getSiteInfo",adminMiddleware.registerUser,adminController.getInfo);
router.post("/saveSiteInfo",adminMiddleware.registerUser,multipartMiddleware,adminController.saveInfo)


/**
 * Business Profile
 */


router.post("/saveBusinessProfile",adminMiddleware.registerUser,multipartMiddleware,adminController.saveBusinessProfile)
router.post("/getBusinessProfile",adminMiddleware.registerUser,multipartMiddleware,adminController.getBusinessProfile);
router.post("/deleteBusinessProfile",adminMiddleware.registerUser,multipartMiddleware,adminController.deleteBusinessProfile);







/**
 * Tags
 */

router.post("/getAllTags",adminMiddleware.registerUser,adminController.getAllTags);
router.post("/saveTags",adminMiddleware.registerUser,multipartMiddleware,adminController.saveTags)
//router.post("/updateTags",adminMiddleware.registerUser,multipartMiddleware,adminController.updateTags)
router.post("/deleteTags",adminMiddleware.registerUser,adminController.deleteTags)


/**
 * Enquiries
 */


router.post("/getAllEnquiries",adminMiddleware.registerUser,adminController.getAllEnquiries);
router.post("/saveEnquiry",adminMiddleware.registerUser,multipartMiddleware,adminController.saveEnquiry);
//router.post("/updateTags",adminMiddleware.registerUser,multipartMiddleware,adminController.updateTags)
router.post("/deleteEnquiry",adminMiddleware.registerUser,adminController.deleteEnquiry);


/**
 * 
 * States
 */

router.post("/getAllStates",adminMiddleware.registerUser,adminController.getAllStates);


/**
 * All Products
 */
router.post("/getAllProducts",adminMiddleware.registerUser,adminController.getAllProducts);
router.post("/saveProduct",adminMiddleware.registerUser,multipartMiddleware,adminController.saveProduct);
router.post("/deleteProduct",adminMiddleware.registerUser,adminController.deleteProduct);


/**
 * Sections
 */


router.post("/getAllSection",adminMiddleware.registerUser,adminController.getAllTags);
router.post("/saveSection",adminMiddleware.registerUser,multipartMiddleware,adminController.saveTags)
//router.post("/updateTags",adminMiddleware.registerUser,multipartMiddleware,adminController.updateTags)
router.post("/deleteSection",adminMiddleware.registerUser,adminController.deleteTags)


module.exports = router;
