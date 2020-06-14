import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../actions";
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #1e1e1e;
  z-index: 1000;
  max-height: 60px;

  @media (min-width: 768px) {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
  .HeaderContainer {
    margin: 0.9rem auto;
    max-width: 1440px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    .button {
      margin-left: 1rem;
      font-size: 2rem;
      color: #fff;
      cursor: pointer;
      @media (min-width: 768px) {
        display: none;
      }
    }

    .logo {
      margin-left: 15px;
      margin-right: 15px;
      text-align: center;

      a {
        font-family: "Poppins", sans-serif;
        font-size: 2rem;
        color: #fff;
        text-decoration: none;
      }
    }
    .right-section {
      display: flex;
      justify-content: space-around;
      height: 100%;
      align-items: center;
      margin-right: 5px;
      a {
        color: #fff;
        margin: 0 15px;
        svg {
          height: 1.7rem;
          width: 1.7rem;
        }
      }
      a.account {
        @media (max-width: 767px) {
          display: none;
        }
      }
      a.cart-container {
        position: relative;
        .badge {
          position: absolute;
          top: 0;
          right: -8px;
          font-size: 0.7rem;
          background-color: red;
          color: #fff;
          width: 0.8rem;
          height: 0.8rem;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          border-radius: 50%;
        }
      }
    }
  }
`;

export const Header = () => {
  const dispatch = useDispatch();
  const userInfo_SignIn = useSelector((state) => state.register).userInfo;
  const userInfo_Register = useSelector((state) => state.signIn).userInfo;
  const userInfo = userInfo_SignIn || userInfo_Register;

  const [badgeNum, setBadgeNum] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (cartItems) {
      const cartNum = cartItems.reduce(
        (a, b) => parseInt(a) + parseInt(b.qty),
        0
      );
      setBadgeNum(cartNum);
    }
  }, [cartItems]);

  return (
    <HeaderWrapper>
      <div className="HeaderContainer">
        <div className="button" onClick={() => dispatch(toggleSidebar())}>
          ☰
        </div>
        <div className="logo">
          <Link to="/">Merch Shop</Link>
        </div>
        <div className="right-section">
          <Link to={userInfo ? "/profile" : "/signin"} className="account">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <title>My Account</title>
              <path
                fill="white"
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
              ></path>
            </svg>
          </Link>
          <Link to="/cart" className="cart-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <title>Shopping Cart</title>
              <path
                fill="white"
                d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
              ></path>
            </svg>
            {badgeNum ? <div className="badge">{badgeNum}</div> : null}
          </Link>
        </div>
      </div>
    </HeaderWrapper>
  );
};
