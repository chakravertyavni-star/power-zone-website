const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    services: {
        personalTrainer: Boolean,
        nutritionist: Boolean,
        weekendSession: Boolean
    }
});

module.exports = mongoose.model("User", userSchema);
