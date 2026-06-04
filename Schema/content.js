import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
    username: {type: String, required: true, trim: true, unique: true},
    date: {
        year: {type: Number, required: true},
        month: {type: Number, required: true},
        day: {type: Number, required: true},
        hour: {type: Number},
        minutes: {type: Number}, 
    }
})