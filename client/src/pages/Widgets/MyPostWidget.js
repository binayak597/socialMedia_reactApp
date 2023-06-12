import React, { useState } from 'react'
import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Box,
    Typography,
    InputBase,
    Divider,
    Button,
    IconButton,
    useTheme,
    useMediaQuery
} from "@mui/material";

import SpaceBetween from 'components/SpaceBetween';
import WidgetWrapper from 'components/WidgetWrapper';
import UserImage from 'components/UserImage';
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import Dropzone from "react-dropzone";


const MyPostWidget = ({ userId, picturePath }) => {
    const [isImage, setIsImage] = useState(false); //this one acts as a switch wheather the user click on the image button to upload a image or not
    const [image, setImage] = useState(null); //this one represents wheather the user upload an image or not
    const [post, setPost] = useState(""); //this one represents wheather the user post something form his account or not
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const { palette } = useTheme();
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        
        const result = await fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        const posts = await result.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    }
  return (
    <WidgetWrapper>
        <SpaceBetween gap="1.5rem">
            <UserImage image={picturePath} />
            <InputBase 
                placeholder="what's on your mind..."
                onChange={(ev) => setPost(ev.target.value)}
                value={post}
                sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "1rem 2rem"
                }}
            />

        </SpaceBetween>   
        {isImage && (
            <Box
                border={ `1px solid ${medium}` }
                borderRadius= "5px"
                mt="1rem"
                p="1rem"
            >
                <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setImage(acceptedFiles[0])
                    }
                >
                    {({ getRootProps, getInputProps }) => (
                      <SpaceBetween>
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        width="100%"
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!image ? (
                          <p>Add Image Here</p>
                        ) : (
                          <SpaceBetween>
                            <Typography>{image.name}</Typography>
                            <EditOutlined />
                          </SpaceBetween>
                        )}
                      </Box>
                      {image && (
                        <IconButton
                          onClick={() => setImage(null)}
                          sx={{ width: "15%" }}
                        >
                            <DeleteOutlined />
                        </IconButton>
                      )}
                      </SpaceBetween>
                    )}
                  </Dropzone>
            </Box>
        )}
        <Divider sx={{ margin: "1.25rem 0" }} />

        <SpaceBetween>
          <SpaceBetween 
            gap="0.25rem"
            onClick={() => setIsImage(!isImage)}
          >
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: medium
                }
              }}
            >
              image
            </Typography>
          </SpaceBetween>
          {isNonMobileScreen ? (
            <>
              <SpaceBetween gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>clip</Typography>
              </SpaceBetween>
              <SpaceBetween gap="0.25rem">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>attachement</Typography>
              </SpaceBetween>
              <SpaceBetween gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>audio</Typography>
              </SpaceBetween>
            </>
          ) : (
            <SpaceBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </SpaceBetween>
          )}
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem"
            }}
          > 
          POST
          </Button>
        </SpaceBetween>         
    </WidgetWrapper>
  )
}

export default MyPostWidget