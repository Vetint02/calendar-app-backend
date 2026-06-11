import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
    {
        username: { type: String, required: true, trim: true },
        year: { type: Number, required: true },
        month: { type: Number, required: true },
        day: { type: Number, required: true },
        notice: { type: String, trim: true }
    },
    { timestamps: true }
)

export default mongoose.model("content", contentSchema);