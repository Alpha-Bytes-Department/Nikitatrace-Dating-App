import { createBrowserRouter } from "react-router";
// import Signup from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/SignIn";
import OtpVerification from "../Pages/Authentication/OtpVerification";
import Dashboard from "../Layouts/Dashboard";
import Setting from "../Pages/Dashboards/Setting/Setting";
import ResetPass from "../Pages/Authentication/ResetPass";
import Home from "../Pages/Dashboards/Home/Home";
import ProfileInformation from "../Pages/Dashboards/Setting/ProfileInfo";
import Users from "../Pages/Dashboards/Users/Users";
import PrivacyPolicy from "../Pages/Dashboards/Setting/PrivacyPolicy";
import ForgetPassword from "../Pages/Authentication/ForgetPassword";
import PrivateMode from "../Pages/Dashboards/PrivateMode/PrivateMode";
import Subscription from "../Pages/Dashboards/Subscription/Subscription";
import Company from "../Pages/Dashboards/Company/Company";
import Ships from "../Pages/Dashboards/Ships/Ships";
import Announcement from "../Pages/Dashboards/Announcement/Announcement";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user",
        element: <Users />,
      },
      {
        path: "/private",
        element: <PrivateMode />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/ship",
        element: <Ships />,
      },
      {
        path: "/announcement",
        element: <Announcement />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/setting/profile",
        element: <ProfileInformation />,
      },
      {
        path: "/setting/privacy",
        element: <PrivacyPolicy />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  // },
  {
    path: "/otp",
    element: <OtpVerification />,
  },
  {
    path: "/forgot_password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset_password",
    element: <ResetPass />,
  },
]);

export default router;
