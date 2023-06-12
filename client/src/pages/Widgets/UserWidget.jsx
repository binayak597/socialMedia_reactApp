import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import SpaceBetween from "components/SpaceBetween";
import WidgetWrapper from "components/WidgetWrapper";
import  { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import  { useState, useEffect } from "react";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { palette } = useTheme();
    const token = useSelector(state => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const result = await fetch(`http://localhost:8000/user/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await result.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    if(!user) return null;

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user;

    return (
        <WidgetWrapper>

            {/* FIRST ROW */}

            <SpaceBetween
               gap="0.5rem"
               pb="1.1rem"
               onClick={() => navigate(`/profile/${userId}`)}
            >
                <SpaceBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                </SpaceBetween>
                <ManageAccountsOutlined />
            </SpaceBetween>
            <Divider />

                {/* SECOND ROW */}
                <Box p="1rem 0">
                  <Box display="flex" alignitems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography display="flex" alignItems="center" color={medium}>
                        {location}
                    </Typography>
                  </Box>
                  <Box display="flex" alignitmes="center" gap="1rem" mb="0.5rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography display="flex" alignItems="center" color={medium}>
                        {occupation}
                    </Typography>
                  </Box>
                </Box>

                <Divider />
                  {/* THIRD ROW */}
                  <Box p="1rem 0">
                        <SpaceBetween>
                            <Typography color={medium}>
                                who's viewed your profile
                            </Typography>
                            <Typography color={main}>
                                {viewedProfile}
                            </Typography>
                        </SpaceBetween>
                        <SpaceBetween>
                            <Typography color={medium}>
                                Impressions of your post
                            </Typography>
                            <Typography color={main}>
                                {impressions}
                            </Typography>
                        </SpaceBetween>
                  </Box>

                  <Divider />
                  
                  {/* FOURTH ROW */}

                  <Box p="1rem 0">
                        <Typography
                          fontSize="1rem"
                          color={main}
                          fontWeight="500"
                          mb="1rem"
                          >
                            Social Profiles
                        </Typography>

                        <SpaceBetween gap="1rem" mb="0.5rem">
                            <SpaceBetween gap="1rem">
                                <img src="../assets/twitter.png" alt="twitter" />
                                <Box>
                                    <Typography color={main} fontWeight="500">
                                        Twitter
                                    </Typography>
                                    <Typography color={medium}>
                                        Social Network
                                    </Typography>
                                </Box>
                            </SpaceBetween>
                            <EditOutlined sx={{ color: main }} />
                        </SpaceBetween>
                        <SpaceBetween gap="1rem">
                            <SpaceBetween gap="1rem">
                                <img src="../assets/linkedin.png" alt="linkedIn" />
                                <Box>
                                    <Typography color={main} fontWeight="500">
                                        LinkedIn
                                    </Typography>
                                    <Typography color={medium}>
                                        Network Platform
                                    </Typography>
                                </Box>
                            </SpaceBetween>
                            <EditOutlined sx={{ color: main }} />
                        </SpaceBetween>
                  </Box>
        </WidgetWrapper>
    )
}

export default UserWidget