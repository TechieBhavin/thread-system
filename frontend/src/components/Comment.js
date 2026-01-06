import React, { useState } from "react";

const Comment = ({ comment, postId, level = 0, refreshComments }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    await fetch("http://localhost:5005/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postId,
        content: replyText,
        parentComment: comment._id
      })
    });

    setReplyText("");
    setShowReplyBox(false);
    refreshComments();
  };

  return (
  <div className={`comment ${level > 0 ? "nested" : ""}`}>
    <p>{comment.content}</p>

    <button onClick={() => setShowReplyBox(!showReplyBox)}>Reply</button>

    {showReplyBox && (
      <div style={{ marginTop: "8px" }}>
        <textarea
          rows={3}
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button onClick={handleReplySubmit}>Submit</button>
      </div>
    )}

    {comment.replies &&
      comment.replies.map((reply) => (
        <Comment
          key={reply._id}
          comment={reply}
          postId={postId}
          level={level + 1}
          refreshComments={refreshComments}
        />
      ))}
  </div>
);

};

export default Comment;
