import React, { useState } from "react";

const Comment = ({ comment, postId, level = 0, refreshComments }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    await fetch("http://localhost:5005/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        content: replyText,
        parentComment: comment._id,
      }),
    });

    setReplyText("");
    setIsReplying(false);
    refreshComments();
  };

  return (
    <div className="comment-card">
      <p>{comment.content}</p>

      <button className="secondary" onClick={() => setIsReplying(true)}>
        Reply
      </button>

      {isReplying && (
        <div className="reply-box">
          <p className="replying-label">
            Replying to <strong>{comment.content.slice(0, 40)}...</strong>
          </p>

          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />

            <div style={{ marginTop: "10px" }}>
        <button
          className="btn-primary"
          onClick={handleReplySubmit}
        >
          Submit
        </button>

        <button
          className="btn-secondary"
          onClick={() => setIsReplying(false)}
        >
          Cancel
        </button>
      </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
