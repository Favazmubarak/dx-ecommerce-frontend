import React from "react";
import Navbar from "../../components/Navbar";
import LoginForm from "../../components/LoginForm";
import api from "../../services/axios";

const UserLogin = () => {
  async function checkUser(email,password ) {
    let msg;
    let isLogin = false;
    try {
      const res = await api.post("/login", { email, password });
      msg = res.data.message;
      isLogin=true
    } catch (err) {
      msg = err?.response?.data?.error || "Server Failed";
    } finally {
      return { msg, isLogin };
    }
  }

  return (
    <>
      <LoginForm message1={"WELCOME BACK"}  logincheck={checkUser} />
    </>
  );
};

export default UserLogin;
