import React from "react";
import "./logIn.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (username.trim() !== "" && password.trim() !== "") {
      fetch(`http://localhost:3030/users?email=${username}`)
        .then((res) => res.json())
        .then((resp) => {
          if (resp.length > 0 && resp[0].password === password) {
            toast.success("Success");
            sessionStorage.setItem("username", username);
            navigate("/todo");
          } else {
            toast.error("Please Enter valid credentials");
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  }

  return (
    <>
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
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                required={true}
              />
              <input
                type="password"
                name="password"
                id=""
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
              <button>Sign In</button>
              <p>
                Don't have an account? <Link to={"/signUp"}>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
