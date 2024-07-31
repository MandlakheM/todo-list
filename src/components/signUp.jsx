import React from "react";
import "./logIn.css";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

// import {  useRouter } from 'react-router-dom'

function SignUp() {
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
    id: dayjs(),
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      currentUser.username.trim() !== "" &&
      currentUser.password.trim() !== ""
    ) {
      setUser((prevUser) => [...prevUser, currentUser]);
      setCurrentUser({
        username: "",
        password: "",
      });
      axios
        .post("http://localhost:3030/users", currentUser)
        .then((res) => {
          alert("Data added successfully!");
        })
        .catch((err) => console.log(err));
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
                onChange={handleChange}
                required={true}
              />
              <input
                type="password"
                name="password"
                id=""
                onChange={handleChange}
                placeholder="password"
                required={true}
              />
              <button>Sign Up</button>
              <p>
                Already have an account ? <a href="">Sign In</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
