import React, { useState } from "react";
import "./Auth.css";

import { signup, login } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("manufacturer");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    if(isSignup === false){
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (!email && !password) {
      alert("Enter email and password");
      setLoading(false);
    }

    // passing the input data to actions/auth.js
    if (isSignup) {
      setLoading(true);

      // console.log(userType)

      dispatch(signup({ email, password, userType, address }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container-2">
        {isSignup ? <h2>SignUp Page</h2> : <h2>Login Page</h2>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>

          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>

          {isSignup && (
            <label htmlFor="User Type">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>User Type</h4>
              </div>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="manufacturer">Manufacturer</option>
                <option value="transporter">Transporter</option>
              </select>
            </label>
          )}

          {isSignup && userType === "manufacturer" && (
            <label htmlFor="Address">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Address</h4>
              </div>
              <input
                type="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          )}

          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
            {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
          </button>
        </form>

        <p>
          {isSignup ? "Already have an account?" : "Don't have an account"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
