import React from "react";
import "./logIn.css";

function LogIn() {


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
            <form action="">
              <input
                type="email"
                name="username"
                id="username"
                placeholder="username"
              />
              <input
                type="password"
                name="password"
                id=""
                placeholder="password"
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
