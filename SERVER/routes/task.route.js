import express from "express";
import Task from "../models/task.model.js";
import verifyToken from"../middleware/auth.middleware.js";
const router = express.Router();

// first post route to create a task
router.post("/", verifyToken, async (req, res) => {
    try {
        const { title, description, status, deadline } = req.body;
        const userId = req.userId;//userid from token
        const newTask = new Task({
            title,
            description,
            status,
            deadline,
            userId,
        });

        await newTask.save();
        res.status(201).json({ message: "task created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//to fetch task
router.get("/", async(req, res) => {
    const tasks = await Task.find();//fetch data
    res.json(tasks);
});
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
    router.get("/search", async (req, res) => {
        const { title } = req.query;
        const tasks = await Task.find({ title: { $regex: title, $options: "i" } });
        res.json(tasks);
    });
    export default router;