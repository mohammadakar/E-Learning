const asynchandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const { User } = require("../Models/User");
const bcrypt = require('bcryptjs');
const { Course } = require("../Models/Course");
const { cloudinaryRemoveImage, cloudinaryUploadImage } = require("../utils/cloudinary");

module.exports.updateUserProfile = asynchandler(async (req, res) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(req.user.id, {
        $set: {
            username: req.body.username,
            password: req.body.password,
        }
    }, { new: true }).select("-password");

    res.status(200).json(updateUser);
});

module.exports.updateProfilePhoto = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file provided!" });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove old profile photo if it exists
        if (user.profilePhoto && user.profilePhoto.public_id) {
            await cloudinaryRemoveImage(user.profilePhoto.public_id);
        }

        // Upload new profile photo
        const result = await cloudinaryUploadImage(req.file.path);

        // Update user's profile photo
        user.profilePhoto = {
            url: result.secure_url,
            public_id: result.public_id
        };
        await user.save();

        res.status(200).json({
            message: "Profile photo updated successfully",
            profilePhoto: user.profilePhoto
        });

    } catch (error) {
        console.error('Error in updateProfilePhoto:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports.registerCourse = asynchandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const courseID = await Course.findById(req.body.courseID);
    if (!courseID) {
        return res.status(404).json({ message: "Course not found" });
    }
    if(user.courses.includes(req.body.courseID)){
        return res.status(400).json({message:"Course already registered"})
    }
    user.courses.push(courseID);
    await user.save();
    courseID.students.push(req.user.id)
    await courseID.save();
    res.status(200).json(courseID);
});

module.exports.getUserCourses = asynchandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const courses = await Course.find({
        _id: { $in: user.courses }
    });

    res.status(200).json(courses);
});

module.exports.deleteAcc = asynchandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "Account deleted successfully" });
});

module.exports.getAllUsersCount = asynchandler(async (req, res) => {
    const users = await User.countDocuments();
    res.status(200).json(users);
});

module.exports.dropCourse=asynchandler(async (req,res)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    await user.courses.pull(req.body.courseID);
    await user.save();
    res.status(200).json({message:"Course deleted successfully"});
})

module.exports.getInstructors=asynchandler(async (req,res)=>{
    const user = await User.find({
        isInstructor:true
    });
    
    res.status(200).json(user)
})

module.exports.getInstructorsCount=asynchandler(async (req,res)=>{
    const instructorCount = await User.countDocuments({
        isInstructor:true
    })
    res.status(200).json(instructorCount);
})

module.exports.getAllUsers=asynchandler(async (req,res)=>{
    const users= await User.find();
    res.status(200).json(users);
})

module.exports.deleteUser=asynchandler(async (req,res)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return res.status(404).json({message:"User not found!"});
    }

    const deletedUser=await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
})

module.exports.assignInstructor=asynchandler(async (req,res)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return res.status(404).json({message:"User not found!"});
    }

    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
            isInstructor:true
        }
    },{new:true});
    await user.save();
    res.status(200).json(updatedUser)
})