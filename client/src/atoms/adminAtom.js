import { atom } from "recoil";

export const vendorsState = atom({
  key: "vendorsState",
  default: true,
});

export const userState = atom({
  key: "userState",
  default: false,
});


export const commentsState = atom({
    key: "commentsState",
    default: false,
  });
  