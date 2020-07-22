import { postModel } from "../posts";
import Comment from "./comment.model";
import mongoose from "mongoose";

const controller = {
  async getAll(req, res) {
    const post_id = mongoose.Types.ObjectId(req.params.post_id);
    const comments = await postModel
      .findById(post_id)
      .select("comments")
      .populate({
        path: "comments",
        select: "content",
        populate: {
          path: "author",
          select: "userName",
        },
      });
    res.send(comments);
  },
  async delete(req, res) {
    const user_id = mongoose.Types.ObjectId(req._id);
    const post_id = mongoose.Types.ObjectId(req.params.post_id);
    const comment_id = mongoose.Types.ObjectId(req.params.comment_id);
    const comment = await Comment.findOneAndDelete(
      { _id: comment_id, author: user_id },
      { rawResult: true }
    );
    await postModel.findByIdAndUpdate(post_id, {
      $pull: { comments: comment_id },
    });
    res.send(comment);
  },
  async create(req, res) {
    const user_id = mongoose.Types.ObjectId(req._id);
    const post_id = mongoose.Types.ObjectId(req.params.post_id);
    const comment = new Comment({
      content: req.body.content,
      author: user_id,
      post: post_id,
    });
    await comment.save();
    await postModel.findByIdAndUpdate(post_id, {
      $push: { comments: comment._id },
    });
    res.send(comment);
  },
  async update(req, res) {
    const user_id = mongoose.Types.ObjectId(req._id);
    const post_id = mongoose.Types.ObjectId(req.params.post_id);
    const comment_id = mongoose.Types.ObjectId(req.params.comment_id);
    const comment = await Comment.findOneAndUpdate(
      { _id: comment_id, post: post_id, author: user_id },
      { content: req.body.content },
      { new: true }
    );
    res.send(comment);
  },
};

export default controller;
