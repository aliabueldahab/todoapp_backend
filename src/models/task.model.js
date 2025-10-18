const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  durationHours: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  isDone: { type: Boolean, default: false },
  isSuccess: { type: Boolean, default: null },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
