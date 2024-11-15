import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: ["Fullname is required", true],
    },
   username: {
    type: String,
    required: true,
    unique:  ["Username is required", true],
 },
 email : {
    type: String,
    required: ["Email is required", true],
    unique: true,
 },
 password: {
    type: String,
    required:  ["Password is required", true],
    minlength: 6,
 },
 gender: {
    type: String,
    required: true,
    enum: ["male", "female", "Other"]
 },
 profilePicture: {
    type: String,
    default: ""
 },

}, {timestamps: true})

const User = mongoose.model('user', userSchema);

export default User;