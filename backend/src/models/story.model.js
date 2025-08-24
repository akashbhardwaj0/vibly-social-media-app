import mongoose from "mongoose";


const storySchema = mongoose.Schema({
    auther: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mediaType: { type: String, required: true, enum: ["image", "video"] },
    media: { type: String, required: true },
    viewers : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now, expires: 86400 }, // Automatically expire after 24 hours
}, { timestamps: true });

const Story = mongoose.model = ("Story", storySchema);
export default Story;