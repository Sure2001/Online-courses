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
import Bill from "./cartpages/BillPage";
// Admin
import AdminLoginPage  from "./my-admin/AdminLogin";
// import Adminnav from "./my-admin/AdminNavbar";
// import Dashboard from "./my-admin/Dashboard";
import AdminLayout from "./my-admin/layout/AdminLayout"
import Dashboard from "./my-admin/pages/Dashboard";
import User from "./my-admin/pages/User";
import Order from "./my-admin/pages/Order";

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
  const noNavbarFooterRoutes = ['/adminlogin', '/admin', '/admin/dashboard', '/admin/user' ,'/admin/order'];
  const noFooterRoutes = ['/card', '/signin', '/signup', '/forgot-password'];
  
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
        <Route path="/view" element={<ViewPage />}/>
        <Route path="/bill" element={<Bill />}/>

        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="user" element={<User />} />
          <Route path="order" element={<Order />} />
        </Route>

      </Routes>
      {showNavbarFooter && showFooter && <Footer />}
    </>
  );
}

export default App;
