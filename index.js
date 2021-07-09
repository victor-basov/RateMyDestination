const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

const port = process.env.PORT || 5000;

dotenv.config();

app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("MongoDB Connected!")
}).catch((err)=> console.log(err));


app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);


app.listen(5000,()=>{
    console.log("Backend server is running!")
})

// ... other imports
const path = require("path")

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

