import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function HomePage({ setPostId, setPostList, postList }) {
    const navigate = useNavigate();

    useEffect(() => {
        getPostData();
    },[])

    const getPostData = async () => {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await res.json();
            setPostList(data);
        } catch (error) {
            console.log("error getting post", error);
        }
    }

    const handlePostClick = (e, id) => {
        navigate("/posts");
        setPostId(id);
    }

  return (
    <div >
        
        <input />

        {postList.length && postList.map((post, ind) => {
            return<div 
            key={post.id}
            style={{
                width: "70%",
                border: "1px solid black",
                margin: "1%"
            }}
            
            onClick={(e) => handlePostClick(e, post.id)}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                </div>
        })}
    </div>
  )
}

export default HomePage