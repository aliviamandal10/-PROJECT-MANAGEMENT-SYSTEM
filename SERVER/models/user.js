
import mongoose from "mongoose";


//to create schema for user model
const userSchema = new mongoose.Schema({
    //user name should be unique
    name:{
        type: String,
        required: true,
    },
    //email
    email:{
        type: String,
        required:true,
        unique:true,
    },
    //password
    password:{
        type: String,
        required:true,
    },
    //role of user
    role:{
        type: String,
        default: "user"
    }
});
const  User =     mongoose.model("User",userSchema);
export default User;

