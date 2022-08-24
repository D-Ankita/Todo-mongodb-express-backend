"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTaskQuery = exports.updateTask = exports.deleteTask = exports.fetchTaskfromQuery = exports.fetchTask = exports.getAllTask = exports.addTask = void 0;
const uniqid = require("uniqid");
const Tasks_1 = require("../models/Tasks");
// const {Task} = require("../models/Tasks");
const AppError = require("../utils/AppError");
const sendResponse = require("../middlewares/sendResponse");
const addTask = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("method addTask");
    const { body: { description, isComplete }, } = req;
    try {
        const newTask = new Tasks_1.Task({
            id: uniqid(),
            description: description,
            isComplete: isComplete,
        });
        yield newTask.save();
        resp.status(200).json({ message: "new task", data: newTask });
    }
    catch (err) {
        console.log("err", err);
        return next(new AppError(400, "Bad request --tC28"));
    }
});
exports.addTask = addTask;
const addTaskQuery = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("method addTask");
    const { query: { description, isComplete }, } = req;
    try {
        const newTask = new Tasks_1.Task({
            id: uniqid(),
            description: description,
            isComplete: isComplete,
        });
        yield newTask.save();
        resp.status(200).json({ message: "new task", data: newTask });
    }
    catch (err) {
        console.log("err", err);
        return next(new AppError(400, "Bad request --tC48"));
    }
});
exports.addTaskQuery = addTaskQuery;
const getAllTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("method getAllTask");
    try {
        const { page = 1, limit = 5 } = req.query;
        // let tasks = await Task.paginate({}, { page: page, limit: limit });
        let tasks = yield Tasks_1.Task.find();
        res.status(200).json({
            message: "successfully fetched tasks",
            docs: tasks,
        });
    }
    catch (err) {
        console.log("error", err);
        return next(new AppError(400, "Bad request --tC64"));
    }
});
exports.getAllTask = getAllTask;
const fetchTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("method fetchTask");
    const { task } = req;
    return sendResponse(req, res, next, {
        statusCode: 200,
        message: "task fetched",
        payload: task,
    });
});
exports.fetchTask = fetchTask;
const fetchTaskfromQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("method fetchTaskfromQuery");
    // const { query: queryObject } = req;
    let _a = req.query, { pageNo, limitCount } = _a, otherProperties = __rest(_a, ["pageNo", "limitCount"]);
    let page = Number(pageNo);
    let limit = Number(limitCount);
    if (!limit) {
        console.log("inside limit If");
        limit = 5;
    }
    if (!page) {
        page = 1;
    }
    console.log("query in req-page", page);
    console.log("query in req-otherProperties", otherProperties);
    console.log("query in req-limit", limit);
    try {
        let task = yield Tasks_1.Task.find(Object.assign({}, otherProperties)).limit(limit * 1).skip((page - 1) * limit).exec();
        let taskLength = yield (yield Tasks_1.Task.find(Object.assign({}, otherProperties))).length;
        // console.log("task----", task, typeof task);  
        console.log("task length", taskLength);
        console.log("Math.ceil(task.length/limit", Math.ceil(task.length / limit));
        if (taskLength > 0 && page > Math.ceil(task.length / limit) + 1) {
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
    }
    catch (err) {
        console.log(err);
        return next(new AppError(400, " Bad request --tC117"));
    }
});
exports.fetchTaskfromQuery = fetchTaskfromQuery;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("method deleteTask");
    const { params: { id }, } = req;
    try {
        let deletedCount = yield Tasks_1.Task.deleteOne({ id: id });
        console.log(deletedCount);
        return sendResponse(req, res, next, {
            statusCode: 200,
            message: "task deleted",
        });
    }
    catch (err) {
        console.log(err.message);
        return next(new AppError(500, "internal error operation"));
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("method updateTask");
    const { body: updateObject } = req;
    const { params: { id }, } = req;
    let task = req.task;
    console.log("typeof task", typeof task);
    console.log("updateObject", updateObject.description);
    try {
        let updatedTask = yield Tasks_1.Task.findOneAndUpdate({ id: id }, { $set: Object.assign({}, updateObject) }, { new: true });
        return sendResponse(req, res, next, {
            statusCode: 200,
            message: `task updated`,
            payload: updatedTask,
        });
    }
    catch (err) {
        console.log("error", err);
        return next(new AppError(500, "internal error operation --tC163"));
    }
});
exports.updateTask = updateTask;
//# sourceMappingURL=taskController.js.map