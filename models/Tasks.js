const mongoose = require("mongoose");
const uniqid = require("uniqid");
const mongoosePaginate = require("mongoose-paginate-v2")
//defines the structure of the document in my collection
const taskSchema = mongoose.Schema(
  {
    id: { type: String, default: uniqid() },
    description: {
      type: String,
      required: true,
      minLength: [4, "Description too short"],
    },
    isComplete:{
      type:Boolean,
      default:false,
    }
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(mongoosePaginate)

const Task = mongoose.model("Tasks", taskSchema);
module.exports = Task;

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
