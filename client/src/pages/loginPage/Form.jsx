import { useState } from "react";
import { 
    Box, 
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import SpaceBetween from "components/SpaceBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
};

const initialValuesLogin = {
    email: "",
    password: ""
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
    const { palette } = useTheme();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";


    const register = async (values, onSubmitProps) => {

        //allow us send form info with files
        const formData = new FormData();
        for(let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('picturePath', values.picture.name);

        const savedUserResponse = await fetch("http://localhost:8000/auth/register",
        {
            method: 'POST',
            body: formData
        }
        );

        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm(); //onSubmitProps provides by formik and it comes with various func
        
        if(savedUser) {
            setPageType("login");
        }

    }

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:8000/auth/login",
        {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(values)
        });

        const loggedInUser = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if(loggedInUser) {
            dispatch(setLogin({
                user: loggedInUser.user,
                token: loggedInUser.token
            }));
            navigate("/home");
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if(isRegister) await register(values, onSubmitProps);
        if(isLogin) await login(values, onSubmitProps);
    };

    return (

<Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
    {/* this is a little bit weird syntax of some values */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobileScreen ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur} //handleBlur func handle the situation whenver user click outside of the field
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur} //handleBlur func handle the situation whenver user click outside of the field
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur} //handleBlur func handle the situation whenver user click outside of the field
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}  //handleBlur func handle the situation whenver user click outside of the field
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                 {/* FOR UPLOAD PICTURE */}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <SpaceBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </SpaceBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}  //handleBlur func hancle the situation whenver user click outside of the field
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}  //handleBlur func hancle the situation whenver user click outside of the field
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/** BUTTON SECTION */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form> //formik grab the handleFormSubmit func
               // and using this value handleSubmit passing to the form native html element.
      )}
    </Formik>
    )
}

export default Form

 