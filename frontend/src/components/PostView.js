import React, { useEffect, useState } from "react";

const PostView = () => {
  const [post, setPost] = useState(null);

  // 🔴 Replace with your actual post ID
  const POST_ID = "695d1d50c43e73bf6f95fd0c";

  useEffect(() => {
    fetch(`http://localhost:5005/api/posts/${POST_ID}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error(err));
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <hr />
    </div>
  );
};

export default PostView;
