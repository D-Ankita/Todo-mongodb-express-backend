const Router = require("express");
const { addTask, getAllTask, fetchTask, fetchTaskfromQuery, deleteTask, updateTask, addTaskQuery  } = require("../controllers/taskController");
const {isTaskPresent,validBody} = require("../middlewares/validators");


const router =  Router();


router.route("/?").get(fetchTaskfromQuery).delete().patch().post(validBody,addTask)
router.route("/:id").get(isTaskPresent, fetchTask).delete(isTaskPresent,deleteTask).patch(isTaskPresent,updateTask)
router.route("/").post(addTask).get(getAllTask)
module.exports = router