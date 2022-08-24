"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const uniqid = require("uniqid");
const mongoosePaginate = require("mongoose-paginate-v2");
const taskSchema = new mongoose_1.Schema({
    id: { type: String, default: uniqid() },
    description: {
        type: String,
        required: true,
        minLength: [4, "Description too short"],
    },
    isComplete: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});
taskSchema.plugin(mongoosePaginate);
const Task = (0, mongoose_1.model)("Tasks", taskSchema);
exports.Task = Task;
//what is rhe name of collection
//how to access collection
//object of collection is your model
//
//Tasks is my Collection.
//Task -- way to access the Task
// const task1 = new Task({id:"some ID",
//     description:"some Desc",})
// //task1 is my document
// console.log(task1);
//# sourceMappingURL=Tasks.js.map