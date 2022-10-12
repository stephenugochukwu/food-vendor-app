import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "../api/axios";
import { editPageActiveState } from "../atoms/editPageAtom";
import { VendorMealCardStyle } from "../styles/VendorMealCardStyle";

const VendorMealCard = ({ meal }) => {
  const [editActive, setEditActive] = useRecoilState(editPageActiveState);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <VendorMealCardStyle>
      <h3>
        {meal.name} (₦{meal.price})
      </h3>
      <img src={meal.image} alt="" className="meal-image" />
      <p className="description">{meal.description}</p>
      <div className="actn">
        <button
          className="btn edit-btn"
          onClick={() => {
            setEditActive(true);
            navigate(`/editFood/${meal.id}`);
          }}
        >
          Edit
        </button>
        <button
          className="btn cancel-btn"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Delete
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="mod-container">
            <h3>Are you sure you want to delete {meal.name}?</h3>
            <form action="">
              <button
                className="submit"
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .delete(`/vendors/deletefood/${meal.id}`)
                    .then((res) => {
                      console.log(res);
                      setShowModal(false);
                      window.location.reload();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                YES
              </button>
              <button
                className="cancel"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
              >
                NO
              </button>
            </form>
          </div>
        </div>
      )}
    </VendorMealCardStyle>
  );
};

export default VendorMealCard;
