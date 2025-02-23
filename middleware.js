const Listing = require("./models/list");
const Review = require("./models/review");

module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","please be login");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async (req,res,next)=>{
    let { id } = req.params;
    let list = await Listing.findById(id);
    if(!list.Owner.equals(res.locals.currentUser._id)){
        req.flash("error","you dont have the permisiion to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isAuthor=async (req,res,next)=>{
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","you dont have the permisiion to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }else{
        next();
    }
};

const validateReview=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }else{
        next();
    }
};