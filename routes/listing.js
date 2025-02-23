const express=require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js");

const Listing = require("../models/list.js");
const {isLoggedin} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedin,upload.single('listing[image]'),wrapAsync( listingController.newListing));

router.get("/new",isLoggedin,(listingController.renderNewform));

router.route("/:id")
.get(wrapAsync(listingController.showListings ))
.put(isLoggedin,isOwner,upload.single('listing[image]'),wrapAsync(listingController.updateListing))
.delete(isLoggedin,isOwner,wrapAsync( listingController.deleteListing));

router.get("/:id/edit",isLoggedin,wrapAsync( listingController.editListing));

module.exports=router;