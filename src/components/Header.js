import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { cartReducer } from "./../redux/cartReducer";
import { useSelector } from "react-redux";
import { FaCartPlus, FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GoListUnordered } from "react-icons/go";
function Header() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { user } = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : [];
  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            e-commerce Dev
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <FaBars size={25} color="white" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active nav_user"
                  aria-current="page"
                >
                  <FaUserAlt />{" "}
                  {user.email.substring(0, user.email.length - 10)}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={logout}>
                  <FiLogOut /> Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link">
                  <GoListUnordered /> Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FaCartPlus /> {cartItems.length}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
