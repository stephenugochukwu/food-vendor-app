import React from "react";
import Hero from "../components/Hero";
import VendorSignUpForm from "../components/VendorSignUpForm";
import { HeroStyle } from "../styles/Hero";
import { RegisterBodyStyle } from "../styles/RegisterBody";
import { Container } from "../styles/RegisterStyle";

const VendorRegister = () => {
  return (
    <RegisterBodyStyle>
      <Container>
        <HeroStyle>
          <Hero />
        </HeroStyle>
        {/* <Form VendorSignup signup /> */}
        <VendorSignUpForm />
      </Container>
    </RegisterBodyStyle>
  );
};

export default VendorRegister;
