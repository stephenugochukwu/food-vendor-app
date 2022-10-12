import React, { useState, useEffect } from "react";

import axios from "../api/axios";
import { UserListStyle } from "../styles/UserListStyle";
import { UserTicketStyle } from "../styles/UserTicketStyle";

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/admin/getAllUsers")
      .then((res) => {
        console.log(res);
        setUsers(res.data.record);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <UserListStyle>
      {users.map((user) => (
        <UserTicketStyle key={user.id}>
          <p>
            Name: <span>{user.fullName}</span>
          </p>
          <p>
            Email: <span>{user.email}</span>
          </p>
          <p>
            User ID: <span>{user.id}</span>
          </p>
          <p>
            Total Orders: <span>{user.orders.length}</span>
          </p>
        </UserTicketStyle>
      ))}
    </UserListStyle>
  );
};

export default UserList;

// admin/getAllUsers GET
