const Router = require("express");
const { addTask, getAllTask, fetchTask, fetchTaskfromQuery  } = require("../controllers/taskController");
const isTaskPresent = require("../middlewares/validators");


const router =  Router();

router.route("/?").get(fetchTaskfromQuery)
router.route("/").post(addTask).get(getAllTask)
router.route("/:id").get(isTaskPresent, fetchTask)
module.exports = router