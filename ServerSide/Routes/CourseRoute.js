const router=require("express").Router();
const { addCourse, getAllCoursesCount, getAllCourses, getCourse, deleteCourse, EditCourse, getCourseStudents, addTask, addComment, editTask, editComment, deleteTask, deleteComment, getTask, submitAssignment } = require("../Controllers/CourseController");
const { verifyTokenAndAdmin, verifyToken } = require("../Middlewares/authmiddleware");
const multer = require("multer");
const path = require("path");


router.post('/addCourse',verifyTokenAndAdmin,addCourse);
router.get('/getAllCoursesCount',verifyTokenAndAdmin,getAllCoursesCount);
router.get('/getAllCourses',getAllCourses);
router.get("/course/:id",getCourse);
router.delete("/deleteCourse/:id",verifyTokenAndAdmin,deleteCourse);
router.put("/update/:id",verifyTokenAndAdmin,EditCourse);
router.get("/courseUsers/:id",getCourseStudents);
router.post("/addTask/:id",addTask);
router.post("/addComment/:id",addComment);
router.put("/:courseId/task/:taskId",editTask);
router.put("/:courseId/comment/:commentId",editComment);
router.delete("/:courseId/task/:taskId",deleteTask);
router.delete("/:courseId/comment/:commentId",deleteComment);
router.get("/:courseId/task/:taskId",getTask);
router.post("/:courseId/submit-assignment/task/:taskId",verifyToken,submitAssignment);
module.exports=router;