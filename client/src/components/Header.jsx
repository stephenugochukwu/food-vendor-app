import React, { useEffect } from "react";
import { HeaderStyle } from "../styles/HeaderStyle";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AllMealsState } from "../atoms/mealAtom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../atoms/userAtom";
import { filteredMealsState, searchInputState } from "../atoms/filteredMeals";

const Header = ({ home, admin, vendor, productDetails }) => {
  const [allMeals, setAllMeals] = useRecoilState(AllMealsState);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userInfoState);
  const [filtered, setfiltered] = useRecoilState(filteredMealsState);
  const [searchInput, setSearchInput] = useRecoilState(searchInputState);

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value) {
      setSearchInput(true);
    } else {
      setSearchInput(false);
    }
    // setSearch(e.target.value)
    const filteredMeals = allMeals.filter((meal) =>
      meal.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // setAllMeals(filteredMeals);
    setfiltered(filteredMeals);
    // console.log(filtered);
  };
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = JSON.parse(localStorage.getItem("role"));

  useEffect(() => {
    setLoggedInUser(user);
  }, []);

  return (
    <HeaderStyle>
      <Link className="link" to="/">
        <div className="logo">Sapa Kitchen</div>
      </Link>
      {home && (
        <div className="search">
          <AiOutlineSearch size={20} color={"#565656"} />
          <input
            type="text"
            placeholder="Search for a meal"
            onChange={handleSearch}
          />
        </div>
      )}

      {admin && <p>Admin Dashboard</p>}
      {vendor && <p>Vendor Dashboard</p>}

      <div className="user-actions">
        <div>
          {role === "vendor" ? (
            <p className="greeting">Hello, {user.name} 👋🏼 </p>
          ) : (
            <p className="greeting">Hello, {user.fullName} 👋🏼 </p>
          )}
        </div>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>{" "}
      </div>
    </HeaderStyle>
  );
};

export default Header;
