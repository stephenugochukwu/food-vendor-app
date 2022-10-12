import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../hooks/UseAuth";
import { FormStyle } from "../styles/FormStyle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({
  signIn,
  signup,
  UserLogin,
  UserSignup,
  AdminSignup,
  AdminLogin,
  VendorLogin,
  VendorSignup,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm_password: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = UseAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (Object.keys(errors).length === 0) {
      if (UserLogin) {
        axios
          .post("/users/login", {
            email: formData.email,
            password: formData.password,
          })
          .then((res) => {
            if (res.status === 201) {
              // console.log(res);
              login(res.data.fullName, res.data.id, res.data.token);
              localStorage.setItem("token", JSON.stringify(res.data.token));
              localStorage.setItem("user", JSON.stringify(res.data.User));
              localStorage.setItem("role", JSON.stringify("user"));
              navigate("/");
            }
          })
          .catch((err) => {
            toast.error("invalid email or password");
          });
      } else if (UserSignup) {
        axios
          .post("/users/register", formData)
          .then((res) => {
            if (res.status === 201) {
              // console.log(res);
              navigate("/login");
            }
          })
          .catch((err) => {
            // console.log(err.response.data.msg);
            if (err.response.data.msg === "Phone number is used") {
              toast.error("Phone Number Already Used");
            } else if (
              err.response.data.msg ===
              "Email is used, please enter another email"
            ) {
              toast.error("Email already used");
            }
          });
      } else if (AdminSignup) {
        axios
          .post("/admin/register", formData)
          .then((res) => {
            if (res.status === 201) {
              console.log(res);
              navigate("/admin/login");
            }
          })
          .catch((err) => {
            if (
              err.response.data.msg ===
              "Email is used, please enter another email"
            ) {
              toast.error("Email already used");
            } else if (err.response.data.msg === "Phone number is used") {
              toast.error("Phone Number Already Used");
            }
          });
      } else if (AdminLogin) {
        axios
          .post("/admin/login", {
            email: formData.email,
            password: formData.password,
          })
          .then((res) => {
            if (res.status === 201) {
              console.log(res);
              login(res.data.fullName, res.data.id, res.data.token);
              localStorage.setItem("token", JSON.stringify(res.data.token));
              localStorage.setItem("user", JSON.stringify(res.data.Admin));
              localStorage.setItem("role", JSON.stringify("admin"));
              navigate("/admin/dashboard");
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("invalid email or password");
          });
      } else if (VendorLogin) {
        axios
          .post("/vendors/login", {
            email: formData.email,
            password: formData.password,
          })
          .then((res) => {
            if (res.status === 201) {
              console.log(res);
              login(res.data.name, res.data.id, res.data.token);
              localStorage.setItem("token", JSON.stringify(res.data.token));
              localStorage.setItem("user", JSON.stringify(res.data.Vendor));
              localStorage.setItem("role", JSON.stringify("vendor"));
              navigate("/vendor/dashboard");
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("invalid email or password");
          });
      }
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      {/* <ToastContainer /> */}
      <h2>
        {UserLogin
          ? "Log In"
          : UserSignup
          ? "Sign Up"
          : AdminSignup
          ? "Sign Up as an Admin"
          : AdminLogin
          ? "Login as an Admin"
          : VendorLogin
          ? "Login as a Vendor"
          : "Sign Up as a Vendor"}
      </h2>
      <form onSubmit={handleSubmit}>
        {signup && (
          <div>
            <label htmlFor="fullName"></label>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value.trim(),
                })
              }
              required
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>
        )}
        <div>
          <label htmlFor="email"></label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value.trim(),
              })
            }
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        {signup && (
          <div>
            <label htmlFor="phoneNumber"></label>
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phoneNumber: e.target.value.trim(),
                })
              }
            />
            {errors.phoneNumber && (
              <p className="error">{errors.phoneNumber}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        {signup && (
          <div>
            <label htmlFor="confirmPassword"></label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirm_password: e.target.value,
                })
              }
            />
            {errors.confirm_password && (
              <p className="error">{errors.confirm_password}</p>
            )}
          </div>
        )}
        <button type="submit" className="action-btn">
          {signup ? "Sign Up" : "Login"}
        </button>
      </form>

      {signup ? (
        <h4>
          Already have an account? Login{" "}
          <Link
            to={
              UserSignup
                ? "/login"
                : AdminSignup
                ? "/admin/login"
                : VendorSignup
                ? "/vendor/login"
                : ""
            }
            className="link"
          >
            HERE
          </Link>
        </h4>
      ) : (
        <>
          <h4>
            Don't have an account? Sign Up{" "}
            <Link
              to={
                UserLogin
                  ? "/register"
                  : AdminLogin
                  ? "/admin/register"
                  : VendorLogin
                  ? "/vendor/register"
                  : ""
              }
              className="link"
            >
              HERE{" "}
            </Link>
          </h4>
          {UserLogin && (
            <h4>
              <Link to={UserLogin ? "/vendor/login" : ""} className="link">
                Sign in as a Vendor
              </Link>
            </h4>
          )}
          {VendorLogin && (
            <h4>
              <Link to={VendorLogin ? "/login" : ""} className="link">
                Sign in as a User
              </Link>
            </h4>
          )}
        </>
      )}
    </FormStyle>
  );
};

export default Form;
