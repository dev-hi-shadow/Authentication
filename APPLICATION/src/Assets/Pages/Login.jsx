import {
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginInitialStates } from "../Configurations/InitialStates";
import { loginYupSchema } from "../Configurations/YupSchema";
import {
  useLoginMutation,
  useLoginAsAdminMutation,
} from "../../Services/API/Auth";
import { useAlert } from "../hooks/Toastify";

const Login = () => {
  const [login] = useLoginMutation();
  const [loginAsAdmin] = useLoginAsAdminMutation();
  const { showAlert } = useAlert();
  const Navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      let data = null;
      if (values.las) {
        data = await loginAsAdmin(values).unwrap();
      } else {
        data = await login(values).unwrap();
      }
      console.log("🚀  data:", data);
      window.localStorage.setItem("accessToken", data.data.token);
      showAlert("Signin Successful");
      if (!data.data.user.email_verified_at) {
        Navigate("/otp-varification");
      } else {
        Navigate("/profile");
      }
    } catch (err) {
      showAlert(
        `Signin Failed: ${err.data ? err.data.error : "An error occurred"}`
      );
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: loginInitialStates,
      validationSchema: loginYupSchema,
      onSubmit: handleLogin,
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
          minHeight: "450px",
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
                Login
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

                  <Stack
                    direction={"row"}
                    gap={2}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Typography> Login as Admin</Typography>
                    <Checkbox
                      defaultChecked
                      onChange={handleChange}
                      value={values.loa}
                      name="loa"
                    />
                  </Stack>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                  >
                    Login
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
                don&apos;t have account ?
              </Typography>

              <Typography color="white" sx={{ cursor: "pointer" }}>
                <Link to={"/registration"}>Sign Up</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
