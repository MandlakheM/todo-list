import React from "react";
import "./logIn.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";




function LogIn() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 


  return (
    <>
      <div className="wrapper">
        <div className="logInContainer">
          <div className="headings">
            <p>Welcome</p>
            <br />
            <p>Sign In to create your own personalized to-do list.</p>
          </div>
          {/* <div className="googleSignIn">Sign In with google</div> */}
          <div className="formContainer">
            <form  >
              <input
                type="email"
                name="email"
                id="username"
                placeholder="username"
                onChange={(e) => setEmail(e.target.value)}
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
              <p>Don't have an account? <a href="">Sign Up</a></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
