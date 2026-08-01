import express from "express";
import User from"../models/user.js";
const userRouter = express.Router();
userRouter.get("/",(req,res)=>
{
    res.send("User route working");
});
userRouter.post("/",async(req,res)=>{
    const {name,email,password}=req.body;
    const newUser = new User ({
        name,
        email,
        password,
    });
    await newUser.save();
    res.status(201).json({
        message:"User created successfully"
    });

});

export default userRouter