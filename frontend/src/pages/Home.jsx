import React from "react";
import Navbar from "../components/Navbar";
import HomeBanner from "../components/HomeBanner";
import HomeCars from "../components/HomeCars";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <HomeBanner />
      <HomeCars />
      <Testimonial />
      <Footer/>
    </>
  );
}

export default Home;
