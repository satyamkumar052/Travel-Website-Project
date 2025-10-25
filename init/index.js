const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// connection with db
main().then(()=>console.log("Connected to db")).catch((err)=>console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// insert to db 
const initDB = async ()=>{
    await Listing.deleteMany({}); 
    initData.data = initData.data.map((obj)=>({
        ...obj, owner : "68fa8459b823b62d4e85fd2c", 
    }));
    await Listing.insertMany(initData.data);
    console.log("Data is Added");
};
initDB();