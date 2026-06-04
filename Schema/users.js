import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, trim: true, required: true},
    password: {type: String, required: true, trim: true}
})

export default mongoose.model("user", userSchema);