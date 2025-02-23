const mongoose = require("mongoose");
const review = require("./review");
const { listingSchema } = require("../schema");
const { Schema } = mongoose;
const Review = require("./review.js");

const listSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,

    image:{
        url:String,
        filename: String,
    },
    price:Number,
    country:String,
    location:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    Owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

listSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("listing", listSchema);

module.exports = Listing;