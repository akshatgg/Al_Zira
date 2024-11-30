import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css';

import Login from "./Pages/Auth/login.tsx";
import Signup from "./Pages/Auth/Signup.tsx";
import ForgotPassword from "./Pages/Auth/ForgotPassword.tsx";
import { Navbar } from "./Pages/Navbar/Navbar.tsx";
import { Prompt } from "./Pages/Prompt/Prompt.tsx";
import EmailVerification from "./Pages/Auth/EmailVerification.tsx";

import Loader from "./Components/Loader/Loader.tsx";
import Welcome from "./Pages/Welcome/Welcome.tsx";
import Visualizer from "./Components/Visualizer/Visualizer.tsx";
import { AudioPrompt } from "./Pages/AudioPrompt/AudioPrompt.tsx";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current route is Prompt or Welcome
  const isSpecialRoute = ["/home", "/"].includes(location.pathname);

  return (
    <div className={isSpecialRoute ? "scro" : ""}>
      <Routes>
        <Route path="/home" element={<Navbar />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
      
      <Routes>
        <Route path="/home" element={<Prompt />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Audio" element={<AudioPrompt />} />
        <Route path="/Forgot_Password" element={<ForgotPassword />} />
        <Route path="/verification" element={<EmailVerification />} />
      </Routes>
    </div>
  );
}

export default App;
