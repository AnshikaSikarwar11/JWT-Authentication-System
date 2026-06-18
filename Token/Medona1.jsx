import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Medona1.css";

const Medona1 = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/register",
        {
          name,
          password: pass,
        }
      );

      console.log(res.data);
      alert("Registered Successfully");

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPass(e.target.value)}
      />

      <button onClick={register}>
        Register
      </button>
    </div>
  );
};

export default Medona1;