import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "../api/axios";
import { editPageActiveState } from "../atoms/editPageAtom";
import DateNow from "../components/DateNow";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { EditMealPageStyle } from "../styles/EditMealPage";
import { PageLayoutStyle } from "../styles/PageLayoutStyle";
import { ProductDetailStyle } from "../styles/ProductDetailStyle";

const EditMealPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [editActive, setEditActive] = useRecoilState(editPageActiveState);

  let reqBody = {
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
  };

  const { name, description, price, image } = product;

  useEffect(() => {
    axios.get(`/users/getOneMeal/${id}`).then((res) => {
      setProduct(res.data.record);
    });
  }, []);

  return (
    <PageLayoutStyle>
      <Header />
      <DateNow />
      <EditMealPageStyle>
        <div className="edit-form-container">
          <form>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              value={product.name}
              name="name"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <label htmlFor="description">Meal Description</label>
            <input
              type="text"
              value={product.description}
              name="description"
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />

            <label htmlFor="price">Meal Price</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <label htmlFor="image">Meal Image</label>
            <input
              type="text"
              value={product.image}
              name="image"
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
            />
            <div className="edit-form-btn">
              <button
                onClick={() => {
                  navigate("/vendor/dashboard");
                }}
              >
                Go Back
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .post(`/vendors/updatemenu/${id}`, {
                      name,
                      description,
                      price,
                      image,
                    })
                    .then((res) => {
                      console.log(res);
                      navigate("/vendor/dashboard");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </EditMealPageStyle>

      <div className="footer">
        <Footer />
      </div>
    </PageLayoutStyle>
  );
};

export default EditMealPage;
