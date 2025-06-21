import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/AuthForm.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  // console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/signup`, formData);
      if (res?.data?.success) {
        alert(res?.data?.message);
        navigate("/login");
      } else {
        alert(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-bg">
      <form onSubmit={handleSubmit} className="auth-glass">
        <h1 className="auth-title">Sign Up</h1>
        <div className="flex flex-col">
          <label htmlFor="username" className="auth-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="auth-input"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="auth-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="auth-input"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="auth-input"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="auth-label">
            Address
          </label>
          <textarea
            maxLength={200}
            id="address"
            className="auth-textarea"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="auth-label">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="auth-input"
            onChange={handleChange}
            required
          />
        </div>
        <Link to="/login" className="auth-link">
          Have an account? Login
        </Link>
        <button className="auth-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
