import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const mongodbConnect = mongoose.connect(MONGODB_URI)
    .then(()=>console.log("Mongodb Connected Successfully!"))
    .catch((err)=>{
        console.log("Mongodb Error: ", err);
    });

export default mongodbConnect;