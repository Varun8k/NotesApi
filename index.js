const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv=require("dotenv")
const cors=require("cors")
dotenv.config()

const userRouter = require("./route/userRoute");
const noteRouter = require("./route/noteRoute");

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/note",noteRouter)

app.get("/", (req, res) => {
  res.json({"message":"Welcome to note api"});
});
const PORT=process.env.PORT||5000
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  app.listen(PORT, () => {
    console.log("server start"+PORT);
  });
}).catch((error)=>{
console.log(error);
})


