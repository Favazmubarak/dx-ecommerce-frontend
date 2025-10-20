import React from "react";
import Navbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import HomeFull from "../../components/HomeFull";

const PublicHome = () => {
  return (
    <>
      <Navbar></Navbar>
      <HomeFull></HomeFull>
      <Footer/>
    </>
  );
};

export default PublicHome;