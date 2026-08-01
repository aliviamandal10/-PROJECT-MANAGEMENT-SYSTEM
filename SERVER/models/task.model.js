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
    
    
});
const Task = mongoose.model("Task",taskSchema);
export default Task;  