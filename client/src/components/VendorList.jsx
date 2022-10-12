import React, { useState } from "react";
import axios from "../api/axios";
import { VendorListStyle } from "../styles/VendorListStyle";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

const VendorList = ({ vendor }) => {
  const [toggleVerified, setToggleVerified] = useState(false);
  const [toggleUnverified, setToggleUnverified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggleVerified(!toggleVerified);
    axios
      .patch(
        `/admin/verifyVendor/${vendor.id}`,
        { verified: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Vendor Verified");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    setToggleUnverified(!toggleUnverified);
    axios
      .patch(
        `/admin/verifyVendor/${vendor.id}`,
        { verified: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Vendor Unverified");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <VendorListStyle>
      <ToastContainer />
      <p>
        Name: <span>{vendor.name}</span>
      </p>
      <p>
        Vendor ID: <span>{vendor.id}</span>
      </p>
      <p>
        Owner: <span>{vendor.name}</span>
      </p>
      {!vendor.verified && (
        <button onClick={handleSubmit}>
          {toggleVerified === false ? "Authenticate  Vendor" : "Remove Vendor"}
        </button>
      )}
      {vendor.verified && (
        <button onClick={handleSubmit1}>
          {toggleUnverified === false ? "Remove Vendor" : "Authenticate Vendor"}
        </button>
      )}
      {/* {vendor.verified && <button>Verified</button>} */}
    </VendorListStyle>
  );
};

export default VendorList;
