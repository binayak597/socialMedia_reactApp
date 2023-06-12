import { Box, useMediaQuery } from '@mui/material'
import UserWidget from 'pages/Widgets/UserWidget';
import Navbar from 'pages/navbar'
import React from 'react'
import { useSelector } from 'react-redux';
import MyPostWidget from 'pages/Widgets/MyPostWidget';
import PostsWidget from 'pages/Widgets/PostsWidget';
import AdvertWidget from 'pages/Widgets/AdvertWidget';
import FriendListWidget from 'pages/Widgets/FriendListWidget';

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector(state => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreen ? "42%" : undefined}>
          <MyPostWidget userId={_id} picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen ? (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        ): undefined}
      </Box>
    </Box>
  ) 
}

export default HomePage
