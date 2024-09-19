const router=require("express").Router();
const { addCourse, getAllCoursesCount, getAllCourses, getCourse, deleteCourse, EditCourse, getCourseStudents, addTask, addComment, editTask, editComment, deleteTask, deleteComment, getTask, submitAssignment } = require("../Controllers/CourseController");
const { verifyTokenAndAdmin, verifyToken } = require("../Middlewares/authmiddleware");
const multer = require("multer");
const path = require("path");


const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../images"));
    },
    filename: function(req, file, cb) {
        if (file) {
            cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
        } else {
            cb(null, false);
        }
    }
});

const fileUpload = multer({
    storage: fileStorage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype.startsWith("application") || file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb({ message: "unsupported file format" }, false);
        }
    },
    limits: { fileSize: 5024 * 5024 }
});




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
router.post("/:courseId/submit-assignment/task/:taskId",fileUpload.single("application"),verifyToken,submitAssignment);
module.exports=router;