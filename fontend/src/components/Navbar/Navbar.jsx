import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, setToken, token, setFoodList } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    console.log("log out");
    setToken("");
    
    navigate("/");

    // Đăng xuất thành công
    console.log("Logged out successfully");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#food-display"
          onClick={() => setMenu("food-display")}
          className={menu === "food-display" ? "active" : ""}
        >
          food-display
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li>
                <img src={assets.logout_icon} alt="" />
                <p onClick={logOut}>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
// import React, { useContext, useState } from "react";
// import "./Navbar.css";
// import { assets } from "../../assets/assets";
// import { Link } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";

// const Navbar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("home");
//   const { getTotalCartAmount, setToken, token } = useContext(StoreContext);

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={assets.logo} alt="" className="logo" />
//       </Link>
//       <ul className="navbar-menu">
//         <Link
//           to="/"
//           onClick={() => setMenu("home")}
//           className={menu === "home" ? "active" : ""}
//         >
//           home
//         </Link>
//         <a
//           href="#explore-menu"
//           onClick={() => setMenu("menu")}
//           className={menu === "menu" ? "active" : ""}
//         >
//           menu
//         </a>
//         <a
//           href="#app-download"
//           onClick={() => setMenu("mobile-app")}
//           className={menu === "mobile-app" ? "active" : ""}
//         >
//           mobile-app
//         </a>
//         <a
//           href="#food-display"
//           onClick={() => setMenu("food-display")}
//           className={menu === "food-display" ? "active" : ""}
//         >
//           food-display
//         </a>
//         <a
//           href="#footer"
//           onClick={() => setMenu("contact-us")}
//           className={menu === "contact-us" ? "active" : ""}
//         >
//           contact-us
//         </a>
//       </ul>
//       <div className="navbar-right">
//         <img src={assets.search_icon} alt="" />
//         <Link to="/cart" className="navbar-search-icon">
//           <img src={assets.basket_icon} alt="" />
//           <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
//         </Link>
//         {!token ? (
//           <button onClick={() => setShowLogin(true)}>sign in</button>
//         ) : (
//           <div className="navbar-profile">
//             <img src={assets.profile_icon} alt="" />
//             <ul className="navbar-profile-dropdown">
//               <li>
//                 <img src={assets.bag_icon} alt="" />
//                 <p>Orders</p>
//               </li>
//               <hr />
//               <li>
//                 <img src={assets.logout_icon} alt="" />
//                 <p>Logout</p>
//               </li>
//             </ul>
//           </div>
//         )}
//         <DropdownButton id="dropdown-basic-button" title="Dropdown">
//           <Dropdown.Item as={Link} to="/cart">
//             cart
//           </Dropdown.Item>
//           <Dropdown.Item as={Link} to="/order">
//             order
//           </Dropdown.Item>
//           <Dropdown.Item as={Link} to="/">
//             Trang chu
//           </Dropdown.Item>
//         </DropdownButton>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
