import React from "react";
import { PersonnelListStyle } from "../styles/PersonnelList";
import VendorList from "./VendorList";

const PersonnelList = ({ vendors }) => {
  return (
    <PersonnelListStyle>
      {vendors.map((vendor) => (
        <VendorList key={vendor.id} vendor={vendor} />
      ))}
    </PersonnelListStyle>
  );
};

export default PersonnelList;
