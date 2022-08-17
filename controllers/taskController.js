const uniqid = require("uniqid");
const Task = require("../models/Tasks");
const AppError = require("../utils/AppError");
const sendResponse = require("../middlewares/sendResponse");

const addTask = async (req, resp) => {
  const {
    body: { description, isComplete },
  } = req;

  try {
    const newTask = new Task({
      id: uniqid(),
      description: description,
      isComplete: isComplete,
    });
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

const fetchTask = async (req, res, next) => {
  const { task } = req;
  return sendResponse(req, res, next, {
    statusCode: 200,
    message: "task fetched",
    payload: task,
  });
};

const fetchTaskfromQuery = async (req, res, next) => {
  const { query: queryObject } = req;
  console.log("query in req", { ...queryObject });
  try {
    let task = await Task.find({ ...queryObject });
    console.log("task----", task, typeof task);
    if (!task.data) {
      return next(new AppError(404, `Task not found`));
    }
    return sendResponse(req, res, next, {
      statusCode: 200,
      message: "task fetched",
      payload: task,
    });
  } catch (err) {
    return next(new AppError(400, " Bad request"));
  }
};

const deleteTask = async (req, resp, next) => {
  const {
    params: { id },
  } = req;
  try {
    let deletedCount = await Task.deleteOne({ id: id });
    console.log(deletedCount);
    return sendResponse(req, resp, next, {
      statusCode: 200,
      message: "task deleted",
    });
  } catch (err) {
    console.log(err.message);
    return next(new AppError(500, "internal error operation"));
  }
};

module.exports = {
  addTask,
  getAllTask,
  fetchTask,
  fetchTaskfromQuery,
  deleteTask,
};
