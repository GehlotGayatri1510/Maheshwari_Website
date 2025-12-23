import React from 'react';
import { Navigate } from "react-router-dom";

// DashBoard
import Dashboard from '../Pages/Dashboard/Index';

// Import Authentication pages
import Login from "../Pages/Authentication/Login";
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";
import UserProfile from "../Pages/Authentication/user-profile";
import OtpScreen from '../Pages/Authentication/OtpScreen'
import PageList_CityMaster from '../Pages/Masters/PageList_CItyMaster';
import AddEdit_CityMaster from '../Pages/Masters/AddEdit_CityMaster';
import AddEdit_UserMaster from '../Pages/Masters/AddEdit_UserMaster';
import PageList_UserMaster from '../Pages/Masters/PageList_UserMaster';
import AddEdit_StateMaster from '../Pages/Masters/AddEdit_StateMaster';
import PageList_StateMaster from '../Pages/Masters/PageList_StateMaster';
 import AddEdit_MatrimonialMaster from '../Pages/Masters/AddEdit_MatrimonialMaster';
 import PageList_MatrimonialMaster from '../Pages/Masters/PageList_MatrimonialMaster';
 import AddEdit_BookingMaster from '../Pages/Masters/AddEdit_BookingMaster';
 import PageList_BookingMaster from '../Pages/Masters/PageList_BookingMaster';
 import AddEdit_CasteMaster from '../Pages/Masters/AddEdit_CasteMaster';
 import PageList_CasteMaster from '../Pages/Masters/PageList_CasteMaster';
 import AddEdit_OccupationMaster from '../Pages/Masters/AddEdit_OccupationMaster';
 import PageList_OccupationMaster from '../Pages/Masters/PageList_OccupationMaster';
 
const authProtectedRoutes = [

  // dashboard
  { path: "/dashboard", component: <Dashboard /> },
 
  // Profile
  { path: "/userprofile", component: <UserProfile /> },
   
  { path: "/AddCity", component: <AddEdit_CityMaster/> },
  { path: "/EditCity", component: <AddEdit_CityMaster/> },
  { path: "/CityMaster", component: <PageList_CityMaster/> },
 
  { path: "/EditUser", component: <AddEdit_UserMaster/> },
  { path: "/AddUser", component: <AddEdit_UserMaster/> },
  { path: "/UserMaster", component: <PageList_UserMaster /> },

  { path: "/EditState", component: <AddEdit_StateMaster/> },
  { path: "/AddState", component: <AddEdit_StateMaster/> },
  { path: "/StateMaster", component: <PageList_StateMaster /> },


  { path: "/EditCaste", component: <AddEdit_CasteMaster/> },
  { path: "/AddCaste", component: <AddEdit_CasteMaster/> },
  { path: "/CasteMaster", component: <PageList_CasteMaster /> },

  { path: "/EditOccupation", component: <AddEdit_OccupationMaster/> },
  { path: "/AddOccupation", component: <AddEdit_OccupationMaster/> },
  { path: "/OccupationMaster", component: <PageList_OccupationMaster /> },

  { path: "/EditMatrimonial", component: <AddEdit_MatrimonialMaster/> },
  { path: "/AddMatrimonial", component: <AddEdit_MatrimonialMaster/> },
  { path: "/MatrimonialMaster", component: <PageList_MatrimonialMaster /> },

  { path: "/EditBooking", component: <AddEdit_BookingMaster/> },
  { path: "/AddBooking", component: <AddEdit_BookingMaster/> },
  { path: "/BookingMaster", component: <PageList_BookingMaster /> },
  
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },

];

const publicRoutes = [

  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/OTP", component: <OtpScreen/> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
