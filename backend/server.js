require("dotenv").config()
const express = require("express");
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/user")
const mongoose = require("mongoose")
const cors = require('cors');



const app = express();
app.use(cors());

app.use((req,res,next)=>{
    console.log(req.path , req.method)
    next()
})
app.use(express.json())
app.use("/api/workouts",workoutRoutes);

app.use("/api/user",userRoutes);

//connection to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(` db connected succefully and app listning on ${process.env.PORT}`)
    }) 
})
.catch((error)=>{
   console.log(error)
})

