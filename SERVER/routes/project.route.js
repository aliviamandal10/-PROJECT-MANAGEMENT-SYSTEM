import express from "express";
console.log("project route loaded")
import Project from "../models/project.model.js";
import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();
router.use((req,res,next)=>{
  console.log("project route request:", req.method, req.url);
  next();
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      userId: req.authenticatedUser.uid,
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/", verifyToken, async (req, res) => {
  console.log("get route working")
  try {
    const projects = await Project.find({
      userId: req.authenticatedUser.uid,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;