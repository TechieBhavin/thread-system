import React, { useState } from "react";

const CommentForm = ({ postId, parentComment, onSuccess }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5005/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postId,
        content,
        parentComment: parentComment?._id
      })
    });

    setContent("");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      {parentComment && (
        <p style={{ fontSize: "12px", color: "gray" }}>
          Replying to: {parentComment.content}
        </p>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        required
        style={{ width: "100%" }}
      />

      <button type="submit">Add comment</button>
    </form>
  );
};

export default CommentForm;
