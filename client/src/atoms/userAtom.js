import { atom } from "recoil";

export const userOrderState = atom({
  key: "userOrder",
  default: {
    breakfast: [],
    lunch: [],
  },
});


export const userInfoState = atom({
  key: "userInfo",
  default: {}
})