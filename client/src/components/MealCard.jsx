import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  premiumMealsState,
  regularMealsState,
  yourOrderStates,
} from "../atoms/mealAtom";
import { userOrderState } from "../atoms/userAtom";
import { MealCardStyle } from "../styles/MealCardStyle";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const currentHour = new Date().getHours();

const MealCard = ({ meal, breakfast, vendorPage }) => {
  const [regularMeals, setRegularMeals] = useRecoilState(regularMealsState);
  const [premiumMeals, setPremiumMeals] = useRecoilState(premiumMealsState);
  const [yourOrders, setOrders] = useRecoilState(yourOrderStates);
  const [userOrders, setUserOrders] = useRecoilState(userOrderState);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log({ user });
  // console.log({ meal });
  // console.log(userOrders);
  return (
    <MealCardStyle>
      {regularMeals && (
        <div
          className="mealCard"
          onClick={() => {
            if (!vendorPage) {
              // navigate(`/product/${meal.id}`);
            }
          }}
        >
          <div className="image-and-select">
            <img
              className="meal-image"
              src={meal.image}
              alt={meal.description}
            />
            <div className="select-and-view">
              <button
                className="select-btn"
                onClick={() => {
                  if (breakfast) {
                    setUserOrders({ ...userOrders, breakfast: meal });
                  } else {
                    setUserOrders({ ...userOrders, lunch: meal });
                  }
                  setOrders(true);
                  setPremiumMeals(false);
                  setRegularMeals(false);
                  axios
                    .post("/users/createOrders", {
                      userId: user.id,
                      foodId: meal.id,
                      vendorId: meal.vendorId,
                    })
                    .then((res) => {
                      console.log(res);
                    });
                }}
              >
                Select
              </button>
              <button
                className="view-btn"
                onClick={() => navigate(`/product/${meal.id}`)}
              >
                View Meal
              </button>
            </div>
          </div>
          <h4>{meal.name}</h4>
          <p>{meal.description}</p>
        </div>
      )}

      {premiumMeals && (
        <>
          <div
            className="mealCard"
            onClick={() => {
              navigate(`/product/${meal.id}`);
            }}
          >
            <div className="image-and-select">
              <img
                className="meal-image"
                src={meal.image}
                alt={meal.description}
              />
              <div className="select-and-view">
                <button
                  className="select-btn"
                  onClick={() => {
                    if (breakfast) {
                      setUserOrders({ ...userOrders, breakfast: meal });
                    } else {
                      setUserOrders({ ...userOrders, lunch: meal });
                    }
                    // setUserOrders([meal]);
                  }}
                >
                  Pay for Meal
                </button>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/product/${meal.id}`)}
                >
                  View Meal
                </button>
              </div>
            </div>
            <div className="name-and-price">
              <h4>{meal.name}</h4>
              <p className="price">₦{meal.price}</p>
            </div>
            <p className="description">{meal.description}</p>
          </div>
        </>
      )}
    </MealCardStyle>
  );
};

export default MealCard;

//  disabled={
//                   breakfast
//                     ? currentHour > 9 && currentHour < 14
//                       ? true
//                       : false
//                     : currentHour > 9 && currentHour < 14
//                     ? false
//                     : true
//                 }
