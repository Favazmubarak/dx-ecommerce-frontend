import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminProducts from "./pages/Admin/AdminProducts.jsx";
import UserLogin from "./pages/Users/UsersLogin.jsx";
import UsersList from "./pages/Admin/UsersList.jsx";
import AdminHome from "./pages/Admin/AdminHome.jsx";
// import UserHome from "./pages/Users/UserHome.jsx";
import RegisterPage from "./pages/Public/Register.jsx";
import AdminCategories from "./pages/Admin/AdminCategories.jsx";
import AdminAddCategory from "./pages/Admin/AdminAddCategory.jsx";
import AdminCategoryEdit from "./pages/Admin/AdminEditCategory.jsx";
import CreateProduct from "./pages/Admin/AdminCreateProducts.jsx";
import EditProduct from "./pages/Admin/AdminEditProducts.jsx";
import AdminOrders from "./pages/Admin/AdminOrder.jsx";
import CartPage from "./pages/Users/UserCartPage.jsx";
import UserOrders from "./pages/Users/UserOrder.jsx";
import PublicHome from "./pages/Public/PublicHome.jsx";
import SpecificProducts from "./pages/Public/SpecificProducts.jsx";
import UserProducts from "./pages/Public/UserProducts.jsx";
import UserContact from "./pages/Public/Contact.jsx";
import Profile from "./pages/Users/UserProfile.jsx";
import CheckOut from "./pages/Users/CheckOut.jsx";
import OrderSuccess from "./pages/Users/OrderSuccess.jsx";
import OrderDetails from "./pages/Users/OrderDetails.jsx";
import Shop from "./pages/Users/Shop.jsx";
// import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import NotFound from "./components/Error404.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicHome/>}></Route>
         
        <Route path="/reg" element={<RegisterPage />}></Route>
        <Route path="/user/login" element={<UserLogin />}></Route>
        <Route path="/user/cart" element={<CartPage/>}/>
        <Route path="/user/orders" element={<UserOrders/>}/>
        <Route path="/products/:id" element={<SpecificProducts/>}/>
        <Route path="/products" element={<UserProducts/>}/>
        <Route path="/contact" element={<UserContact/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/placeorder" element={<CheckOut/>}/>
        <Route path="/order-success" element={<OrderSuccess/>}/>
        <Route path="/orders/:id" element={<OrderDetails/>}/>
        <Route path="/shop/:id" element={<Shop/>}/>
        <Route path="/shop" element={<Shop/>}/>

        

        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/users" element={<UsersList />}></Route>
        <Route path="/admin/home" element={<AdminHome />}></Route>
        <Route path="admin/products" element={<AdminProducts />}></Route>
        <Route path="/admin/products/add" element={<CreateProduct/>}/>
        <Route path="/admin/products/:id" element={<EditProduct/>}/>
        <Route path="/admin/categories" element={<AdminCategories />}></Route>
        <Route path="/admin/category" element={<AdminAddCategory />} />
        <Route path="/admin/categories/:id" element={<AdminCategoryEdit/>}/>
        <Route path="/admin/orders" element={<AdminOrders/>}/>
        {/* <Route path="/admin/profile" element={<AdminProfile/>}/> */}

        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </>
  );
}

export default App;
