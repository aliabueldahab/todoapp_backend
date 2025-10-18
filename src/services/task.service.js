const tasks = require("../models/task.model");
const updatedtask = async (id, data) => {
  try {
    const updatedTask = await tasks.findByIdAndUpdate(id, data, { new: true });
    return updatedTask;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (id) => {
  try {
    const deletedtask = await tasks.findByIdAndDelete(id);
    return deletedtask;
  } catch (error) {
    throw error
  }
};

module.exports = {
  updatedtask,
  deleteTask
};
