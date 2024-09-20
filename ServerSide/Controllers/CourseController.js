const asynchandler=require('express-async-handler');
const { validateAddCourse, Course } = require('../Models/Course');
const { User } = require('../Models/User');
const sendMail = require('../utils/sendMail');
const { cloudinaryUploadImage } = require('../utils/cloudinary');

module.exports.addCourse=asynchandler(async (req,res)=>{
    const {error}=validateAddCourse(req.body);

    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    const course =await new Course({
        courseName:req.body.courseName,
        code:req.body.code,
        instructor:req.body.instructor,
        major:req.body.major,
        time:req.body.time,
    });

    await course.save();

    res.status(200).json(course);
})

module.exports.getAllCourses=asynchandler(async (req,res)=>{
    const courses=await Course.find();
    res.status(200).json(courses);
})

module.exports.getAllCoursesCount=asynchandler(async (req,res)=>{
    const courseCount=await Course.countDocuments();
    res.status(200).json(courseCount);
})

module.exports.getCourse=asynchandler(async (req,res)=>{
    const course = await Course.findById(req.params.id);
    if(!course){
        return res.status(404).json("Course not found");
    }
    res.status(200).json(course);
})

module.exports.deleteCourse=asynchandler(async (req,res)=>{
    const course=await Course.findByIdAndDelete(req.params.id);
    res.status(200).json(course)
})

module.exports.EditCourse=asynchandler(async (req,res)=>{
    const course = await Course.findById(req.params.id);
    if(!course){
        return res.status(404).json({message:"Course not found"});
    }
    
    const updatedCourse=await Course.findByIdAndUpdate(req.params.id,{
        $set:{
            courseName:req.body.courseName,
            code:req.body.code,
            instructor:req.body.instructor,
            time:req.body.time,
        }
    },{new:true});
    await course.save();
    res.status(200).json(updatedCourse);
})

module.exports.getCourseStudents=(asynchandler(async(req,res)=>{
    const course=await Course.findById(req.params.id);

    if(!course){
        return res.status(404).json({message:"Course not found"});
    }

    const users=await User.find({
        _id: {$in:course.students}
    })

    res.status(200).json(users);
}))

const sendEmailToStudents = async (course, subject, htmlTemplate) => {
    // Get student IDs from the course
    const studentIds = course.students;

    // Fetch all students' details using the student IDs
    const students = await User.find({ '_id': { $in: studentIds } });

    // Send email to each student
    for (const student of students) {
        await sendMail(student.email, subject, htmlTemplate);
    }
};



module.exports.addTask = asynchandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
    };
    course.tasks.push(task);
    await course.save();

    // Notify students
    const htmlTemplate = `
        <div>
            <p>A new task has been added to your course: ${course.courseName}</p>
            <p><strong>Title:</strong> ${task.title}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
        </div>
    `;
    await sendEmailToStudents(course, 'New Task Added', htmlTemplate);

    res.status(200).json(task);
});

module.exports.addComment = asynchandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    const comment = {
        content: req.body.content,
    };
    course.comments.push(comment);
    await course.save();

    // Notify students
    const htmlTemplate = `
        <div>
            <p>A new comment has been added to your course: ${course.courseName}</p>
            <p><strong>Comment:</strong> ${comment.content}</p>
        </div>
    `;
    await sendEmailToStudents(course, 'New Comment Added', htmlTemplate);

    res.status(200).json(comment);
});



module.exports.editTask = asynchandler(async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    const task = course.tasks.id(req.params.taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;

    await course.save();

    res.status(200).json({ message: 'Task updated successfully', task });
});

module.exports.editComment = asynchandler(async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    const comment = course.comments.id(req.params.commentId);
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    comment.content = req.body.content || comment.content;
    

    await course.save();

    res.status(200).json({ message: 'Comment updated successfully', comment });
});

module.exports.deleteTask = asynchandler(async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    const task = course.tasks.id(req.params.taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    course.tasks.id(req.params.taskId).remove();
    course.assignments = course.assignments.filter(assignment => assignment.taskId.toString() !== req.params.taskId);



    await course.save();

    res.status(200).json({ message: "Task deleted"});
});

module.exports.deleteComment = asynchandler(async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    const comment = course.comments.id(req.params.commentId);
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    course.comments.id(req.params.commentId).remove(); 


    await course.save();

    res.status(200).json({ message: 'Comment deleted successfully'});
});

module.exports.getTask = asynchandler(async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    const task = course.tasks.id(req.params.taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
});

module.exports.submitAssignment = asynchandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return res.status(404).json("Course not found");
    }

    if (course.assignments.some(assignment => assignment.username === req.user.username && assignment.taskId.toString() === req.params.taskId)) {
        return res.status(400).json({ message: "You have already submitted your assignment!" });
    }

    const task = course.tasks.id(req.params.taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }


    const assignment = {
        assignment: task.title,
        username: req.user.username,
        file: req.body.filePath,
        taskId: req.params.taskId
    };

    course.assignments.push(assignment);
    await course.save();

    res.status(200).json(assignment);
});
