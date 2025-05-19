import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// Main Page
import NavigationBar from "./assets/Nav";
import LandingPage from "./assets/Home";
import Search from "./assets/Search";
import Courses from "./assets/Courses";
import List from "./assets/List";
import Footer from "./assets/Footer";
// NavBar
import SignUpPage from "./navbutton/SignUpPage";
import SignInPage from "./navbutton/SignInPage";
import ForgotPasswordPage from "./navbutton/ForgotPasswordPage";
import ContactPage from "./navbutton/ContactPage";
import CourseDetails from "./assets/CourseDetails";
// Course
import Frontend from "./coursepage/Fullstack";
import Mobileapp from "./coursepage/MobileApp";
import Saftware from "./coursepage/SoftwareTestingCourse";
import Datascience from "./coursepage/DataScienceCourse";
import Uiux from "./coursepage/UiuxCourse";
import Digital from "./coursepage/DigitalMarketingCourse";
// Teacher Page
import FullStackTeachers from "./teacherpage/FullStackTeachers";
import UiuxTeacherProfiles from "./teacherpage/UiuxTeacherProfiles";
// Cart
import CartSummary from "./cartpages/CartSummary";
import ViewPage from "./cartpages/ViewPage";

import LoginRegisterPage from "./cartpages/LoginRegisterPage";
import RegisterPage from "./cartpages/RegisterPage";
import OrderSummary from "./cartpages/OrderSummry";
import ConfirmPage from "./cartpages/ConfirmPage";


// Admin
import AdminLoginPage  from "./my-admin/AdminLogin";
import AdminLayout from "./my-admin/layout/AdminLayout";
import Dashboard from "./my-admin/pages/Dashboard";
import User from "./my-admin/pages/User";
import Order from "./my-admin/pages/Order";
import Profile from "./my-admin/components/ProfilePage";
import Category from "./my-admin/pages/Category";
import Admincourse from "./my-admin/pages/AdminCourses";
import AdminBanner from "./my-admin/pages/AdminBanner";


function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();

  // List of routes where Navbar and Footer should not be shown
  const noNavbarFooterRoutes = ['/adminlogin', '/admin', '/admin/dashboard', '/admin/user' ,'/admin/order' ,'/admin/adminprofile',
     '/admin/categories','/admin/admincourse','/admin/banner'];
  const noFooterRoutes = ['/card', '/signin', '/signup', '/forgot-password','/confirm'];
  
  const showNavbarFooter = !noNavbarFooterRoutes.includes(location.pathname);
  const showFooter = !noFooterRoutes.includes(location.pathname);
  

  return (
    <>
      {showNavbarFooter && <NavigationBar />}
      <Routes>
        <Route path="/" element={  <>
              <LandingPage />
              {/* <Slider /> */}
              <Search />
              <Courses />
              <List />
              
            </> 
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/course/:id" element={<CourseDetails />} />


        <Route path="/frontend" element={<Frontend />} />
        <Route path="/mobileapp" element={<Mobileapp />}/>

        <Route path="/softwaretesting" element={<Saftware />}/>
        <Route path="/datascience" element={<Datascience />} />
        <Route path="/uiux" element={<Uiux />} />
        <Route path="/digitalmarketing" element={<Digital />} />
        <Route path="/fullstack" element={<FullStackTeachers />} />
        <Route path="/uiuxteacher" element={<UiuxTeacherProfiles/>}/>

        <Route path="/contact" element={<ContactPage/>}/>

        <Route path="/card" element={<CartSummary />} />
        <Route path="/view-cart" element={<ViewPage />} />
    
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/confirm" element={<ConfirmPage />} />

        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="user" element={<User />} />
          <Route path="order" element={<Order />} />
          <Route path="categories" element={<Category />} />
          <Route path="admincourse" element={<Admincourse />} />
          <Route path="banner" element={<AdminBanner />} />
          <Route path="/adminprofile" element={<Profile />} />
        </Route>

      </Routes>
      {showNavbarFooter && showFooter && <Footer />}
    </>
  );
}

export default App;
