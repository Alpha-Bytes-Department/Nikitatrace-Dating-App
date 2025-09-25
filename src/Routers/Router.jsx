import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loading from "../components/Common/Loading";

// Lazy-loaded components for better performance
const SignIn = lazy(() => import("../Pages/Authentication/SignIn"));
const OtpVerification = lazy(() => import("../Pages/Authentication/OtpVerification"));
const Dashboard = lazy(() => import("../Layouts/Dashboard"));
const Setting = lazy(() => import("../Pages/Dashboards/Setting/Setting"));
const ResetPass = lazy(() => import("../Pages/Authentication/ResetPass"));
const Home = lazy(() => import("../Pages/Dashboards/Home/Home"));
const ProfileInformation = lazy(() => import("../Pages/Dashboards/Setting/ProfileInfo"));
const Users = lazy(() => import("../Pages/Dashboards/Users/Users"));
const PrivacyPolicy = lazy(() => import("../Pages/Dashboards/Setting/PrivacyPolicy"));
const ForgetPassword = lazy(() => import("../Pages/Authentication/ForgetPassword"));
const PrivateMode = lazy(() => import("../Pages/Dashboards/PrivateMode/PrivateMode"));
const Subscription = lazy(() => import("../Pages/Dashboards/Subscription/Subscription"));
const AdsManagement = lazy(() => import("../Pages/Dashboards/AdsManagement/AdsManagement"));
const TermsCondition = lazy(() => import("../Pages/Dashboards/Setting/TermsCondition"));
const CommunityGuideline = lazy(() => import("../Pages/Dashboards/Setting/CommunityGuideline"));

// Fallback 404 component
const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    <p className="mt-4">The page you are looking for does not exist.</p>
    <button
      onClick={() => window.history.back()}
      className="mt-6 px-4 py-2 bg-[#CE8B38] text-white rounded "
    >
      Go Back
    </button>
  </div>
);

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
        children: [
          { path: "/", element: <Home /> },
          { path: "/user", element: <Users /> },
          { path: "/private", element: <PrivateMode /> },
          { path: "/subscription", element: <Subscription /> },
          {
  path: "/ads",
  element: (
    <Suspense fallback={<Loading />}>
      <AdsManagement />
    </Suspense>
  ),
},
          { path: "/setting", element: <Setting /> },
          { path: "/setting/profile", element: <ProfileInformation /> },
          { path: "/setting/condition", element: <TermsCondition /> },
          { path: "/setting/privacy", element: <PrivacyPolicy /> },
          { path: "/setting/community", element: <CommunityGuideline /> },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: (
      <Suspense fallback={<Loading />}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: "/otp",
    element: (
      <Suspense fallback={<Loading />}>
        <OtpVerification />
      </Suspense>
    ),
  },
  {
    path: "/forgot_password",
    element: (
      <Suspense fallback={<Loading />}>
        <ForgetPassword />
      </Suspense>
    ),
  },
  {
    path: "/reset_password",
    element: (
      <Suspense fallback={<Loading />}>
        <ResetPass />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;