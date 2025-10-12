import React from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import api from "../services/axios";

const AdminLogin = () => {
  async function checkAdmin(email, password) {
    let msg;
    let isLogin = false;
    try {
      const res = await api.post("/admin/reg", { email, password });
      msg = res.data.message;
      console.log(res);
      isLogin = true;
    } catch (err) {
      msg = err?.response?.data?.error || "Server failed";
    } finally {
      return { msg, isLogin };
    }
  }

  return (
    <>
      {/* <Navbar /> */}
      <LoginForm
        message1={"ADMIN ONLY"}
        logincheck={checkAdmin}
        path={"/admin/users"}
      />
    </>
  );
};

export default AdminLogin;
