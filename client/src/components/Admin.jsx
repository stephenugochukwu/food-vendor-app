import React from "react";
import { useRecoilState } from "recoil";
import { commentsState, userState, vendorsState } from "../atoms/adminAtom";
import FilterToggle from "./FilterToggle";
import Header from "./Header";
import { Vendor } from "./Vendor";
import { User } from "./User";
import { Comments } from "./Comments";

export const Admin = () => {
  const [vendorActive] = useRecoilState(vendorsState);
  const [userActive] = useRecoilState(userState);
  const [commentActive] = useRecoilState(commentsState);
  return (
    <>
      <Header admin />
      <FilterToggle admin />
      {vendorActive && (
        <>
          <Vendor />
          <Vendor />
          <Vendor />
        </>
      )}
      {userActive && (
        <>
          <User />
          <User />
          <User />
        </>
      )}
      {commentActive && (
           <>
           <Comments />
           <Comments />
           <Comments />
         </>
      )}
    </>
  );
};
