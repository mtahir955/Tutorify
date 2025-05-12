import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar";
import DashboardNavbar from "../components/Dashboard-navbar"
import Footer from "../components/Footer";

import Homep from "../../pages/Homep";


import Signinform from "../../pages/Signinform";
import Loginform from "../../pages/Loginform"
import Tutorsp from "../../pages/Tutorsp"
import Dashboardp from "../../pages/Dashboardp"
import Tutorsdashboardp from "../../pages/Tutors-dashboardp"
import TeacherRegistrationForm from "../../pages/Tutorregisterationform"
import TeacherProfile from "../../pages/Teacherprofilep"
import Editteacherprofile from "../../pages/Editprofilep";
import TutorSearch from "../../pages/sdashboardtutorsp"
import Logout from "../../pages/Logout";

export default function Layout() {
    const location = useLocation()
    const dashboardRoutes = ["/dashboard", "/tutorsdashboard", "/tutorprofile", "/editprofile", "/tutorsp"]
  
    const isDashboard = dashboardRoutes.includes(location.pathname)
  
    return (
      <>
        {isDashboard ? <DashboardNavbar /> : <Navbar />}
        
        <Routes>
          <Route index element={<Homep />} />
          <Route path="/register" element={<Signinform />} />
          <Route path="/login" element={<Loginform />} />
          <Route path="/tutors" element={<Tutorsp />} />
          <Route path="/dashboard" element={<Dashboardp />} />
          <Route path="/tutorsdashboard" element={<Tutorsdashboardp />} />
          <Route path="/become-a-tutor" element={<Signinform />} />
          <Route path="/tutorform" element={<TeacherRegistrationForm />} />
          <Route path="/tutorprofile" element={<TeacherProfile />} />
          <Route path="/editprofile" element={<Editteacherprofile />} />
          <Route path="/tutorsp" element={<TutorSearch />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
  
        <Footer />
      </>
    )
  }
  