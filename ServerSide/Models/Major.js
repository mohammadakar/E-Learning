const mongoose=require("mongoose");

const MajorSchema = new mongoose.Schema({
    major: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Major=mongoose.model("major",MajorSchema);


module.exports={
    Major
}