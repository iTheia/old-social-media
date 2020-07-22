import React, { useState } from "react";
import axios from "axios";

const token = localStorage.getItem("token");
const baseURL = localStorage.getItem("URL");

export default function CommentForm(props) {
  const { post_id, addComment, from } = props;
  const [comment, setComment] = useState("");

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}posts/${post_id}/comments/`,
        {
          content: comment,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setComment("");
      addComment(response.data);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className={`commentForm${from === "post" ? "-from-post" : ""}`}>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? postComment(e) : null)}
        placeholder="Leave a comment"
        className="input"
        type="text"
      />
      <button onClick={postComment}>Publicar</button>
    </div>
  );
}
