// import "./App.css";
// import Navbar from "./components/Navbar";

// import Footer from "./components/Footer";

// import Homep from "../pages/Homep";

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signinform from "../pages/Signinform";
// import Loginform from "../pages/Loginform"
// import Tutorsp from "../pages/Tutorsp"
// import Dashboardp from "../pages/Dashboardp"
// import Tutorsdashboardp from "../pages/Tutors-dashboardp"
// import TeacherRegistrationForm from "../pages/Tutorregisterationform"

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route index element={<Homep />} />

//           <Route path="/register" element={<Signinform />} />
//           <Route path="/login" element={<Loginform />} />
//           <Route path="/tutors" element={<Tutorsp />} />
//           <Route path="/dashboard" element={<Dashboardp />} />
//           <Route path="/tutorsdashboard" element={<Tutorsdashboardp />} />
//           <Route path="/become-a-tutor" element={<Signinform />} />
//           <Route path="/tutorform" element={<TeacherRegistrationForm />} />
//         </Routes>
//         <Footer />

//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

import { BrowserRouter } from "react-router-dom"
import Layout from "../src/layout/Layout"

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App

