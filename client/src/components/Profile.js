import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Route, NavLink, Redirect } from "react-router-dom";
import Cookie from "js-cookie";
import { logout } from "../actions";
import { Account } from "./account/Account";
import { OrderList } from "./account/OrderList";
const ProfileWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 1rem;
  .menu {
    width: 25%;
    font-size: 1rem;
    @media (max-width: 767px) {
      font-size: 0.7rem;
    }
    ul {
      list-style: none;
      font-family: "Poppins", sans-serif;
      li {
        margin-bottom: 1.5rem;
        a {
          text-decoration: none;
          color: black;
          &.active,
          &:active {
            font-weight: 700;
          }
        }
      }
    }
  }
  .content {
    width: 75%;
  }
`;

export const Profile = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return !Cookie.getJSON("userInfo") ? (
    <Redirect to="/signin" />
  ) : (
    <ProfileWrapper>
      <div className="menu">
        <ul>
          <li>
            <NavLink exact to="/profile">
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/orders">My Orders</NavLink>
          </li>
          <li onClick={logoutHandler}>
            <NavLink exact to="/">
              Log out
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="content">
        <Route path="/profile/" exact component={Account} />
        <Route path="/profile/orders" component={OrderList} />
      </div>
    </ProfileWrapper>
  );
};
