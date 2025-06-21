import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfileImg from "../../assets/images/profile.png";
import "../styles/Header.css";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="header-navbar">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <span>Travel Planner</span>
        </Link>
        <ul className="header-navlinks">
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`/search`}>Packages</Link>
          </li>
          <li>
            <Link to={`/about`}>About</Link>
          </li>
          <li>
            {currentUser ? (
              <Link
                to={`/profile/${currentUser.user_role === 1 ? "admin" : "user"}`}
              >
                <img
                  src={currentUser.avatar || defaultProfileImg}
                  alt={currentUser.username}
                  className="header-profile"
                />
              </Link>
            ) : (
              <Link to={`/login`}>Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
