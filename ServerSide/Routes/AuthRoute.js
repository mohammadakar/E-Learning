const { RegisterUser, loginUser, verifyUserAccountCtrl, addUser } = require("../Controllers/AuthController");
const { verifyTokenAndAdmin } = require("../Middlewares/authmiddleware");
const router=require("express").Router();

router.post('/register',RegisterUser);
router.post('/login',loginUser);
router.get("/:userId/verify/:token",verifyUserAccountCtrl);
router.post("/addUser",verifyTokenAndAdmin,addUser);

module.exports=router;