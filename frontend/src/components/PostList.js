import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const fetchPosts = () => {
    fetch("http://localhost:5005/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  const createPost = async () => {
    if (!title.trim() || !content.trim()) return;

    await fetch("http://localhost:5005/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });

    setTitle("");
    setContent("");
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2>Create Post</h2>

      <input
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
      />

      <textarea
        rows={3}
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={createPost}>Create Post</button>

      <hr />

      <h2>Posts</h2>

      {posts.map((post) => (
        <div
          key={post._id}
          className="comment"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <h4>{post.title}</h4>
          <p style={{ color: "#57606a" }}>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
