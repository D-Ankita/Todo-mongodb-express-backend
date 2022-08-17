const Task = require("../models/Tasks");
const AppError = require("../utils/AppError");

const isTaskPresent = async (req , res, next)=>{
    const{
        params: {id},
    }=req;
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
        return next(new AppError(400 , " Bad request"))
    }
}

module.exports = isTaskPresent;