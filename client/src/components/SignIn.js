import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../actions";
const SignInWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .signin {
    border: 2px solid black;
    padding: 1rem;
    width: 400px;
    height: 400px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    font-family: "Roboto", sans-serif;
    @media (max-width: 767px) {
      width: 300px;
      margin: 100px auto 140px auto;
    }
    @media (min-width: 768px) {
      margin: 150px auto 200px auto;
    }
    &-head {
      justify-self: flex-start;
      font-size: 1.5rem;
    }
    &-text {
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    &-email {
      margin-top: 3rem;
      input {
        height: 40px;
        box-shadow: none;
        -webkit-appearance: none;
        outline: none;
        border-radius: 0;
        border: 1px solid black;
        padding: 10px 16px;
      }
    }
    &-password {
      margin-top: 2rem;
      input {
        height: 40px;
        box-shadow: none;
        -webkit-appearance: none;
        outline: none;
        border-radius: 0;
        border: 1px solid black;
        padding: 10px 16px;
      }
    }
    &-button {
      height: 40px;
      margin-top: 2rem;
      border: 1px solid black;
      width: 80.5%;
      height: 37px;
      background-color: rgb(28, 25, 25);
      color: #fff;
      text-align: center;
      line-height: 37px;
      @media (min-width: 768px) {
        width: 59.5%;
      }
    }
    &-tip {
      margin-top: 1rem;
      font-size: 0.8rem;
    }
  }
`;

export const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector((state) => state.signIn);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  });

  return (
    <SignInWrapper>
      <form onSubmit={submitHandler} className="signin">
        <div className="signin-head">Welcome back.</div>
        <div className="signin-text">Please sign in</div>
        <div className="signin-email">
          <input
            type="email"
            placeholder="E-Mail"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signin-password">
          <input
            type="password"
            placeholder="Password"
            id="password"
            email="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="signin-button">
          Sign In
        </button>
        <div className="signin-tip">Don't have an account? Register</div>
      </form>
    </SignInWrapper>
  );
};
