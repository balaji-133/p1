const express=require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js") ;

router.route("/signup")
.get(userController.signUp)
.post(wrapAsync(userController.afterSignup));

router.route("/login")
.get(userController.loginPage)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),(userController.loginAuthentication));

router.get("/logut",userController.logOut);

module.exports=router;
