import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function PostPage({ postId }) {
    const [postData, setPostData] = useState({});
    const [comments, setComments] = useState([]);
    const [commentId, setCommentId] = useState();
    const [userData, setUserData] = useState({});
    const [subComments, setSubComments] = useState(false);
    const [subCommentText, setSubCommentText] = useState("");
    const storeSubComments = [];

    useEffect(() => {
        getByPostId();
        getcomments();
    }, []);

    useEffect(() => {
        getuserDetails();
    }, [postData])
    const navigate = useNavigate();

    const getByPostId = async () => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const data = await res.json();
            setPostData(data);
        } catch (error) {
            console.log("Error getting post data from ID", error);
        }
    }

    const getcomments = async () => {
        
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const data = await res.json();
            setComments(data);
        } catch (error) {
            console.log("Error getting comments data from ID", error);
        }
    }

    const getuserDetails = async () => {
        try {
            const userId = postData.userId;
            const res = await fetch(` https://jsonplaceholder.typicode.com/users/${userId}`);
            const data = await res.json();
            setUserData(data);
        } catch (error) {
            console.log("Error getting user data from ID", error);
        }
    }

    const handleReply = (e, id) => {
        setCommentId(id);
        setSubComments(!subComments);
    }

    const handleSubCommentText = (e) => {
        setSubCommentText(e.target.value);
    }

    const handleSubComment = (ind) => {
        console.log("storeSubComments", storeSubComments);
        storeSubComments.push({
            commentInd: ind,
            commentText: subCommentText
        });
    }

    return (
        <div>

            <button onClick={() => { navigate("/") }}>Back</button>
            {postData && <div>
                <h2>{postData.title}</h2>
                <p>{postData.body}</p>
            </div>}
            {
                userData && <div style={{
                    textAlign: "right"
                }}>
                    <p>User Name : {userData.name}</p>
                    <p>Email : {userData.email}</p>
                    <p>Phone : {userData.phone}</p>
                </div>
            }
            {comments && <div>
                <hr />
                {comments.map((comment, ind) => {
                    return <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: "space-evenly",
                            margin: "1%"
                        }}>
                            <p style={{
                                width: "70%"
                            }}>{comment.body}</p>
                            <button
                                onClick={(e) => handleReply(e, ind)}
                            >Reply</button>
                        </div>

                        {subComments && <div style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            marginLeft: "20%"
                        }}>
                            {storeSubComments[storeSubComments.indexOf((val) => val === ind)] && 
                            <p>{storeSubComments[storeSubComments.indexOf((val) => val === ind)].commentText}</p>}
                            <input 
                            type='text' 
                            placeholder='Add your comment' 
                            onKeyUp={(e) => handleSubCommentText(e)}/>
                            <p style={{
                                width: "60%"
                            }}>SubComment</p>
                            <button
                            onClick={() => handleSubComment(comment.id)}
                            >Reply</button>
                        </div>}
                    </div>

                })}
            </div>}
        </div>
    )
}

export default PostPage