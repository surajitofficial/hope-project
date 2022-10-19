import Layout from "layouts/DashboardLayout.jsx";
import {
  Login,
  Otp,
  Verify,
  Error400,
  ForgotPassword,
  ForgotOtp,
  ForgotVerify,
  Error500
} from "./../views/pages/index";

const indexRoutes = [
  { path: "/login", component: Login },
  { path: "/otp", component: Otp },
  { path: "/verify", component: Verify },
  { path: "/error400", component: Error400 },
  { path: "/error500", component: Error500 },
  { path: "/forgotPassword", component: ForgotPassword },
  { path: "/forgototp", component: ForgotOtp },
  { path: "/forgotverify", component: ForgotVerify },
  { path: "/", component: Layout }
];

export default indexRoutes;
