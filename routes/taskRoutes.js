const Router = require("express");
const { addTask  } = require("../controllers/taskController");


const router =  Router();

// router.route("/?").get(fetchTaskfromQuery)
router.route("/").post(addTask)
module.exports = router