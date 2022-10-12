import React from "react";
import { DateStyle } from "../styles/DateStyle";

const date = new Date();

const DateNow = () => {
  return (
    <DateStyle>
      <p>{date.toDateString()}</p>
    </DateStyle>
  );
};

export default DateNow;
