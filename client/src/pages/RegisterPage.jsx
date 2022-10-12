import React from "react";
import Hero from "../components/Hero";
// import "../styles/register.css";
import Form from "../components/Form";
import { Container } from "../styles/RegisterStyle";
import { HeroStyle } from "../styles/Hero";
import { RegisterBodyStyle } from "../styles/RegisterBody";
import { toast, ToastContainer } from "react-toastify";

export const RegisterPage = () => {
  return (
    <RegisterBodyStyle>
      <ToastContainer />
      <Container>
        <HeroStyle>
          <Hero />
        </HeroStyle>
        <Form signup UserSignup />
      </Container>
    </RegisterBodyStyle>
  );
};
