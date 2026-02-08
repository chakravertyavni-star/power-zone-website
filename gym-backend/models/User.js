const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    services: {
        personalTrainer: { type: Boolean, default: false },
        nutritionist: { type: Boolean, default: false },
        weekendSession: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model("User", UserSchema);
