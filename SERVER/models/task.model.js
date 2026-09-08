import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    //to store task details
    description:{
        type:String,
        required:true,
    },
    //status
    status:{
        type:String,
        required:true,
    },
    deadline:{
        type:Date,
        required:true,
    
    },
    userId:{
        type:String,
        required:true,
    },
    projectId:{
        type:String,
        required:true,
    },
    assignee:{
        type:String,
        required:false,
    },
    priority:{
        type:String,
        enum:["LOW","MEDIUM","HIGH"],
        required:false,

    },
    type:{
        type:String,
        enum:["TASK","BUG","FEATURE","IMPROVEMENT","OTHER"],
        required:false,

    }
});
const Task = mongoose.model("Task",taskSchema);
export default Task;  