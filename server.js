
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/jobs", require("./routes/jobRoutes"));

app.get("/", (req, res) => {
    res.send("Job Application Tracker API is running");
});

// CI/CD deployment test API
app.use("/api/happy", (req, res) => {
    return res.status(200).json({
        message: "sound is great guy"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
