const uniqid = require("uniqid");
const Task = require("../models/Tasks");
const AppError = require("../utils/AppError");
// const sendResponse = require("../middlewares/sendResponse");

const addTask = async (req, resp) => {
  const {
    body: { description,isComplete },
  } = req;

  try {
    const newTask = new Task({ id: uniqid(), description: description, isComplete:isComplete });
    await newTask.save();
    resp.status(200).json({ message: "new task", data: newTask });
  } catch (err) {
    console.log("err", err);
    return next(new AppError(400, "Bad request"));
    
  }
};


module.exports = {
  addTask
};
