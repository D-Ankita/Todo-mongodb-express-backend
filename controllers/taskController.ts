const uniqid = require("uniqid");
import {Task } from "../models/Tasks"
// const {Task} = require("../models/Tasks");
const AppError = require("../utils/AppError");
const sendResponse = require("../middlewares/sendResponse");
import {  Response, NextFunction } from 'express';
// db.createArrayDemo.find({},{_id:0}, {UserName:1}).toArray();
// const test = (Task.find({},{_id:0},{description:1}).select("description"));
// console.log(test);
import { Request } from 'express';

const addTask = async(req:Request, resp:Response, next:NextFunction) => {
  console.log("method addTask");
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
    return next(new AppError(400, "Bad request --tC28"));
  }
};

const addTaskQuery = async (req:Request, resp:Response, next:NextFunction) => {
  console.log("method addTask");
  const {
    query: { description, isComplete },
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
    return next(new AppError(400, "Bad request --tC48"));
  }
};

const getAllTask = async (req:Request, res:Response, next:NextFunction) => {
  console.log("method getAllTask");
  try {
    const { page = 1, limit = 5 } = req.query;
    // let tasks = await Task.paginate({}, { page: page, limit: limit });
    let tasks = await Task.find();
    res.status(200).json({
      message: "successfully fetched tasks",
      docs: tasks,
    }); 
  } catch (err) {
    console.log("error", err);
    return next(new AppError(400, "Bad request --tC64"));
  }
};

const fetchTask = async (req:Request, res:Response, next:NextFunction) => {
  console.log("method fetchTask");

  const { task } = req;
  return sendResponse(req, res, next, {
    statusCode: 200,
    message: "task fetched",
    payload: task,
  });
};

const fetchTaskfromQuery = async (req:Request, res:Response, next:NextFunction) => {
  console.log("method fetchTaskfromQuery");
  // let page = Number((req.query as {page:string}).page) ;
  // let limit = Number((req.query as {limit:string}).limit );
  // let otherProperties = (req.query as {otherProperties:object[]}).otherProperties ;
interface requestObject{
  pageNo:string;
  limitCount:string;
  otherProperties:object[]
}
  // const { query: queryObject } = req;
  let { pageNo,limitCount,...otherProperties}= req.query as unknown as requestObject 
   let page = Number(pageNo)
   let limit = Number(limitCount)

  if(!limit){
    console.log("inside limit If");
    limit=5
  }
  if(!page){
    page=1
  }
  console.log("query in req-page", page );
  console.log("query in req-otherProperties", otherProperties );
  console.log("query in req-limit", limit );
  try {
    let task = await Task.find({ ...otherProperties }).limit(limit * 1).skip((page - 1) * limit).exec();
    let taskLength = await (await Task.find({ ...otherProperties })).length
    // console.log("task----", task, typeof task);  
    console.log("task length",taskLength);
    console.log("Math.ceil(task.length/limit",Math.ceil(task.length/limit));
    if(taskLength>0 && page> Math.ceil(task.length/limit)+1){
      return next(new AppError(404, `No results found`));
    }
    if (!taskLength) {
      return next(new AppError(404, `Task not found`));
    }
    // if(task.length>0 && task.length< Math.ceil(task.length/limit)){
    return sendResponse(req, res, next, {
      statusCode: 200,
      message: "task fetched",
      payload: task,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError(400, " Bad request --tC117"));
  }
};

const deleteTask = async (req:Request, res:Response, next:NextFunction) => {
  console.log("method deleteTask");
  const {
    params: { id },
  } = req;
  try {
    let deletedCount = await Task.deleteOne({ id: id });
    console.log(deletedCount);
    return sendResponse(req, res, next, {
      statusCode: 200,
      message: "task deleted",
    });
  } catch (err:any) {
    console.log(err.message);
    return next(new AppError(500, "internal error operation"));
  }
};

const updateTask = async (req:Request, res:Response, next:NextFunction) => {
  console.log("method updateTask");

  const { body: updateObject } = req;
  const {
    params: { id },
  } = req;
  let task = req.task;
  console.log("typeof task", typeof task);
  console.log("updateObject", updateObject.description);
  try {
    let updatedTask = await Task.findOneAndUpdate(
      { id: id },
      { $set: { ...updateObject } },
      { new: true }
    );

    return sendResponse(req, res, next, {
      statusCode: 200,
      message: `task updated`,
      payload: updatedTask,
    });
  } catch (err) {
    console.log("error", err);
    return next(new AppError(500, "internal error operation --tC163"));
  }
};

export{
  addTask,
  getAllTask,
  fetchTask,
  fetchTaskfromQuery,
  deleteTask,
  updateTask,
  addTaskQuery
};
