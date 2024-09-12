const mongoose=require("mongoose");
const joi=require("joi");
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    major: {
        type:String,
        required: true
    },
    cover: {
        type: Object,
        default: { url: "https://static.vecteezy.com/system/resources/thumbnails/003/127/954/small_2x/abstract-template-blue-background-white-squares-free-vector.jpg" }
    },
    time: {
        type: String,
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        dueDate: {
            type: String
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    comments: [{
        content:{
            type: String,
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    assignments:[{
        assignment:{
            type:String
        },
        username:{
            type:String
        },
        file:{
            fileName: String,
            filePath: String
        },
        taskId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Task' 
        }
    }]
}, { timestamps: true });

//Course model
const Course=mongoose.model("course",courseSchema);

//validate register user
function validateAddCourse(obj){
    const schema=joi.object({
        courseName:joi.string().trim().min(5).max(150).required(),
        code:joi.string().trim().min(2).max(150).required(),
        instructor:joi.string().trim().min(2).max(100).required(),
        major:joi.string().required(),
        time:joi.string().required(),
    });
    return schema.validate(obj);
}

module.exports={
    Course,
    validateAddCourse
}