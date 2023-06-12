import React, { useState } from 'react'
import { ChatBubbleOutlineOutlined,
         FavoriteBorderOutlined,
         FavoriteOutlined, 
         ShareOutlined } from '@mui/icons-material';
import { Box, Typography, IconButton, useTheme, Divider } from '@mui/material';
import Friend from 'components/Friend';
import { useDispatch, useSelector } from "react-redux";
import { setPost } from 'state';
import WidgetWrapper from 'components/WidgetWrapper';
import SpaceBetween from 'components/SpaceBetween';
const PostWidget = ({
    postId,
    postUserId,
    name,
    location,
    description,
    picturePath,
    userPicturePath,
    likes,
    comments
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const loggedInUserId = useSelector(state => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const { palette } = useTheme();
    
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const result = await fetch(`http://localhost:8000/posts/${postId}/like`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({userId: loggedInUserId })

        });
        const updatedPost = await result.json();
        dispatch(setPost({ post: updatedPost }));
    }


  return (
    <WidgetWrapper m="2rem 0">
        <Friend 
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography
            color={main}
            sx={{ mt: "1rem" }}
        >
          {description}
        </Typography>
        {picturePath && (
          <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:8000/assets/${picturePath}`}
         />
        )}
         <SpaceBetween mt="0.25rem">
            <SpaceBetween gap="1rem">
              <SpaceBetween gap="0.25rem">
                <IconButton onClick={patchLike}>
                  {isLiked ? (
                    <FavoriteOutlined sx={{ color: primary }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
                <Typography>{likeCount}</Typography>
              </SpaceBetween>
              <SpaceBetween gap="0.25rem">
                <IconButton onClick={() => setIsComments(!isComments)}>
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comments.length}</Typography>
              </SpaceBetween>
            </SpaceBetween>
            <SpaceBetween>
              <IconButton>
               <ShareOutlined />
              </IconButton>
            </SpaceBetween>
          </SpaceBetween>
          {isComments && (
              <Box mt="0.5rem">
                 {comments.map((comment, index) => (
                   <Box key={`${name}-${index}`}>
                     <Divider />
                     <Typography sx={{ color: main, m:"0.5rem 0", pl:"1rem" }}>
                      {comment}
                     </Typography>
                   </Box>
                 ))}
                 <Divider />
              </Box>
            )}   
    </WidgetWrapper>
  )
}

export default PostWidget
