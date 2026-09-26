const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// CREATE - Add a new student
router.post("/", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json({
            message: "Student created successfully",
            student: student
        });

    } catch (error) {
        res.status(400).json({
            message: "Error creating student",
            error: error.message
        });
    }
});


// READ - Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();

        res.json(students);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching students",
            error: error.message
        });
    }
});


// READ - Get one student
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {
        res.status(400).json({
            message: "Invalid student ID"
        });
    }
});


// UPDATE - Update a student
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully",
            student: student
        });

    } catch (error) {
        res.status(400).json({
            message: "Error updating student",
            error: error.message
        });
    }
});


// DELETE - Delete a student
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Error deleting student",
            error: error.message
        });
    }
});


module.exports = router;