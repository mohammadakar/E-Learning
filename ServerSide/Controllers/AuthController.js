const asyncHandler = require("express-async-handler");
const { validateRegisterUser, User, validateLoginUser } = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto=require("crypto")
const { VerificationToken } = require("../Models/VerificationToken");
const sendMail = require("../utils/sendMail");

module.exports.RegisterUser = asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        major:req.body.major
    });
    await user.save();
    
    const verificationToken =new VerificationToken({
        userId:user._id,
        token:crypto.randomBytes(32).toString("hex"),
    })
    await verificationToken.save();

    const link =`${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`

    const htmlTemplate=`
    <div>
        <p>Click on the link below to verify your email</p>
        <a href="${link}">Verify</a>
    </div>
    `

    await sendMail(user.email,"Verify Your Email",htmlTemplate)

    res.status(201).json({message:"We sent to you an email, please verify your email address"})
});

module.exports.loginUser = asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid email or password!" });
    }

    if(!user.isAccountVerified){
        let verificationToken=await VerificationToken.findOne({
            userId:user._id
        });

        if(!verificationToken){
            verificationToken=new VerificationToken({
                userId:user._id,
                token:crypto.randomBytes(32).toString("hex")
            });
            await verificationToken.save();
        }

        const link =`${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`
        
        const htmlTemplate=`
        <div>
            <p>Click on the link below to verify your email</p>
            <a href="${link}">Verify</a>
        </div>
        `

        await sendMail(user.email,"Verify Your Email",htmlTemplate)

        return res.status(400).json({message:"We sent to you an email, please verify your email address"})
    }

    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin ,username: user.username,},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        isInstructor:user.isInstructor,
        profilePhoto: user.profilePhoto,
        token,
        courses:user.courses,
        username: user.username,
        major:user.major
    });
});

module.exports.verifyUserAccountCtrl=asyncHandler(async (req,res)=>{
    const user=await User.findById(req.params.userId);
    if(!user){
        return res.status(400).json({message:"invalid link"});
    }

    const verificationToken=await VerificationToken.findOne({
        userId:user._id,
        token:req.params.token,
    })

    if(!verificationToken){
        return res.status(400).json({message:"invalid link"});
    }

    user.isAccountVerified=true;
    await user.save();

    await VerificationToken.deleteOne({ _id: verificationToken._id });

    res.status(200).json({message:"Your account verified"})
})

module.exports.addUser=asyncHandler(async (req,res)=>{
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        major:req.body.major
    });
    user.isAccountVerified=true;
    await user.save();
    res.status(200).json(user);
})
