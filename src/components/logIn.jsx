import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./logIn.css";

function LogIn({ db, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
    localStorage.clear();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() !== "" && password.trim() !== "") {
      if (db) {
        const result = db.exec(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`);
        if (result.length > 0) {
          setUser(result[0].values[0]);
          navigate('/todo');
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('Database not initialized');
      }
    } else {
      toast.error("Username and password cannot be empty");
    }
  };

  return (
    <div className="wrapper">
      <div className="logInContainer">
        <div className="headings">
          <p>Welcome</p>
          <br />
          <p>Sign In to create your own personalized to-do list.</p>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
            <p>
              Don't have an account? <Link to="/signUp">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
