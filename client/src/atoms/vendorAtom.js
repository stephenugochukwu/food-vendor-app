import { atom } from "recoil";

export const foodListState = atom({
  key: "FoodListState",
  default: true,
});

export const ordersPlacedState = atom({
  key: "OrdersPlacedState",
  default: false,
});

export const modalActiveState = atom({
  key: "ModalActive",
  default: false,
});
