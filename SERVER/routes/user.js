import express from "express";
import User from "../models/user.js";
import verifyToken from "../middleware/auth.middleware.js";
const userRouter = express.Router();



userRouter.get("/", async (req, res) => {
    try {
         console.log("BEFORE User.find()");
        const users = await User.find();
        console.log("After User.find()",users);
       
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
//

userRouter.get("/me", verifyToken, async (req, res) => {
    try {
        console.log("req.userId:", req.userId);
        console.log("typeof req.userId:", typeof req.userId);

        const user = await User.findOne({email: req.authenticatedUser.email});

        console.log("USER FROM DB:", user);

        res.json({emai:
          req.authenticatedUser.email,role:user?.role || "user"
     } );
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
userRouter.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({
        name,
        email,
        password,
    });
    await newUser.save();
    res.status(201).json({
        message: "User created successfully",
    });
});

export default userRouter;