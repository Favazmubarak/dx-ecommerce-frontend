import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminProducts from "./pages/Admin/AdminProducts.jsx";
import UserLogin from "./pages/Users/UsersLogin.jsx";
import UsersList from "./pages/Admin/UsersList.jsx";
import AdminHome from "./pages/Admin/AdminHome.jsx";
import UserHome from "./pages/Users/UserHome.jsx";
import RegisterPage from "./pages/Public/Register.jsx";
import AdminCategories from "./pages/Admin/AdminCategories.jsx";
import AdminAddCategory from "./pages/Admin/AdminAddCategory.jsx";
import AdminCategoryEdit from "./pages/Admin/AdminEditCategory.jsx";
import CreateProduct from "./pages/Admin/AdminCreateProducts.jsx";
import EditProduct from "./pages/Admin/AdminEditProducts.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserHome />}></Route>
        <Route path="/reg" element={<RegisterPage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>

        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/users" element={<UsersList />}></Route>
        <Route path="/admin/home" element={<AdminHome />}></Route>
        <Route path="admin/products" element={<AdminProducts />}></Route>
        <Route path="/admin/products/add" element={<CreateProduct/>}/>
        <Route path="/admin/products/:id" element={<EditProduct/>}/>
        <Route path="/admin/categories" element={<AdminCategories />}></Route>
        <Route path="/admin/category" element={<AdminAddCategory />} />
        <Route path="/admin/categories/:id" element={<AdminCategoryEdit/>}/>
      </Routes>
    </>
  );
}

export default App;
