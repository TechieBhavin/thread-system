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
    <div className="comment" style={{ marginLeft: level * 20 }}>
      <div className="comment-content">
        <p>{comment.content}</p>

        <button className="secondary" onClick={() => setIsReplying(true)}>
          Reply
        </button>

        {isReplying && (
          <div className="reply-box">
            <p className="replying-label">
              Replying to: <strong>{comment.content}</strong>
            </p>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
            />

            <div className="reply-actions">
              <button onClick={handleReplySubmit}>Submit</button>
              <button onClick={() => setIsReplying(false)}>Cancel</button>
            </div>
          </div>
        )}

        {comment.replies?.map((reply) => (
          <Comment
            key={reply._id}
            comment={reply}
            postId={postId}
            level={level + 1}
            refreshComments={refreshComments}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
