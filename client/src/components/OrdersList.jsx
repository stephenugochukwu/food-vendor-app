import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
import { OrderListStyle } from "../styles/OrderListStyle";

const OrdersList = ({ vendorOrders }) => {
  //   console.log({ vendorOrders });
  const [users, setAllUsers] = useState([]);
  const [vendorFood, setVendorFood] = useState([]);

  console.log({ vendorFood });
  const vendor = JSON.parse(localStorage.getItem("user"));
  const getUsers = () => {
    axios
      .get("/admin/getAllUsers")
      .then((res) => {
        setAllUsers(res.data.record);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMeal = () => {
    axios
      .get(`vendors/getAllVendorDetails/${vendor.id}`)
      .then((res) => {
        setVendorFood(res.data.record.menu);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
    getMeal();
  }, []);

  return (
    <OrderListStyle>
      {vendorOrders.map((order) => {
        return (
          <div className="ticket">
            <p>
              Order ID: <span>{order.id}</span>
            </p>
            <p>
              Order Status: <span>{order.orderStatus}</span>
            </p>
            <p>
              Order Placed By:{" "}
              <span>
                {users.filter((user) => user.id === order.userId)[0]?.fullName}
              </span>
            </p>
            <p>
              Meal:
              <span>
                {vendorFood.filter((food) => food.id === order.foodId)[0]?.name}
              </span>
            </p>
            <p>
              Meal Category:
              <span>
                {
                  vendorFood.filter((food) => food.id === order.foodId)[0]
                    ?.category
                }
              </span>
            </p>
            <p>
              Time of Order:{" "}
              <span>{order.createdAt.split("T")[1].substring(0, 8)}</span>
            </p>
          </div>
        );
      })}
    </OrderListStyle>
  );
};

export default OrdersList;
