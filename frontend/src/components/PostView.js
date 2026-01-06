import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import "../styels/app.css";

const PostView = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { id: POST_ID } = useParams();

  const fetchComments = () => {
    fetch(`http://localhost:5005/api/comments/${POST_ID}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  const addTopLevelComment = async () => {
    if (!newComment.trim()) return;

    await fetch("http://localhost:5005/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postId: POST_ID,
        content: newComment
      })
    });

    setNewComment("");
    fetchComments();
  };

  useEffect(() => {
    fetch(`http://localhost:5005/api/posts/${POST_ID}`)
      .then((res) => res.json())
      .then((data) => setPost(data));

    fetchComments();
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
  <div className="post-container">
    <h1 className="post-title">{post.title}</h1>
    <p className="post-content">{post.content}</p>

    <hr />

    <h3 className="comments-title">Comments</h3>

    <div className="comments-section">
        <textarea
      rows={3}
      placeholder="Add a comment..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <button onClick={addTopLevelComment}>Add Comment</button>

    {comments.map((comment) => (
      <Comment
        key={comment._id}
        comment={comment}
        postId={POST_ID}
        refreshComments={fetchComments}
      />
    ))}
    </div>

    
  </div>
);

};

export default PostView;


