import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    default: "PLANNING",
  },

  priority: {
    type: String,
    default: "MEDIUM",
  },

  start_date: {
    type: Date,
  },

  end_date: {
    type: Date,
  },

  team_members: {
    type: [String],
    default: [],
  },

  team_lead: {
    type: String,
    default: "",
  },

  progress: {
    type: Number,
    default: 0,
  },

  userId: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;