
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// CREATE - Add New Job
router.post("/", async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ - Get All Jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE - Edit Job
router.put("/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Remove Job
router.delete("/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }
        res.json({
            message: "Job deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
