const express = require("express");
const todoRouter =  require("./routes/taskRoutes");
// const testRouter =  require("./routes/testRoutes");

const sendErrorResponse = require("./middlewares/sendErrorResponse");


const app = express();

app.use(express.json());

app.use("/todos",todoRouter);
// app.use("/test",testRouter);
app.use(sendErrorResponse);
module.exports = app