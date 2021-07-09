const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

const host = '0.0.0.0';
const port = process.env.PORT || 8800;

dotenv.config();

app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("MongoDB Connected!")
}).catch((err)=> console.log(err));


app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);


app.listen(port, host, function() {
    console.log("Server started.......");
  });

// ... other imports
const path = require("path")

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

