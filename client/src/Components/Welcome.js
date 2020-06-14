import React from "react";
import { NavLink } from "react-router-dom";
import TokenService from "../Services/token-service";

export default function Welcome() {
  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  const renderLogoutLink = () => {
    return (
      <div className="Welcome">
        <div className="Welcome__name">
          Welcome, <span>Kimberly</span>
        </div>
        <div className="Welcome__nav">
          <ul>
            <li>
              <NavLink to="/" onClick={handleLogoutClick}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderLoginLink = () => {
    return (
      <div className="Welcome">
        <div className="Welcome__name">Welcome</div>
        
        <div className="Welcome__nav">
          <ul>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/registration">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>{TokenService.hasAuthToken() ? renderLogoutLink() : renderLoginLink()}</>
  );
}
