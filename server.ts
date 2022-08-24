const mongoose = require("mongoose");
const Task = require("./models/Tasks");
let application = require("./app")
const dotenv = require("dotenv")
dotenv.config();
const{ DB_LOCAL , PORT} = process.env


  mongoose
  .connect(DB_LOCAL, {})
  .then(() => {
    return application.listen(PORT || 3000 ,()=>{
        console.log("on port:",PORT);
    })

  })
  .catch((err:Error) => {
    console.log("error in connecting", err);
  });
