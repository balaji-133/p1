const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

module.exports.signUp=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.afterSignup = async(req,res)=>{
    try {
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const registerUser = await User.register(newUser,password);
    console.log(registerUser);
    req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","successfully registered");
        res.redirect("/listings");
    });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.loginPage = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginAuthentication = async(req,res)=>{

    req.flash("success","welcome back");
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }
    else{
        res.redirect("/listings");
    }
};

module.exports.logOut = (req,res)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are loggedout");
        res.redirect("/listings");
    });
};