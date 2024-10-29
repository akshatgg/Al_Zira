
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/login.tsx"
import Signup from "./Pages/Auth/Signup.tsx";
import ForgotPassword from "./Pages/Auth/ForgotPassword.tsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forgot_Password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App