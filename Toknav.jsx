import React from "react";
import { Link } from "react-router-dom";
import "./Toknav.css";

export const Toknav = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/register">Register</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/dash">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};