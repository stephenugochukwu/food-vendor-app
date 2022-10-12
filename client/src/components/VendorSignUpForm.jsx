import React, { useState } from "react";
import { FormStyle } from "../styles/FormStyle";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../hooks/UseAuth";
import axios from "../api/axios";

const VendorSignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    ownedBy: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  //   const { login } = UseAuth();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // if (Object.keys(errors).length === 0) {
      axios.post("/vendors/register", formData).then((res) => {
        if (res.status === 201) {
          console.log(res);
          navigate("/vendor/login");
        }
      });
    } catch (err) {
      console.log(err);
    }
    // }
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <h2>Sign Up as a Vendor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value.trim(),
              })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Owned By"
            name="ownedBy"
            onChange={(e) =>
              setFormData({
                ...formData,
                ownedBy: e.target.value.trim(),
              })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Address"
            name="address"
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value.trim(),
              })
            }
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value.trim(),
              })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={(e) =>
              setFormData({
                ...formData,
                phoneNumber: e.target.value.trim(),
              })
            }
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            onChange={(e) =>
              setFormData({
                ...formData,
                confirm_password: e.target.value,
              })
            }
          />
        </div>

        <button type="submit" className="action-btn">
          Sign Up
        </button>
        <h4>
          Already have an account? Login{" "}
          <Link to={"/vendor/login"} className="link">
            HERE
          </Link>
        </h4>
      </form>
    </FormStyle>
  );
};

export default VendorSignUpForm;
