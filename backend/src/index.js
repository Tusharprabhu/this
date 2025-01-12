require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Items = require("./models/Items");

app.use(
    cors({
      origin: "*",  // Allow both ports
      credentials:true,
    })
  );
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

mongoose.connect('mongodb+srv://admin:admin@cluster0.sbw1w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.get("/", async (req, res) => {
    Items.find().then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
    
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
