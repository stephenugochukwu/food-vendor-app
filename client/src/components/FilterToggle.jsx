import React from "react";
import { useRecoilState } from "recoil";
import { commentsState, userState, vendorsState } from "../atoms/adminAtom";
import {
  premiumMealsState,
  regularMealsState,
  yourOrderStates,
} from "../atoms/mealAtom";
import { foodListState, ordersPlacedState } from "../atoms/vendorAtom";
import { FilterToggleStyle } from "../styles/FilterToggleStyle";

const FilterToggle = ({ home, admin, vendor }) => {
  const [regularActive, setRegularActive] = useRecoilState(regularMealsState);
  const [premiumActive, setPremiumActive] = useRecoilState(premiumMealsState);
  const [yourOrdersActive, setYourOrdersActive] =
    useRecoilState(yourOrderStates);
  const [vendorActive, setVendorActive] = useRecoilState(vendorsState);
  const [userActive, setUserActive] = useRecoilState(userState);
  const [commentActive, setCommentActive] = useRecoilState(commentsState);
  const [foodListActive, setFoodListActive] = useRecoilState(foodListState);
  const [ordersPlacedActive, setOrdersPlacedActive] =
    useRecoilState(ordersPlacedState);
  return (
    <FilterToggleStyle>
      {home ? (
        <>
          <p
            className={regularActive ? "active" : ""}
            onClick={() => {
              setRegularActive(true);
              setPremiumActive(false);
              setYourOrdersActive(false);
            }}
          >
            Regular Meals
          </p>
          <p
            className={premiumActive ? "active" : ""}
            onClick={() => {
              setPremiumActive(true);
              setRegularActive(false);
              setYourOrdersActive(false);
            }}
          >
            Premium Meals
          </p>
          <p
            className={yourOrdersActive ? "active" : ""}
            onClick={() => {
              setYourOrdersActive(true);
              setPremiumActive(false);
              setRegularActive(false);
            }}
          >
            Your Orders
          </p>
        </>
      ) : admin ? (
        <>
          <p
            className={vendorActive ? "active" : ""}
            onClick={() => {
              setVendorActive(true);
              setUserActive(false);
              setCommentActive(false);
            }}
          >
            Vendors
          </p>
          <p
            className={userActive ? "active" : ""}
            onClick={() => {
              setUserActive(true);
              setVendorActive(false);
              setCommentActive(false);
            }}
          >
            Users
          </p>
          <p
            className={commentActive ? "active" : ""}
            onClick={() => {
              setCommentActive(true);
              setUserActive(false);
              setVendorActive(false);
            }}
          >
            Comments
          </p>
        </>
      ) : vendor ? (
        <>
          <p
            className={foodListActive ? "active" : ""}
            onClick={() => {
              setFoodListActive(true);
              setOrdersPlacedActive(false);
            }}
          >
            Food
          </p>
          <p
            className={ordersPlacedActive ? "active" : ""}
            onClick={() => {
              setOrdersPlacedActive(true);
              setFoodListActive(false);
            }}
          >
            Orders Placed
          </p>
        </>
      ) : null}
    </FilterToggleStyle>
  );
};

export default FilterToggle;
