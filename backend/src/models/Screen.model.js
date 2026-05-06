import mongoose from "mongoose";

const screenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Screen", screenSchema);