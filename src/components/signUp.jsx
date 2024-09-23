import React from "react";
import "./logIn.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function SignUp({ db }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userId = dayjs();

  // const [currentUser, setCurrentUser] = useState({
  //   username: "",
  //   password: "",
  //   userId: dayjs(),
  // });

  const navigate = useNavigate();

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   setCurrentUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // }

  function handleSubmit(event) {
    event.preventDefault();

    if (username.trim() !== "" && password.trim() !== "") {
      if (db) {
        try {
          db.run(
            `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`
          );
          alert("Registration successful");
          navigate("/");
        } catch (error) {
          alert("Registration failed. Username may already exist.");
        }
      } else {
        alert("Database not initialized");
      }
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="logInContainer">
          <div className="headings">
            <p>Welcome</p>
            <br />
            <p>Enter your details to Sign Up.</p>
          </div>
          {/* <div className="googleSignIn">Sign In with google</div> */}
          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="username"
                id="username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                required={true}
              />
              <input
                type="password"
                name="password"
                id=""
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required={true}
              />
              <button>Sign Up</button>
              <p>
                Already have an account ?<Link to={"/"}>Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
