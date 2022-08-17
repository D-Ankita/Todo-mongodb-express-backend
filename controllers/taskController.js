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

const getAllTask = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    let tasks = await Task.paginate({}, { page: page, limit: limit });
    res.status(200).json({
      message: "successfully fetched tasks",
      docs: tasks,
    });
  } catch (err) {
    console.log("error", err);
    return next(new AppError(400, "Bad request"));
  }
};


module.exports = {
  addTask,
  getAllTask
};
