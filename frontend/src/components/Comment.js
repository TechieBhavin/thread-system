import React from "react";

const Comment = ({ comment, onReply, level = 0 }) => {
  return (
    <div
      style={{
        marginLeft: level * 20,
        borderLeft: level > 0 ? "2px solid #ddd" : "none",
        paddingLeft: 10,
        marginTop: 10
      }}
    >
      <p>{comment.content}</p>

      <button onClick={() => onReply(comment)} style={{ fontSize: "12px" }}>
        Reply
      </button>

      {comment.replies &&
        comment.replies.map((reply) => (
          <Comment
            key={reply._id}
            comment={reply}
            onReply={onReply}
            level={level + 1}
          />
        ))}
    </div>
  );
};

export default Comment;
