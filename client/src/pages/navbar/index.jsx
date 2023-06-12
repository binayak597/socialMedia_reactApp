import { React, useState } from 'react';
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    FormControl,
    MenuItem,
    useTheme,
    useMediaQuery
} from '@mui/material';

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Help,
    Menu,
    Notifications,
    Close
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMode, setLogout } from 'state';
import SpaceBetween from 'components/SpaceBetween';

const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)"); //this is a built in hook provided by material-ui
    //which allow us to determine the current screen size of the browser that requesting the website URL.

    const theme = useTheme();

    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;
    return (
        <SpaceBetween padding="1rem 6%" backgroundColor={alt}>
            <SpaceBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer"
                        }
                    }}
                    onClick={() => navigate("/home")}
                >
                    SocioPedia
                </Typography>
                {isNonMobileScreen && (
                    <SpaceBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </SpaceBetween>
                )}
            </SpaceBetween>
            {/* DESKTOP NAV */}
            {isNonMobileScreen ? (
                <SpaceBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />)
                            :
                            (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )
                        }
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Logout
                            </MenuItem>
                        </Select>
                    </FormControl>
                </SpaceBetween>)
                :
                (<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)
                }>
                    <Menu />
                </IconButton>)
            }
            {/* MOBILE NAVBAR */}

            {!isNonMobileScreen && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <SpaceBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem">
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ fontSize: "25px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />)
                                :
                                (
                                    <LightMode sx={{ color: dark, fontSize: "25px" }} />
                                )
                            }
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant="standard" value={fullName}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem"
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Logout
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </SpaceBetween>
                </Box>
            )}
        </SpaceBetween>
    )
}

export default Navbar

