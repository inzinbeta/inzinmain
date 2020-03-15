var express = require('express');
var router = express.Router();
const indexController=require("../controllers/indexcontroller");
const indexMiddleware=require("../middlewares/indexMiddleware");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/user",indexMiddleware.registerUser,indexController.registerUser);
 /*
 Post Routes
 */

 router.post("/login",indexController.userLogin);
 router.post("/oauthlogin",indexController.oauthLogin);
module.exports = router;
