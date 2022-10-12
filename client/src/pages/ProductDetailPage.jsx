import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import DateNow from "../components/DateNow";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ProductDetailStyle } from "../styles/ProductDetailStyle";
import { PaystackButton } from "react-paystack";
import { PaysackModalState } from "../atoms/PayStackModalAtom";
import { useRecoilState } from "recoil";
import { AiOutlineClose } from "react-icons/ai";
import { userOrderState } from "../atoms/userAtom";
import {
  premiumMealsState,
  regularMealsState,
  yourOrderStates,
} from "../atoms/mealAtom";
import { toast, ToastContainer } from "react-toastify";
import { PageLayoutStyle } from "../styles/PageLayoutStyle";

const ProductDetailPage = () => {
  const [regularMeals, setRegularMeals] = useRecoilState(regularMealsState);
  const [premiumMeals, setPremiumMeals] = useRecoilState(premiumMealsState);
  const [yourOrders, setOrders] = useRecoilState(yourOrderStates);
  const [product, setProduct] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formActive, setFormActive] = useRecoilState(PaysackModalState);
  const navigate = useNavigate();
  const [userOrders, setUserOrders] = useRecoilState(userOrderState);

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(userOrders);
  // console.log(product)
  const publicKey = "pk_test_6cd7dc181e5cdc9a9a8247231b880642aaf6fd59";

  const componentProps = {
    email: email,
    amount: product.price * 100,
    metadata: {
      name: name,
      phone: phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      toast.success("Payment Successful, Meal Added to Your Orders");
      if (product.breakfast === "Breakfast") {
        setUserOrders({ ...userOrders, breakfast: product });
      } else {
        setUserOrders({ ...userOrders, lunch: product });
      }
      axios
        .post("/users/createOrders", {
          userId: user.id,
          foodId: product.id,
          vendorId: product.vendorId,
        })
        .then((res) => {
          console.log(res);
        });
      setOrders(true);
      setPremiumMeals(false);
      setRegularMeals(false);
      setFormActive(false);
      navigate("/");
    },

    // onClose: () => alert("Wait! Don't leave :("),
  };

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/users/getOneMeal/${id}`)
      .then((res) => {
        setProduct(res.data.record);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setFormActive(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  return (
    <PageLayoutStyle>
      <Header />
      <ToastContainer />
      <DateNow />
      <ProductDetailStyle className="product-container">
        {Object.keys(product).length === 0 ? (
          <p>Product Not Found</p>
        ) : (
          <>
            <h3>{product.name}</h3>
            <img
              className="product-image"
              src={product.image}
              alt={product.description}
            />
            <p className="product-description">{product.description}</p>
            {product.premium && (
              <div className="price">
                <strong>Price: </strong>
                <p className="price">₦{product.price}</p>
              </div>
            )}

            <div className="actions">
              {product.premium && (
                <button
                  className="btn confirm"
                  onClick={() => {
                    setFormActive(true);
                  }}
                >
                  Buy This Meal
                </button>
              )}
              {!product.premium && (
                <button
                  className="btn confirm"
                  onClick={() => {
                    setOrders(true);
                    setPremiumMeals(false);
                    setRegularMeals(false);
                    navigate(`/`);
                  }}
                >
                  Book Your meal
                </button>
              )}
              <button
                className="btn cancel"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back To Menus
              </button>
            </div>
            {formActive && (
              <div className="paystack-modal">
                <div className="paystack-form" ref={wrapperRef}>
                  <h3>User Details</h3>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div className="paystack-btn">
                    <button
                      className="close"
                      onClick={() => {
                        setFormActive(false);
                      }}
                    >
                      Close
                    </button>

                    <PaystackButton
                      className="paystack-button"
                      {...componentProps}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </ProductDetailStyle>

      <div className="footer">
        <Footer />
      </div>
    </PageLayoutStyle>
  );
};

export default ProductDetailPage;
