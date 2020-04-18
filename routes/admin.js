var express = require('express');
//ls =require('../../inzinfrontend/src/assets')
var router = express.Router();
const adminController=require("../controllers/adminController");
const adminMiddleware=require("../middlewares/adminMiddleware");
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
const { categoryValidationRules, validate } = require('../middlewares/validator')
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
 router.post("/registeruser",adminMiddleware.checktoken,adminController.registerUser);
 router.post("/checkEmail",adminMiddleware.checktoken,adminController.checkEmail);
 router.post("/checkUsername",adminMiddleware.checktoken,adminController.checkUsername);
 
 /**
  * Tags
  */
 
 router.post("/getAllTags",adminMiddleware.checktoken,adminController.getAllTags);



 /**
  * Categories
  */


 router.post("/saveCategory",multipartMiddleware,adminController.saveCategory);

 router.post("/getParentsCategory",adminMiddleware.checktoken,adminController.getParentsCategory);

 router.post("/getAllCategory",adminMiddleware.checktoken,adminController.getAllCategories);
 router.post("/deleteCategory",adminController.deleteCategory)
 router.post("/updateCategory",adminMiddleware.checktoken,multipartMiddleware,adminController.updateCategory)

 /**
  * Brands
  */
 router.post("/getAllBrands",adminMiddleware.checktoken,adminController.getAllBrands);
 router.post("/saveBrand",adminMiddleware.checktoken,multipartMiddleware,adminController.saveBrand)
 router.post("/updateBrandCity",adminMiddleware.checktoken,multipartMiddleware,adminController.updateBrandCity);
 router.post("/deleteBrand",adminMiddleware.checktoken,adminController.deleteBrand);
/**
 * For checking the avilability of brand for a city if it is booked or available
 */
router.post("/getAllBrandavailability",adminMiddleware.checktoken,adminController.getBrandAvailability);
//router.post("/deleteBrand",adminMiddleware.checktoken,adminController.updateBrandStatus);
/**
 * Premium Brands
 * 
 */

router.post("/getAllServices",adminMiddleware.checktoken,adminController.getAllServices);
router.post("/saveServices",adminMiddleware.checktoken,multipartMiddleware,adminController.saveServices)

router.post("/deleteServices",adminMiddleware.checktoken,adminController.deleteServices)


router.post("/getAllOffers",adminMiddleware.checktoken,adminController.getAllOffers);
router.post("/saveOffer",adminMiddleware.checktoken,multipartMiddleware,adminController.saveOffer)

router.post("/deleteOffer",adminMiddleware.checktoken,adminController.deleteOffer)



router.post("/getAllHome",adminMiddleware.checktoken,adminController.getAllHome);
router.post("/saveHome",adminMiddleware.checktoken,multipartMiddleware,adminController.saveHome)

router.post("/deleteHome",adminMiddleware.checktoken,adminController.deleteHome);


router.post("/getAllHowItworks",adminMiddleware.checktoken,adminController.getAllHowItworks);
router.post("/saveHowItworks",adminMiddleware.checktoken,multipartMiddleware,adminController.saveHowItworks)

router.post("/deleteHowItworks",adminMiddleware.checktoken,adminController.deleteHowItworks);


router.post("/getSiteInfo",adminMiddleware.checktoken,adminController.getInfo);
router.post("/saveSiteInfo",adminMiddleware.checktoken,multipartMiddleware,adminController.saveInfo)


/**
 * Business Profile
 */


router.post("/saveBusinessProfile",adminMiddleware.checktoken,multipartMiddleware,adminController.saveBusinessProfile)
router.post("/getBusinessProfile",adminMiddleware.checktoken,multipartMiddleware,adminController.getBusinessProfile);
router.post("/deleteBusinessProfile",adminMiddleware.checktoken,multipartMiddleware,adminController.deleteBusinessProfile);







/**
 * Tags
 */

router.post("/getAllTags",adminMiddleware.checktoken,adminController.getAllTags);
router.post("/saveTags",adminMiddleware.checktoken,multipartMiddleware,adminController.saveTags)
//router.post("/updateTags",adminMiddleware.checktoken,multipartMiddleware,adminController.updateTags)
router.post("/deleteTags",adminMiddleware.checktoken,adminController.deleteTags)


/**
 * Enquiries
 */


router.post("/getAllEnquiries",adminMiddleware.checktoken,adminController.getAllEnquiries);
router.post("/saveEnquiry",adminMiddleware.checktoken,multipartMiddleware,adminController.saveEnquiry);
//router.post("/updateTags",adminMiddleware.checktoken,multipartMiddleware,adminController.updateTags)
router.post("/deleteEnquiry",adminMiddleware.checktoken,adminController.deleteEnquiry);


/**
 * 
 * States
 */

router.post("/getAllStates",adminMiddleware.checktoken,adminController.getAllStates);


/**
 * All Products
 */
router.post("/getAllProducts",adminMiddleware.checktoken,adminController.getAllProducts);
router.post("/saveProduct",adminMiddleware.checktoken,multipartMiddleware,adminController.saveProduct);
router.post("/deleteProduct",adminMiddleware.checktoken,adminController.deleteProduct);


/**
 * Sections
 */


router.post("/getAllSection",adminMiddleware.checktoken,adminController.getAllTags);
router.post("/saveSection",adminMiddleware.checktoken,multipartMiddleware,adminController.saveTags)
//router.post("/updateTags",adminMiddleware.checktoken,multipartMiddleware,adminController.updateTags)
router.post("/deleteSection",adminMiddleware.checktoken,adminController.deleteTags)

/**
 * Upload Profile pictures
 */

router.post("/savePic",multipartMiddleware,adminController.saveProfilePic);

router.post("/getPic",adminMiddleware.checktoken,adminController.getProfilePic);





module.exports = router;
