import React, { useEffect, useState } from "react";
import DateNow from "../components/DateNow";
import FilterToggle from "../components/FilterToggle";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Meals from "../components/Meals";
import { HomeStyle } from "../styles/HomeStyle";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AllMealsState,
  BreakfastState,
  LunchState,
  premiumBreakfastsState,
  premiumLunchesState,
  premiumMealsState,
  regularMealsState,
  yourOrderStates,
} from "../atoms/mealAtom";
import axios from "../api/axios";
import MealCard from "../components/MealCard";
import { userOrderState } from "../atoms/userAtom";
import { filteredMealsState, searchInputState } from "../atoms/filteredMeals";
import OrderTickets from "../components/OrderTickets";

const dayOfTheWeek = new Date().getDay();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const HomePage = () => {
  const regularMeals = useRecoilValue(regularMealsState);
  const premiumMeals = useRecoilValue(premiumMealsState);
  const yourOrders = useRecoilValue(yourOrderStates);
  const [userOrders, setUserOrders] = useRecoilState(userOrderState);
  const [fetchedUserOrders, setFetchedUserOrders] = useState([]);
  const [allMeals, setAllMeals] = useRecoilState(AllMealsState);
  const [breakfasts, setBreakfasts] = useRecoilState(BreakfastState);
  const [Lunches, setLunches] = useRecoilState(LunchState);
  const [premiumBreakfasts, setPremiumBreakfasts] = useRecoilState(
    premiumBreakfastsState
  );
  const [premiumLunches, setPremiumLunches] =
    useRecoilState(premiumLunchesState);
  // console.log(userOrders);

  const [filter, setfilter] = useRecoilState(filteredMealsState);
  const searchInput = useRecoilValue(searchInputState);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("/getallfood").then((res) => {
      setAllMeals(res.data.record);
      if (searchInput) {
        setBreakfasts(
          filter.filter(
            (meal) =>
              !meal.premium &&
              meal.category === "Breakfast" &&
              meal.dayServed === days[dayOfTheWeek]
          )
        );
      } else {
        setBreakfasts(
          res.data.record.filter(
            (meal) =>
              !meal.premium &&
              meal.category === "Breakfast" &&
              meal.dayServed === days[dayOfTheWeek]
          )
        );
      }
      if (searchInput) {
        setLunches(
          filter.filter(
            (meal) =>
              !meal.premium &&
              meal.category === "Lunch" &&
              meal.dayServed === days[dayOfTheWeek]
          )
        );
      } else {
        setLunches(
          res.data.record.filter(
            (meal) =>
              !meal.premium &&
              meal.category === "Lunch" &&
              meal.dayServed === days[dayOfTheWeek]
          )
        );
      }
      if (searchInput) {
        setPremiumBreakfasts(
          filter.filter(
            (meal) =>
              meal.premium &&
              meal.category === "Breakfast" &&
              meal.dayServed === days[dayOfTheWeek]
          )
        );
      } else {
        setPremiumBreakfasts(
          res.data.record.filter(
            (meal) =>
              meal.premium &&
              meal.category === "Breakfast" &&
              meal.dayServed === days[dayOfTheWeek]
          )
        );
      }

      if (searchInput) {
        setPremiumLunches(
          filter.filter(
            (meal) =>
              meal.premium &&
              meal.category === "Lunch" &&
              meal.dayServed === days[dayOfTheWeek]
          )
        );
      } else {
        setPremiumLunches(
          res.data.record.filter(
            (meal) =>
              meal.premium &&
              meal.category === "Lunch" &&
              meal.dayServed === days[dayOfTheWeek]
          )
        );
      }
    });
  }, [filter]);

  useEffect(() => {
    axios.get(`/users/getOrders/${user.id}`).then((res) => {
      // console.log(res);
      setFetchedUserOrders(res.data.record.orders);
    });
  }, [userOrders]);

  // console.log({ fetchedUserOrders });

  return (
    <HomeStyle>
      <Header home />
      <FilterToggle home />
      <DateNow />
      {regularMeals && (
        <>
          <Meals breakfast={breakfasts} />
          <Meals lunch={Lunches} />
        </>
      )}
      {premiumMeals && (
        <>
          <Meals premiumBreakfast={premiumBreakfasts} />
          <Meals premiumLunch={premiumLunches} />
        </>
      )}
      {yourOrders &&
        fetchedUserOrders.map((order) => (
          <div className="your-orders-container" key={order.id}>
            <OrderTickets order={order} />
          </div>
        ))}
      <div className="footer">
        <Footer />
      </div>
    </HomeStyle>
  );
};
