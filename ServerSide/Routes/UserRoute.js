const router = require("express").Router();
const { updateProfilePhoto, deleteAcc, updateUserProfile, getAllUsersCount, registerCourse, getUserCourses, dropCourse, getInstructors, getInstructorsCount, getAllUsers, deleteUser, assignInstructor } = require("../Controllers/UserController");
const multer = require('multer');
const path = require('path');
const { verifyToken, verifyTokenAndAdmin } = require("../Middlewares/authmiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/updateProfilePhoto', verifyToken, upload.single('profilePhoto'), updateProfilePhoto);
router.delete('/delete', verifyToken, deleteAcc);
router.put('/updateProfile', verifyToken, updateUserProfile);
router.get('/allUserscount', verifyTokenAndAdmin, getAllUsersCount);
router.post("/registerCourse", verifyToken, registerCourse);
router.get("/myCourses",verifyToken,getUserCourses);
router.delete('/drop',verifyToken,dropCourse);
router.get("/instructor",verifyTokenAndAdmin,getInstructors);
router.get("/instructorCount",verifyTokenAndAdmin,getInstructorsCount);
router.get("/allUsers",verifyTokenAndAdmin,getAllUsers);
router.delete("/deleteUser/:id",verifyTokenAndAdmin,deleteUser);
router.put("/assignInstructor/:id",verifyTokenAndAdmin,assignInstructor);
module.exports = router;
