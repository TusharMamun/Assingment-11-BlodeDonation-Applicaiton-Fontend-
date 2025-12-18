import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/ClintLayout/MainLayout";
import DashboardLayout from "../components/layout/DashbordLayout/DashBoard";
import DashboardHome from "../components/layout/DashboardPages/DashboardHome";

import Home from "../Pages/Home";
import About from "../Pages/AboutPage/About";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import DonationRequestDetails from "../Pages/DashbordPages/DonationRequestDetails";
import UpdateDonationRequest from "../Pages/DonationRequest/UPdateRequest";

import Funding from "../Pages/Funding/Funding";
import PaymentSuccess from "../Pages/Funding/PaymentSuccess";
import SerchDonation from "../Pages/Funding/SerchDonation";

import Profile from "../Authcomponents/Profile/Profile";
import UpdateProfile from "../Authcomponents/Profile/UpdateProfile";
import Regestration from "../Authcomponents/RegesterPage/Regestration";


import AllUser from "../Pages/DashbordPages/AllUser";
import AllDonerRequestes from "../Pages/DashbordPages/AllDonerRequestes";
import MyDonationPage from "../Pages/DonationRequest/MyDonationPage";
import CreataDonationRequest from "../Pages/DashbordPages/CreataDonationRequest";
import AllFunding from "../Pages/DashbordPages/AllFundinData";
import MyFundingPage from "../Pages/Funding/MyFundingPage";

import NotFoundPage from "../Pages/NotFoundPage";

// ✅ Route Guards (create these files as discussed)
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import PrivateVolunteerRoute from "./PrivateVolunteerRoute";
import Login from "../Authcomponents/LogingPage/Loging";
import AnalysysDonationRequest from "../Pages/DashbordPages/AnalysysDonationRequest";
import PaymentCancel from "../Pages/Funding/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />, // ✅ 404 page (also handles loader errors)
    children: [
      { index: true, element: <Home /> },

      { path: "/about", element: <About /> },

      // public list page (pending requests)
      { path: "/donation-requests", element: <DonationRequest /> },

      // ✅ details must be private
      {
        path: "/donation-requests/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },

      // ✅ update must be private
      {
        path: "/updateDonation/:id",
        element: (
          <PrivateRoute>
            <UpdateDonationRequest />
          </PrivateRoute>
        ),
        loader: () => fetch("/LocationData.json"),
      },

      // ✅ funding page must be private (requirement)
      {
        path: "/funding",
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
      },

      // ✅ payment success should be private
      {
        path: "/dashboard/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-cancel",
        element: (
          <PrivateRoute>
          <PaymentCancel></PaymentCancel>
          </PrivateRoute>
        ),
      },

      { path: "/loging", Component:Login  },

      {
        path: "/regester",
        Component: Regestration,
        loader: () => fetch("/LocationData.json"),
      },

      {
        path: "/search-donors",
        Component: SerchDonation,
        loader: () => fetch("/LocationData.json"),
      },
    ],
  },

  // ✅ whole dashboard is private
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path:"/dashboard", 
        element: <DashboardHome /> },

      { path: "/dashboard/profile", element: <Profile /> },

      {
        path: "/dashboard/updateProfile",
        element: <UpdateProfile />,
        loader: () => fetch("/LocationData.json"),
      },

      // ✅ admin only
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },

      // ✅ admin OR volunteer (manage requests page)
      {
        path: "/dashboard/all-blood-donation-request",
        element: (
          <PrivateVolunteerRoute>
            <AllDonerRequestes />
          </PrivateVolunteerRoute>
        ),
      },
      {
        path: "/dashboard/Analysys-donation-status",
        element: (
          <PrivateVolunteerRoute>
       <AnalysysDonationRequest></AnalysysDonationRequest>
          </PrivateVolunteerRoute>
        ),
      },

      // ✅ donor/private (my requests)
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationPage />,
      },

      // ✅ admin only (dashboard all funding table)
      {
        path: "/dashboard/All-funding",
        element: (
          <AdminRoute>
            <AllFunding />
          </AdminRoute>
        ),
      },

      // ✅ private (my funding)
      {
        path: "/dashboard/mydonation",
        element: <MyFundingPage />,
      },

      // ✅ private (create donation request)
      {
        path: "/dashboard/creatDonerRequest",
        element: <CreataDonationRequest />,
        loader: () => fetch("/LocationData.json"),
      },
    ],
  },
]);
