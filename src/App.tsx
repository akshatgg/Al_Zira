import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'


import Login from "./Pages/Auth/login.tsx";
import Signup from "./Pages/Auth/Signup.tsx";
import ForgotPassword from "./Pages/Auth/ForgotPassword.tsx";
import { Navbar } from "./Pages/Navbar/Navbar.tsx";
import { Prompt } from "./Pages/Prompt/Prompt.tsx";
import EmailVerification from "./Pages/Auth/EmailVerification.tsx";
import Loader from "./Components/Loader/Loader.tsx";
import Welcome from "./Pages/Welcome/Welcome.tsx";
// import { Loader } from './Components/Loader/Loader.tsx';


function App() {
  return (
  
      <div>
        <Router>
          <Routes>
            <Route path="/home" element={<Navbar />} />
            <Route path="/loader" element={<Loader />} />
          </Routes>
          {/* <Navbar /> */}

          <Routes>
            <Route path="/home" element={<Prompt />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Forgot_Password" element={<ForgotPassword />} />
            <Route path="/verification" element={<EmailVerification />} />
          </Routes>
        </Router>
      </div>
 
  );
}

export default App;
