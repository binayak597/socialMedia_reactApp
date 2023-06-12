import React, { useEffect } from 'react';
import { setPosts } from "state";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from './PostWidget';



const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const token = useSelector(state => state.token);

    const getAllPosts = async () => {
        const result = await fetch("http://localhost:8000/posts",{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await result.json();
        dispatch(setPosts({ posts: data }));
    }

    const getUserPosts = async () => {
        const result = await fetch(`http://localhost:8000/posts/${userId}/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });

        const data = await result.json();
        dispatch(setPosts({ posts: data }));
    }

    useEffect(() => {
        if (isProfile) {
           getUserPosts(); 
        } else {
            getAllPosts();
        }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
       {posts.map(({
        _id,
        userId,
        firstName,
        lastName,
        location,
        description,
        picturePath,
        userPicturePath,
        likes, 
        comments
       }) => (
        <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            location={location}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
        />
       ))} 
    </>
  )
}

export default PostsWidget

