const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: Number,
        required: true,
        unique: true
    },
    confirmPassword:{
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum:['male', 'female','other'],
        required:true
    }
})

// now we need to ctreate a collection 
const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;