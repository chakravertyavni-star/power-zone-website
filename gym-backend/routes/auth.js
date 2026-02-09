const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

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
    if (!User) return res.status(404).json({ message: "User not found" });

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

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("email");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ email: user.email });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
