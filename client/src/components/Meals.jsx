import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  premiumMealsState,
  regularMealsState,
  yourOrderStates,
} from "../atoms/mealAtom";
import { GridContainer } from "../styles/GridContainer";
import { MealStyle } from "../styles/MealStyle";
import MealCard from "./MealCard";

const Meals = ({ breakfast, premiumBreakfast, lunch, premiumLunch }) => {
  const [regularActive, setRegularActive] = useRecoilState(regularMealsState);
  const [premiumActive, setPremiumActive] = useRecoilState(premiumMealsState);
  const regularMeals = useRecoilValue(regularMealsState);
  const premiumMeals = useRecoilValue(premiumMealsState);

  const [yourOrdersActive, setYourOrdersActive] =
    useRecoilState(yourOrderStates);

  return (
    <MealStyle>
      <h3>
        {breakfast && "Breakfast Choices"}
        {premiumBreakfast && "Premium Breakfast Choices"}
        {lunch && "Lunch Choices"}
        {premiumLunch && "Premium Lunch Choices"}
      </h3>
      <GridContainer>
        {breakfast &&
          breakfast.map((meal) => (
            <MealCard key={meal.id} meal={meal} breakfast />
          ))}

        {lunch && lunch.map((meal) => <MealCard key={meal.id} meal={meal} />)}

        {premiumBreakfast &&
          premiumBreakfast.map((meal) => (
            <MealCard key={meal.id} meal={meal} breakfast />
          ))}

        {premiumLunch &&
          premiumLunch.map((meal) => <MealCard key={meal.id} meal={meal} />)}
      </GridContainer>

      {regularActive && (
        <p className="redirect-text">
          Don't see what you like? Try the{" "}
          <span
            className="subtext"
            onClick={() => {
              setPremiumActive(true);
              setRegularActive(false);
              setYourOrdersActive(false);
            }}
          >
            Premium Menu
          </span>{" "}
        </p>
      )}

      {premiumActive && (
        <p className="redirect-text">
          Go back to{" "}
          <span
            className="subtext"
            onClick={() => {
              setRegularActive(true);
              setPremiumActive(false);
              setYourOrdersActive(false);
            }}
          >
            Regular Menu
          </span>{" "}
        </p>
      )}
    </MealStyle>
  );
};

export default Meals;
