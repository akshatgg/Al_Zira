import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/login.tsx"
import Signup from "./Pages/Auth/Signup.tsx";
import ForgotPassword from "./Pages/Auth/ForgotPassword.tsx";
import { Navbar } from "./Pages/Navbar/Navbar.tsx";
import {Prompt} from "./Pages/Prompt/Prompt.tsx";
import { Loader } from "./Components/Loader/Loader.jsx";



function App() {
  return (
    <div>
      <Router>

        
        <Routes>
          <Route path="/" element={<Navbar/>} />
          <Route path="/loader" element={<Loader/>} /> 
        </Routes>
       
        
        <Routes>
          <Route>
          <Route path="/" element={<Prompt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forgot_Password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}


export default App