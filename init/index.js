const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/list.js");

main()
.then(() => { console.log("database connected succesfully") })
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}


const initDb = async () => {
   await Listing.deleteMany({});
   initData.data=initData.data.map((obj)=>({...obj,Owner:"67b60408e3f79a27a86d7f20"}))
   await Listing.insertMany(initData.data);
   console.log("data inserted");
};

initDb();