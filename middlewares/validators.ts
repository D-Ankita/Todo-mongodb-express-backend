import { Request, Response, NextFunction } from 'express';
import {Task} from "../models/Tasks";
// const Task = require("../models/Tasks");
const AppError = require("../utils/AppError");

const isTaskPresent = async (req:Request , res:Request, next:NextFunction)=>{
  console.log(req);
    const{
        params: {id},
    }=req;
    console.log("id--",id);
    
    try{
        let task = await Task.findOne({id:id})
        console.log("task -- ispresent", typeof task);
        console.log("task-- in isTaskPresetn",task);
        if(!task){
            return next(new AppError(404, `Task not found`));
        }
        req.task = task;
        next()
    }
    catch(err){
        return next(new AppError(400 , " Bad request --valid22"))
    }
}

const validBody =  async (req:Request , res:Response, next:NextFunction)=> {
    let validKeys = ["description", "isComplete"];
    console.log("req.body", req.body);
    if (Object.keys(req.body).length === 0) {
      return next(new AppError(400, "Bad Request --valid30"));
    }
    for (let key in req.body) {
      if (validKeys.includes(key)) {
        console.log("KEY--", key);
        switch (key) {
          case "description":
            console.log("here in switch description");
            if (req.body.description.length < 2) {
              return next(new AppError(400, "Bad Request --valid39"));
            }
            break;
          case "isComplete":
            console.log("here in switch isComplete");
            if (typeof req.body.isComplete !== "boolean") {
              return next(new AppError(400, "Bad Request --valid45"));
            }
           
            req.toggleIsComplete = true;
            break;
        }
        req.containsValidBody = true;
        console.log("here outside switch");
      } else {
        return next(new AppError(400, "Bad Request --valid54"));
      }
    }
    console.log("has a valid body");
    next();
  };

  module.exports = {
    isTaskPresent,
    validBody,
  };
  