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
Object.defineProperty(exports, "__esModule", { value: true });
const Tasks_1 = require("../models/Tasks");
// const Task = require("../models/Tasks");
const AppError = require("../utils/AppError");
const isTaskPresent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const { params: { id }, } = req;
    console.log("id--", id);
    try {
        let task = yield Tasks_1.Task.findOne({ id: id });
        console.log("task -- ispresent", typeof task);
        console.log("task-- in isTaskPresetn", task);
        if (!task) {
            return next(new AppError(404, `Task not found`));
        }
        req.task = task;
        next();
    }
    catch (err) {
        return next(new AppError(400, " Bad request --valid22"));
    }
});
const validBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        }
        else {
            return next(new AppError(400, "Bad Request --valid54"));
        }
    }
    console.log("has a valid body");
    next();
});
module.exports = {
    isTaskPresent,
    validBody,
};
//# sourceMappingURL=validators.js.map