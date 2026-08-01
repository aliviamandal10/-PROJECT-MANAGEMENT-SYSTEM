import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.route.js";
import projectRoutes from"./routes/project.route.js";

dotenv.config();

const app = express();
//app.use("/projects", projectRoutes);

app.use(cors());
app.use(express.json());
app.use("/users",userRouter)
app.use("/tasks", taskRouter); 

app.use("/projects", projectRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});