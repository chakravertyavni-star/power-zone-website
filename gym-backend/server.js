const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// connect database
connectDB();

// routes
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// test route
app.get("/", (req, res) => {
    res.send("Power Zone Backend Running");
});

app.get("/api/health", (req, res) => {
    res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

