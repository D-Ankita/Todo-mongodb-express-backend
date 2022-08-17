const Router = require("express");
const { addTask, getAllTask  } = require("../controllers/taskController");


const router =  Router();

// router.route("/?").get(fetchTaskfromQuery)
router.route("/").post(addTask).get(getAllTask)
module.exports = router