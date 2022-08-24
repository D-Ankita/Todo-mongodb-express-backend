"use strict";
const express = require("express");
const todoRouter = require("./routes/taskRoutes");
// const todoFrontEndRouter =  require("./routes/todoFrontEndRouter");
const sendErrorResponse = require("./middlewares/sendErrorResponse");
// /middlewares/sendErrorResponse
let app = express();
app.use(express.json());
// app.use(express.static('public'))
app.use("/todos", todoRouter);
// app.use("/frontendTodo",todoFrontEndRouter);
app.use(sendErrorResponse);
module.exports = app;
// export{app}
//# sourceMappingURL=app.js.map