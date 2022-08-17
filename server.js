const mongoose = require("mongoose");
const Task = require("./models/Tasks");
const app = require("./app")
const dotenv = require("dotenv")
dotenv.config();
// const{ DB_LOCAL , PORT} = process.env
const DB_LOCAL = "mongodb://localhost:27017/Training-Class-2022";
const PORT = "3000";


// mongoose.connect(DB_LOCAL, {}).then((connection) => {
//     console.log("connection", connection);
//     //create a new Task .. 
//     let newTask = new Task({id:"some ID",
//         description:"some Desc",})
//     // it is not in db, save the Task
//     newTask.save()}).catch((err) => {
//     console.log("error", err);
//   });

  mongoose
  .connect(DB_LOCAL, {})
  .then((connection) => {
    return app.listen(PORT || 3000 ,()=>{
        console.log("on port:",PORT);
    })

  })
  .catch((err) => {
    console.log("error in connecting", err);
  });
