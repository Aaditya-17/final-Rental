import React from "react";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Process from "./Process";
import FAQ from "./FAQ";
import Roleselection from "./roleselection";
export const Home = () => {
  return (
    <div>
      <HeroSection />
      <Roleselection />
      <Features />
      <Process />
      <FAQ />
    </div>
  );
};

export default Home;
