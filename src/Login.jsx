import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usersData from "./Users.json";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || usersData;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", user.username);
      navigate("/products");
    } else {
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-visual">
          <div className="auth-visual-inner">
            <span className="eyebrow">Welcome back</span>
            <h1>Shop smarter. Live beautifully.</h1>
            <p>
              Discover premium picks, new arrivals, and everyday essentials made
              for your lifestyle.
            </p>

            <ul className="auth-highlights">
              <li>Fast checkout</li>
              <li>Exclusive deals</li>
              <li>Free shipping above $50</li>
            </ul>
          </div>
        </div>

        <div className="auth-form-wrap">
          <div className="auth-header">
            <span className="logo auth-logo">ShopEase</span>
            <h2>Login</h2>
            <p>Access your account</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth-row">
              <label className="checkbox-wrap">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>

          {message && (
            <p className={`auth-message ${message.includes("Invalid") ? "error" : "success"}`}>
              {message}
            </p>
          )}

          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;