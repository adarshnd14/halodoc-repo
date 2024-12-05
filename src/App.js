import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import PostPage from './components/PostPage';
import { useState } from 'react';

function App() {
  const [postId, setPostId] = useState(0);
  const [postList, setPostList] = useState([]);

  console.log(postId);
  
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage 
          setPostId={setPostId}
          postList={postList}
          setPostList={setPostList}
          />} />
          <Route path="/posts" element={<PostPage 
          postId={postId}
          />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
