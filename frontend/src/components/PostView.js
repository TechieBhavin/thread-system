import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const PostView = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  const POST_ID = "695d1d50c43e73bf6f95fd0c";

  const fetchComments = () => {
    fetch(`http://localhost:5005/api/comments/${POST_ID}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  useEffect(() => {
    fetch(`http://localhost:5005/api/posts/${POST_ID}`)
      .then((res) => res.json())
      .then((data) => setPost(data));

    fetchComments();
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <hr />

      <h3>Comments</h3>

      <CommentForm
        postId={POST_ID}
        parentComment={replyTo}
        onSuccess={() => {
          setReplyTo(null);
          fetchComments();
        }}
      />

      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onReply={setReplyTo}
        />
      ))}
    </div>
  );
};

export default PostView;
