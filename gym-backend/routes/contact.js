const express = require("express");
const Contact = require("../models/contact");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email, and message are required" });
    }

    try {
        const contact = await Contact.create({ name, email, phone, message });
        res.status(201).json({
            message: "Message sent successfully",
            id: contact._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Could not send message" });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const adminEmail = "samya@gmail.com";
        const admin = await User.findById(req.user.id);

        if (!admin || admin.email !== adminEmail) {
            return res.status(403).json({ message: "Access denied" });
        }

        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
