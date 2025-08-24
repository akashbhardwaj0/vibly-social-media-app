import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mediaType: { type: String, required: true, enum: ["image", "video"] },
    media: { type: String, required: true },
    caption: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [ {type: mongoose.Schema.Types.ObjectId, ref: "User" }]

}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;