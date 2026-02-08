const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();


// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            email,
            password: hashedPassword,
            services: {
                personalTrainer: false,
                nutritionist: false,
                weekendSession: false
            }
        });

        await user.save();

        res.status(201).json({ message: "Signup successful" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


// ================= MIDDLEWARE (TOKEN CHECK) =================
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
}


// ================= SAVE SERVICES =================
router.post("/services", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        user.services = req.body;

        await user.save();

        res.json({ message: "Services saved" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


// ================= GET SAVED SERVICES =================
router.get("/services", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.services);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
