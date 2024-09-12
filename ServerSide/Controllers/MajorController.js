const asyncHandler = require("express-async-handler");
const { Major } = require("../Models/Major");

module.exports.addMajor=asyncHandler(async (req,res)=>{
    let major = await Major.findOne({major:req.body.major});

    if(major){
        return res.status(400).json("Already exists!")
    }

    major = new Major({
        major:req.body.major,
        faculty:req.body.faculty
    })

    await major.save();

    res.status(200).json(major)
})

module.exports.getAllMajors=asyncHandler(async (req,res)=>{
    const majors= await Major.find();
    res.status(200).json(majors)
})