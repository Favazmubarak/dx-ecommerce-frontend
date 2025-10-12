// import Login from "./pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin.jsx";
import UserLogin from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx"
import UsersList from "./pages/UsersList.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>}></Route>
        <Route path="/login" element={<UserLogin/>}></Route>
        <Route path="/admin/login" element={<AdminLogin/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/admin/users" element={<UsersList/>}></Route>
      </Routes>
    </>
  );
}

export default App;
