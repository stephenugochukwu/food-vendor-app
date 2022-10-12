import React from "react";
import { HeroTextsStyle } from "../styles/HeroTexts";

const Hero = () => {
  return (
    <div className="hero">
      <HeroTextsStyle>
        <h1>Welcome to Sapa Kitchen</h1>
        <h3>
          Book or buy your meals in <span>ONE MINUTE</span>
        </h3>
      </HeroTextsStyle>
    </div>
  );
};

export default Hero;
