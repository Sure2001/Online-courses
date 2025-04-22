import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Main Page//
import NavigationBar from "./assets/Nav";
import LandingPage from "./assets/Home";
import Search from "./assets/Search";
import Courses from "./assets/Courses";
import List from "./assets/List";
import Footer from "./assets/Footer";
//NavBar//
import SignUpPage from "./navbutton/SignUpPage";
import SignInPage from "./navbutton/SignInPage";
import ForgotPasswordPage from "./navbutton/ForgotPasswordPage";
import ContactPage from "./navbutton/ContactPage";
//Course
import Frontend from "./coursepage/Fullstack";
import Mobileapp from "./coursepage/MobileApp";
import Saftware from "./coursepage/SoftwareTestingCourse";
import Datascience from "./coursepage/DataScienceCourse";
import Uiux from "./coursepage/UiuxCourse";
import Digital from "./coursepage/DigitalMarketingCourse";


//Teacher Page
import FullStackTeachers from "./teacherpage/FullStackTeachers";
import UiuxTeacherProfiles from "./teacherpage/UiuxTeacherProfiles";
//Cart
import CartSummary from "./cartpages/CartSummary";
import ViewPage from "./cartpages/ViewPage";



function App() {
  return (
   
    <Router>
      <NavigationBar />
      <Routes>
        <Route
        path="/"  
          element={
            <>
              <LandingPage />
              {/* <Slider /> */}
              <Search />
              <Courses />
              <List />
              <Footer />
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
      </Routes>
    </Router>
  );
}

export default App;
