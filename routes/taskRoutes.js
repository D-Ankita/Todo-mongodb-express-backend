const Router = require("express");
const { addTask, getAllTask, fetchTask, fetchTaskfromQuery, deleteTask  } = require("../controllers/taskController");
const isTaskPresent = require("../middlewares/validators");


const router =  Router();

router.route("/").post(addTask).get(getAllTask)
router.route("/:id").get(isTaskPresent, fetchTask).delete(isTaskPresent,deleteTask)
router.route("/?").get(fetchTaskfromQuery)
module.exports = router