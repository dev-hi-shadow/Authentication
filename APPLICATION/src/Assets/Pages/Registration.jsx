import {
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { registerInitialStates } from "../Configurations/InitialStates";
import { registerYupSchema } from "../Configurations/YupSchema";
import {
  useSignupMutation,
  useSignupAsAdminMutation,
} from "../../Services/API/Auth";
import { useAlert } from "../hooks/Toastify";

const Registration = () => {
  const [register] = useSignupMutation();
  const [registerAsAdmin] = useSignupAsAdminMutation();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      let data = null;

      if (values.raa) {
        data = await registerAsAdmin(values).unwrap();
      } else {
        data = await register(values).unwrap(); 
      }
      if (data?.data?.token) {
        window.localStorage.setItem("accessToken", data.data.token);
      }
      if (!data?.data?.user?.email_verified_at) {
        navigate("/otp-varification");
      }
      showAlert("Registration Successful");
    } catch (err) {
      showAlert(
        `Registration Failed: ${
          err.data ? err.data.error : "An error occurred"
        }`
      );
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: registerInitialStates,
      validationSchema: registerYupSchema,
      onSubmit: handleRegister,
    });

  return (
    <Box
      display="flex"
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100vh"}
      flexDirection={"column"}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          minWidth: "300px",
          width: "100%",
          maxWidth: "850px",
          minHeight: "550px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box padding={3}>
              <Typography
                variant="h4"
                fontFamily={"cursive"}
                align="center"
                component={"h4"}
                mb={3}
              >
                Registration
              </Typography>
              <Box>
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                  }}
                >
                  <TextField
                    required
                    helperText={errors.first_name}
                    error={Boolean(touched.first_name && errors.first_name)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="outlined-required"
                    value={values.first_name}
                    label="First Name"
                    fullWidth
                    name="first_name"
                    variant="outlined"
                    placeholder="Enter your first name"
                  />
                  <TextField
                    required
                    helperText={errors.last_name}
                    error={Boolean(touched.last_name && errors.last_name)}
                    onChange={handleChange}
                    value={values.last_name}
                    onBlur={handleBlur}
                    id="outlined-required"
                    label="Last Name"
                    fullWidth
                    name="last_name"
                    variant="outlined"
                    placeholder="Enter your last name"
                  />
                  <TextField
                    required
                    helperText={errors.email}
                    error={Boolean(touched.email && errors.email)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="outlined-required"
                    value={values.email}
                    label="Email"
                    type="email"
                    fullWidth
                    name="email"
                    variant="outlined"
                    placeholder="Enter your email address"
                  />
                  <TextField
                    required
                    name="password"
                    helperText={errors.password}
                    error={Boolean(touched.password && errors.password)}
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    id="outlined-required"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your password"
                  />
                  <TextField
                    required
                    name="confirmPassword"
                    helperText={errors.confirmPassword}
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    id="outlined-required"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    placeholder="Confirm your password"
                  />
                  <TextField
                    required
                    name="phone"
                    helperText={errors.phone}
                    error={Boolean(touched.phone && errors.phone)}
                    onChange={handleChange}
                    value={values.phone}
                    onBlur={handleBlur}
                    id="outlined-required"
                    label="Phone"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your phone number"
                  />

                  <Stack
                    direction={"row"}
                    gap={2}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Typography> Register as Admin</Typography>
                    <Checkbox
                      defaultChecked
                      onChange={handleChange}
                      value={values.raa}
                      name="raa"
                    />
                  </Stack>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                  >
                    Registration
                  </Button>
                </form>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={7}>
            <Box
              sx={{
                backgroundImage: "linear-gradient(to right, #ff7eb9, #ff65a3)",
                minHeight: "100%",
                padding: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography
                fontFamily={"serif"}
                variant="h4"
                color="white"
                component={"h4"}
              >
                Welcome To Authentication
              </Typography>
              <Typography fontSize={12} color="white">
                Already have an account?
              </Typography>

              <Typography color="white" sx={{ cursor: "pointer" }}>
                <Link to={"/login"}>Login</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Registration;
