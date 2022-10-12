import React, { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "../api/axios";
import { commentsState, userState, vendorsState } from "../atoms/adminAtom";
import CommentList from "../components/CommentList";
// import { Admin } from "../components/Admin";
import DateNow from "../components/DateNow";
import FilterToggle from "../components/FilterToggle";

import Footer from "../components/Footer";
import Header from "../components/Header";
import PersonnelList from "../components/PersonnelList";
import UserList from "../components/UserList";
import VendorList from "../components/VendorList";
import {
  AdminDashboardStyle,
  PageLayoutStyle,
} from "../styles/PageLayoutStyle";

export const AdminDashboard = () => {
  const [vendorActive, setVendorActive] = useRecoilState(vendorsState);
  const [userActive, setUserActive] = useRecoilState(userState);
  const [commentActive, setCommentActive] = useRecoilState(commentsState);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/getAllVendors")
      .then((res) => {
        // console.log(res);
        setVendors(res.data.record);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header admin />
      <FilterToggle admin />
      <DateNow />
      {vendorActive && <PersonnelList vendors={vendors} />}
      {userActive && <UserList />}
      {commentActive && <CommentList />}
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};
