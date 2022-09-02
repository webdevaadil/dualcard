const dotenv=require("dotenv")
dotenv.config({ path: "./config.env" });
const express = require("express");
const connectDB =require("./config/db")
const path = require("path")
const cors = require("cors")
const cloudinary=require("cloudinary")
const Image = require("./models/Image")
const User = require("./models/User")
const multer = require("multer")
const cookiesparser = require("cookie-parser");
const app = express();
const errorMiddleware = require("./Errorhandlers/Error")
const bodyparser = require("body-parser");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "500kb", extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookiesparser());

connectDB()
app.use(cors())
app.use('/api/auth', require('./routes/auth'))
const PORT = process.env.PORT ||5000;



app.post("/upload",(req,res)=>{
  const image = new Image({
    userId:req.body.userId,
    url:req.body.image
  })
  
  image.save()

  return res.json(image)
})


app.get("/getuser",async(req,res)=>{

  const user = await User.find()
  return res.json(user)

})

// --------------------------deployment------------------------------
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);
if (process.env.NODE_ENV === "production") {
} 
else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


// --------------------------deployment------------------------------

//----------------------cloundinary-----------------------------

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  secure:true
});



const server=app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});




process.on("unhandledRejection",(err,promise)=>{
  console.log(` logged error${err}`);
  server.close(()=>process.exit(1));
})


//errorhandler
app.use(errorMiddleware)
