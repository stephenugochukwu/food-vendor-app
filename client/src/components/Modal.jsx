import React, { useRef, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { modalActiveState } from "../atoms/vendorAtom";
import { ModalStyle } from "../styles/ModalStyle";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";

const Modal = ({ vendorFood, setVendorFood }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [modalActive, setModalActive] = useRecoilState(modalActiveState);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    premium: "",
    price: "",
    vendorId: user.id,
    dayServed: "",
  });
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  const handleCreateMeal = async (e) => {
    e.preventDefault();
    axios
      .post("/vendors/addFood", formData, {
        method: "POST",
        headers: {
          contentType: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          toast.success("Meal Added");
          setModalActive(false);
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response.data.Error === "Vendor verification failed") {
          toast.error("User not a verified vendor");
        } else if (
          err.response.data.Error === "dayServed is not allowed to be empty"
        ) {
          toast.error("Day served is required");
        } else if (err.response.data.Error === "premium must be a boolean") {
          toast.error("Include premium status");
        } else if (
          err.response.data.Error === "category is not allowed to be empty"
        ) {
          toast.error("Please choose a category");
        }
        console.log(err.response.data.Error);
      });
  };

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setModalActive(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  return (
    <ModalStyle>
      <ToastContainer />
      <div className="modal-content" ref={wrapperRef}>
        <div className="heading">
          <h3>Create Meal</h3>
          <AiOutlineClose
            color={"#c85c5c"}
            size={35}
            onClick={() => {
              setModalActive(false);
            }}
            className="close"
          />
        </div>
        <form onSubmit={handleCreateMeal}>
          {/* Name of Meal */}

          <div className="input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value.trim(),
                })
              }
            />
          </div>

          {/* Meal Description */}

          <div className="input">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id=""
              cols="40"
              rows="4"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value.trim(),
                })
              }
            ></textarea>
          </div>

          {/* Meal Image */}

          <div className="input">
            <label htmlFor="name">Image Link</label>
            <input
              type="text"
              name="image"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.value.trim(),
                })
              }
            />
          </div>

          {/* Meal Category */}
          <div className="meal-category">
            <label htmlFor="description">Meal Category</label>
            <input
              type="radio"
              name="category"
              value="Breakfast"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
            />
            <label htmlFor="premium">Breakfast</label>
            <input
              type="radio"
              name="category"
              value="Lunch"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
            />
            <label htmlFor="premium">Lunch</label>
          </div>

          {/* Meal Premium status */}

          <div className="meal-category">
            <label htmlFor="description">Meal Class</label>
            <input
              type="radio"
              name="premium"
              value="Regular"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  premium: e.target.value === "Regular" ? false : true,
                })
              }
            />
            <label htmlFor="premium">Regular</label>
            <input
              type="radio"
              name="premium"
              value="Premium"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  premium: Boolean(e.target.value),
                })
              }
            />
            <label htmlFor="premium">Premium</label>
          </div>
          {/* Meal Price */}

          <div className="input">
            <label htmlFor="name">Price</label>
            <input
              type="number"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value.trim(),
                })
              }
            />
          </div>

          {/* Day Served */}

          <div className="day-served">
            <label htmlFor="name">Day Served</label>
            <select
              name="days"
              id="days"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dayServed: !e.target.value ? "Monday" : e.target.value,
                })
              }
            >
              <option value="">Select</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div className="action-btns">
            <button
              type="submit"
              className="submit-btn"
              onSubmit={() => {
                handleCreateMeal();
                setVendorFood((prev) => [...prev, formData]);
              }}
            >
              Create
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setModalActive(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ModalStyle>
  );
};

export default Modal;

// Vendor verification failed
