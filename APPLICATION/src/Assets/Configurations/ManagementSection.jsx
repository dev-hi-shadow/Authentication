import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
 import OtpVarification from "../Pages/OtpVarification.jsx";
import Registration from "../Pages/Registration.jsx";

export const PageRoutes = [
  { path: "/profile", element: <Dashboard /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/otp-varification",
    element: <OtpVarification />,
  },
];
