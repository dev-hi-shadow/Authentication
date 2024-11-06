/* eslint-disable react/prop-types */
import { Box, Button, Grid, Paper,   Typography } from "@mui/material";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { useOtp_varificationMutation, useProfileQuery } from "../../Services/API/Auth";
 
const OtpVarification = () => {
  const [otp, setOtp] = useState("");
  const Navigate = useNavigate();
  // const userState = useSelector((state) => state.authSlice.user.data);
  const { data } = useProfileQuery();
  console.log("🚀  data:", data)
 
  const [otpVarification, { isSuccess, isError }] =
    useOtp_varificationMutation();
  console.log("🚀  isSuccess , isError :", isSuccess, isError);
  const handleSubmitOtp = async () => {
    try {
      let otpData = await otpVarification({ otp });
      console.log("🚀  otpData:", otpData);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      Navigate("/profile");
    }
    if (isError) {
      Navigate("/login");
    }
  }, [Navigate, isError, isSuccess]);

  return (
    <>
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
                  Enter OTP{" "}
                </Typography>

                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => {
                      let { ...restProps } = props;
                      return (
                        <input
                          {...restProps}
                          style={{
                            height: "2rem",
                            width: "2rem",
                            backgroundColor: "transparent",
                            fontSize: "1.5rem",
                            color: "black",
                            margin: 3,
                            textAlign: "center",
                            cursor: "pointer",
                            border: "1px solid black",
                            outline: "none",
                            transition: "all 0.3s ease",
                          }}
                        />
                      );
                    }}
                  />
                  <Button
                    onClick={() => handleSubmitOtp()}
                    disabled={otp.length !== 6}
                    variant="contained"
                    sx={{ textTransform: "none", marginY: 3 }}
                  >
                    Verify
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={7}>
              <Box
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #ff7eb9, #ff65a3)",
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

      {/* <Box
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
          width: "100%", // Make sure the Paper takes the full width of the Box
          maxWidth: "900px", // Maximum width of the Paper
          minHeight: "450px",
          padding: 3, // Increase padding for better spacing inside
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >

      </Paper>
    </Box> */}
    </>
  );
};

export default OtpVarification;
