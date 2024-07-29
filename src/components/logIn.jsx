import React from "react";
import "./logIn.css";
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
// import { useRouter } from 'next/navigation';
// import {  useRouter } from 'react-router-dom'
import { SignInButton } from '@clerk/clerk-react';



function LogIn() {

  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        email_address: email,
        password,
      });
    } catch (err) {
      console.error(err);
    }
  };


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
              {/* <button type="submit">Sign In</button> */}

              <p>Don't have an account? <a href="">Sign Up</a></p>
            </form>
            <SignInButton mode="modal" redirectUrl="/todo"/>

          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
