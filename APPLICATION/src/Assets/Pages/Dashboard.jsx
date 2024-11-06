import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useProfileQuery } from "../../Services/API/Auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data } = useProfileQuery();
  if (!localStorage.getItem("accessToken")) {
    navigate("/login");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      padding={2}
    >
      <Typography variant="h4" fontFamily="cursive" mb={3}>
        User Dashboard
      </Typography>

      {data?.data ? (
        <TableContainer component={Paper} sx={{ width: "80%", marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Field</strong>
                </TableCell>
                <TableCell>
                  <strong>Details</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>First Name</strong>
                </TableCell>
                <TableCell>{data?.data?.first_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell>{data?.data?.last_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>{data?.data?.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Phone</strong>
                </TableCell>
                <TableCell>{data?.data?.phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default Dashboard;
