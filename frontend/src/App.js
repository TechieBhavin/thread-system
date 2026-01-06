import React from "react";
import { Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostView from "./components/PostView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/post/:id" element={<PostView />} />
    </Routes>
  );
};

export default App;
  