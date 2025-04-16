import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./assets/Nav";
import LandingPage from "./assets/Home";
import Search from "./assets/Search";
import Courses from "./assets/Courses";
import List from "./assets/List";
import Footer from "./assets/Footer";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FrontendCourse from "./pages/FrontendCourse";
import BackendCourse from "./pages/BackendCourse";
import UiuxCourse from "./pages/UiuxCourse";
import FullStackTeachers from "./pages/FullStackTeachers";
import UiuxTeacherProfiles from "./pages/UiuxTeacherProfiles";
import ContactPage from "./pages/ContactPage";



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
        <Route path="/frontend" element={<FrontendCourse />} />
        <Route path="/backend" element={<BackendCourse />} />
        <Route path="/uiux" element={<UiuxCourse />} />
        <Route path="/fullstack" element={<FullStackTeachers />} />
        <Route path="/uiuxteacher" element={<UiuxTeacherProfiles/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
