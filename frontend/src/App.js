import React from "react";
import { Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostView from "./components/PostView";
import "../src/styels/app.css";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostView />} />
      </Routes>
    </div>
  );
};

export default App;
