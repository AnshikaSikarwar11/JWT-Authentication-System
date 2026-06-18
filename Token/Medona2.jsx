import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Medona2.css";

const Medona2 = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        name: name,
        password: pass,
      });

      if (res.data && res.data.success) {
        localStorage.setItem("token", res.data.token);

        alert("Login Successfully");

        navigate("/dash");
      } else {
        alert(res.data.message || "Login Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
};

export default Medona2;