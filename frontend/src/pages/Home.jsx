import React from "react";
import MainPage from "../components/MainPage/MainPage";
import Service from "../components/Service/Service";
import Navbar from "../components/Navbar/Navbar";
import About from "../components/About/About";

const Home = () => {
  return (
    <>

      <MainPage />
      <About />
      <Service />
    </>
  );
};

export default Home;
