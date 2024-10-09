import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";

import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import "./Navbar.css";
import { setCurrentUser } from "../../actions/currentUser";
import bars from "../../assets/bars-solid.svg";

const Navbar = ({ handleSlideIn }) => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("Profile"); // Clear user profile on logout
    navigate("/"); // Redirect to home page
    dispatch(setCurrentUser(null)); // Clear user state
  }, [dispatch, navigate]); // Add dispatch and navigate as dependencies

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      } else {
        // Set user from localStorage if token is valid
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
      }
    }
  }, [User?.token, handleLogout, dispatch]); // Include handleLogout

  return (
    <nav className="main-nav">
      <div className="navbar">
        <button
          className="slide-in-icon"
          onClick={handleSlideIn}
          aria-label="Toggle menu"
        >
          <img src={bars} alt="menu" width="15" />
        </button>
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn res-nav">About</Link>
          <Link to="/" className="nav-item nav-btn res-nav">Products</Link>
          <Link to="/" className="nav-item nav-btn res-nav">For Teams</Link>
          <form>
            <input type="text" placeholder="Search..." aria-label="Search" />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
          {User === null || User?.result === undefined ? (
            <Link to="/Auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Link
                to={`/Users/${User?.result?._id}`}
                style={{ color: "white", textDecoration: "none" }}
                aria-label="User profile"
              >
                <Avatar
                  backgroundColor="#009dff"
                  px="10px"
                  py="7px"
                  borderRadius="50%"
                  color="white"
                >
                  {User.result.name?.charAt(0).toUpperCase()}
                </Avatar>
                <span className="user-name">{User.result.name}</span> {/* Display the user's name */}
              </Link>
              <button
                className="nav-item nav-links"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
