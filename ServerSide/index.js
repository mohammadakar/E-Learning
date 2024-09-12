const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path=require("path")
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000',''],
    credentials: true
}));

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

// Routes
app.use("/api/auth", require("./Routes/AuthRoute"));
app.use("/api/user", require("./Routes/UserRoute"));
app.use("/api/course",require("./Routes/CourseRoute"));
app.use("/api/major",require("./Routes/MajorRoute"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'clientSide', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'clientSide', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Please set NODE_ENV to production');
    });
}


const PORT = process.env.PORT || 7500;

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
