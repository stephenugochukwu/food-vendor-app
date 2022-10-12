import { atom } from "recoil";

export const regularMealsState = atom({
  key: "regularMeals",
  default: true,
});

export const premiumMealsState = atom({
  key: "premiumMeals",
  default: false,
});

export const yourOrderStates = atom({
  key: "yourOrders",
  default: false,
});

export const AllMealsState = atom({
  key: "AllMeals",
  default: [],
});

export const BreakfastState = atom({
  key: "Breakfast",
  default: [],
});

export const LunchState = atom({
  key: "Lunch",
  default: [],
});

export const premiumBreakfastsState = atom({
  key: "premiumBreakfasts",
  default: [],
});

export const premiumLunchesState = atom({
  key: "premiumLunches",
  default: [],
});
