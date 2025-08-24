import mongoose from "mongoose";

const vibesSchema = mongoose.Schema({
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        media: { type: String, required: true },
        caption: { type: String },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [ {type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

const Vibes = mongoose.model("Vibes", vibesSchema);
export default Vibes;