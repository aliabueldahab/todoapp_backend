const Task = require("../models/task.model");
const { updatedtask, deleteTask } = require("../services/task.service");

const createTask = async (req, res) => {
  try {
    const { title, description, durationHours } = req.body;
    const userId = req.user.id;

    if (!title || !description || !durationHours || !userId) {
      return res.status(400).json({
        message: "title, description, durationHours, and userId are required",
      });
    }

    const newTask = new Task({
      title,
      description,
      durationHours,
      userId,
    });

    await newTask.save();
    // console.log("Saved task:", newTask);

    res.status(201).json({
      message: "Task created successfully",
      newTask,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({
        message: "id and data are required",
      });
    }

    const updated = await updatedtask(id, data);

    if (!updated) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteonetask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "id is missing",
      });
    }

    const deleted = await deleteTask(id);
    res.status(200).json({
      message: "task deleted",
      deleted,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getalltasksbyid = async (req, res) => {
  try {
     const userId = req.user.id;
    const alltasks = await Task.find({userId});
    res.status(200).json({
      alltasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const markTaskDone = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Task id is required" })
    }

    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }


    if (task.isDone) {
      return res.status(400).json({ message: "Task already marked as done" })
    }

    const startTime = task.createdAt
    const endTime = new Date()
    const diffHours = (endTime - startTime) / (1000 * 60 * 60)

    let isSuccess = diffHours <= task.durationHours

    task.isDone = true
    task.isSuccess = isSuccess
    await task.save()

    res.status(200).json({
      message: isSuccess
        ? "Task completed successfully on time "
        : "Task completed but took longer than expected ",
      task,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

module.exports = { createTask, updateTask, deleteonetask, getalltasksbyid , markTaskDone };
