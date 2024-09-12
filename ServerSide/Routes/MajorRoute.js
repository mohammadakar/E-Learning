const { addMajor, getAllMajors } = require("../Controllers/MajorController");
const { verifyTokenAndAdmin } = require("../Middlewares/authmiddleware");

const router = require("express").Router();

router.post("/addMajor",verifyTokenAndAdmin,addMajor);
router.get("/allMajors",getAllMajors);


module.exports=router;