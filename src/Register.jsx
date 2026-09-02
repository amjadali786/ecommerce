import { useState } from "react";
import { Link } from "react-router-dom";
import usersData from "./Users.json";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    contact: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { firstName, lastName, dob, address, contact, username, password } = formData;

    if (!firstName || !lastName || !dob || !address || !contact || !username || !password) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || usersData || [];
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      setMessage("Username already exists.");
      return;
    }

    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      dob,
      address,
      contact,
      username,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Registration successful!");
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      address: "",
      contact: "",
      username: "",
      password: "",
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-visual">
          <div className="auth-visual-inner">
            <span className="eyebrow">Join us</span>
            <h1>Start your style journey.</h1>
            <p>
              Create an account to save favorites, track orders, and unlock
              member-only offers.
            </p>

            <ul className="auth-highlights">
              <li>Member pricing</li>
              <li>Saved wishlists</li>
              <li>Exclusive early access</li>
            </ul>
          </div>
        </div>

        <div className="auth-form-wrap">
          <div className="auth-header">
            <span className="logo auth-logo">ShopEase</span>
            <h2>Register</h2>
            <p>Create your new account</p>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="register-firstName">First Name</label>
                <input
                  id="register-firstName"
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-lastName">Last Name</label>
                <input
                  id="register-lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="register-dob">Date of Birth</label>
              <input
                id="register-dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-address">Address</label>
              <input
                id="register-address"
                type="text"
                name="address"
                placeholder="Street address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-contact">Contact</label>
              <input
                id="register-contact"
                type="tel"
                name="contact"
                placeholder="Phone number"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-username">Username</label>
              <input
                id="register-username"
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="auth-button">
              Register
            </button>
          </form>

          {message && (
            <p className={`auth-message ${message.includes("exists") || message.includes("Please") ? "error" : "success"}`}>
              {message}
            </p>
          )}

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;