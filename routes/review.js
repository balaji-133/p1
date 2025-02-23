const express=require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");

const Review = require("../models/review.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing = require("../models/list.js");
const {isLoggedin} = require("../middleware.js");
const {isOwner,isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");


router.post("/",isLoggedin, wrapAsync(reviewController.postReview ));

router.delete("/:reviewId",isLoggedin,isAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;