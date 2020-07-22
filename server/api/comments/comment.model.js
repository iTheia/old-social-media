import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    content: {
      type: String,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
