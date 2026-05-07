console.log("connected to db");

//mongodb+srv://tusharkartik8_db_user:ANIL2006@cluster0.v5rocih.mongodb.net/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = mongoose.Schema.Types.ObjectId;

/* ---------------- USER ---------------- */
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: String,
    lastname: String
});

/* ---------------- ADMIN ---------------- */
const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: String,
    lastname: String
});

/* ---------------- COURSE ---------------- */
const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    imageUrl: String,
    creatorId: {
        type: ObjectId,
        ref: "Admin"
    }
});

/* ---------------- PURCHASE ---------------- */
const purchaseSchema = new Schema({
    courseId: {
        type: ObjectId,
        ref: "Course"
    },
    userId: {
        type: ObjectId,
        ref: "User"
    }
});

/* ---------------- MODELS ---------------- */
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = {
    User,
    Admin,
    Course,
    Purchase
};