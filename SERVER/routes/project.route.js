import express from "express";
console.log("project route loaded")
import Project from "../models/project.model.js";
import verifyToken from "../middleware/auth.middleware.js";
import User from "../models/user.js";

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
    console.error("POST PROJECT ERROR:",error)
    res.status(500).json({

      message: error.message,
    });
  }
});
router.get("/", verifyToken, async (req, res) => {
  console.log("get route working"); 
  console.log("get project route hit");
  try {
    console.log("BEFORE PROJECT FIND");
    const projects = await Project.find({
      userId: req.authenticatedUser.uid,
    });
    console.log("after project find");
    console.log("projects from db:",projects);

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error."
    });
  }
  
});
//team members
router.put("/:id/members", verifyToken, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.team_members.includes(user.email)) {
            return res.status(400).json({
                message: "User is already a project member"
            });
        }

        project.team_members.push(user.email);

        await project.save();

        return res.status(200).json({
            message: "Member added successfully",
            project
        });

    } catch (error) {
        console.error("Add member error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
});

// update project
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { userId, ...updates } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.authenticatedUser.uid },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("PUT PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;