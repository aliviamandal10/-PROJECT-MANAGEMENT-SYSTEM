import express from "express";
import Task from "../models/task.model.js";
import verifyToken from"../middleware/auth.middleware.js";
const router = express.Router();

// first post route to create a task
router.post("/", verifyToken, async (req, res) => {
    try {
        const { title, description, status, deadline ,projectId,assignee,priority,type} = req.body;
        const userId = req.authenticatedUser.uid;//userid from token
        console.log("LOGGED IN UID:",userId);
        console.log("ASSIGNEE FRONTEND:",assignee);
        const newTask = new Task({
            title,
            description,
            status,
            deadline,
            userId,
            projectId,
            assignee,
            priority,
            type,
        });

        await newTask.save();
        res.status(201).json({ message: "task created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//to fetch task
router.get("/", verifyToken,async (req, res) => {
    const tasks = await Task.find({
        userId:req.authenticatedUser.uid
    });//fetch data
    res.json(tasks);
});
// Fetch tasks assigned to logged-in user
router.get("/assigned", verifyToken, async (req, res) => {
  try {
    console.log("LOGGED IN EMAIL:",req.authenticatedUser.email);
    const tasks = await Task.find({
      assignee: req.authenticatedUser.email
    });
    console.log("AAIGNEED TASKS:",tasks)

    res.json(tasks);
  } catch (error) {
    console.log("Fetch assigned tasks error:", error);

    res.status(500).json({
      message: "Failed to fetch assigned tasks"
    });
  }
});
 router.get("/search", async (req, res) => {
        const { title } = req.query;
        const tasks = await Task.find({ title: { $regex: title, $options: "i" } });
        res.json(tasks);
    });
    export default router;
router.get("/:id",verifyToken,async (req,res)=>{
 const {id}=req.params;
const task = await
Task.findOne({
    _id:id,
    userId:req.authenticatedUser.uid
});
 if (!task){
    return
    res.status(404).json({message:"Task not found"});
}
res.json(task);


});
// router.get ("/assigned",verifyToken,async(req,res)=>{
//     const tasks = await 
//     Task.find({
//         assignee:req.authenticatedUser.uid
//     });
//     res.json(tasks);
// })
//to update task
router.put("/:id", async (req, res) => {
    const{id}=req.params;
    const { title, description, status, deadline } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, {
            title,
            description,
            status,
            deadline,
            //i add this
        }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "task not found" });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
    //to delete task
    router.delete("/:id",async (req, res) => {
        const{id}=req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "task not found" });
        }
        res.json({ message: "task deleted successfully" });
    });
    //to search task by title
    // router.get("/search", async (req, res) => {
    //     const { title } = req.query;
    //     const tasks = await Task.find({ title: { $regex: title, $options: "i" } });
    //     res.json(tasks);
    // });
    // export default router;