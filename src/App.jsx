
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminProducts from "./pages/Admin/AdminProducts.jsx";
import UserLogin from "./pages/Users/UsersLogin.jsx";
import Navbar from "./components/Navbar.jsx"
import UsersList from "./pages/Admin/UsersList.jsx";
import AdminHome from "./pages/Admin/AdminHome.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>}></Route>
        <Route path="users/login" element={<UserLogin/>}></Route>
        <Route path="/admin/login" element={<AdminLogin/>}></Route>
        <Route path="/admin/users" element={<UsersList/>}></Route>
        <Route path="/admin/products" element={<AdminProducts/>}></Route>
        <Route path="/admin/home" element={<AdminHome/>}></Route>
      </Routes>
    </>
  );
}

export default App;
