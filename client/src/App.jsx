import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/header";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return(
    <BrowserRouter>
    {/* header */}
      <Header/>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route element={<PrivateRoute/>} > 
            <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
        </Routes>
    </BrowserRouter>
  ); 
    
}