import { atom } from "recoil";

export const filteredMealsState = atom({
    key: "filteredMeals",
    default: []
  })

export const searchInputState = atom({
  key: "searchInput",
  default: false
})