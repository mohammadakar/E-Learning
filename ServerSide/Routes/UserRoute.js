const router = require("express").Router();
const { updateProfilePhoto, deleteAcc, updateUserProfile, getAllUsersCount, registerCourse, getUserCourses, dropCourse, getInstructors, getInstructorsCount, getAllUsers, deleteUser, assignInstructor } = require("../Controllers/UserController");
const multer = require('multer');
const path = require('path');
const { verifyToken, verifyTokenAndAdmin } = require("../Middlewares/authmiddleware");

const photoStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../images"))
    },
    filename:function(req,file,cb){
        if(file){
            cb(null,new Date().toISOString().replace(/:/g,"-")+file.originalname)
        }else{
            cb(null,false)
        }
    }

});

const photoUpload=multer({
    storage:photoStorage,
    fileFilter:function(req,file,cb){
        if(file.mimetype.startsWith("image")){
            cb(null,true);
        }else{
            cb({message:"unsupported file format"},false);
        }
    },
    limits:{fileSize:5024*5024}

});

router.post('/updateProfilePhoto', verifyToken, photoUpload.single("image"), updateProfilePhoto);
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
