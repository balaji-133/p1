const Listing = require("../models/list");

module.exports.index= async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewform = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListings = async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("Owner");
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.newListing=async (req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.Owner=req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
};

module.exports.editListing = async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    let originalImageUrl=listing.image.url;
    originalImageUrl.replace("/upload","/upload/w_200");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing = async (req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req,res)=>{
    let { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    req.flash("success","Listing deleted");
    res.redirect("/listings");
};