const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const studentRoutes = require("./routes/StudentRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

app.use("/api/students", studentRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT, () => {

            console.log(
                `Server running on http://localhost:${process.env.PORT}`
            );

        });

    })
    .catch((error) => {

        console.log("Database connection failed");
        console.log(error.message);

    });