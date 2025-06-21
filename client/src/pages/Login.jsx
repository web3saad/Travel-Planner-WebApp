import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import "./styles/AuthForm.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      dispatch(loginStart());
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.success) {
        dispatch(loginSuccess(data?.user));
        alert(data?.message);
        navigate("/");
      } else {
        dispatch(loginFailure(data?.message));
        alert(data?.message);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log(error);
    }
  };

  return (
    <div className="auth-bg">
      <form onSubmit={handleSubmit} className="auth-glass">
        <h1 className="auth-title">Login</h1>
        <div className="flex flex-col">
          <label htmlFor="email" className="auth-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="auth-input"
            onChange={handleChange}
            autoComplete="username"
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
            autoComplete="current-password"
            required
          />
        </div>
        <Link to="/signup" className="auth-link">
          Don't have an account? Signup
        </Link>
        <button
          disabled={loading}
          className="auth-btn"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        {error && <p className="auth-error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
