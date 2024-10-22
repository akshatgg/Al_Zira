
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./Components/Login.tsx"
import Signup from "./Components/Signup.tsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/Login" element={<Login />} /> */}
          <Route path="/" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App