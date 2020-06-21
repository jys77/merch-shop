import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { toggleSidebar, fetchCategories } from "../../actions";
import { logout } from "../../actions";

const SidebarWrapper = styled.div`
  .sidebar-overlay {
    display: none;
    @media (max-width: 767px) {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .sidebar-menu {
    z-index: 1000;
    @media (min-width: 768px) {
      display: none;
    }
    background-color: #fff;
    position: fixed;
    top: 60px;
    width: 15rem;
    height: 100%;
    transition: transform 0.7s;
    transform: translateX(-15rem);
  }
  .open {
    transform: translateX(0rem);
  }
  .sidebar-container {
    font-family: "Poppins", sans-serif;
    padding: 2rem;
    display: flex;
    flex-flow: column;
    .log-in-or-sign-in {
      text-decoration: none;
      color: black;
      font-size: 1.5rem;
      text-align: center;
      border-bottom: 0.1rem #c0c0c0 solid;
      margin-bottom: 2rem;
    }
    ul {
      list-style: none;
      font-size: 1.5rem;
      li {
        margin-bottom: 1rem;
        a {
          text-decoration: none;
          color: black;
          &:active,
          &.active {
            font-weight: 700;
          }
        }
      }
    }
    .log-out {
      position: absolute;
      bottom: 6rem;
      a {
        text-decoration: none;
        color: black;
        font-size: 1.2rem;
        font-family: "Roboto", sans-serif;
      }
    }
  }
`;

export const Sidebar = () => {
  const { show } = useSelector((state) => state.sidebarToggle);
  const { categories, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  let sidebarClasses = ["sidebar-menu"];
  let overlayClasses = [""];
  if (show) {
    overlayClasses = ["sidebar-overlay"];
    sidebarClasses = ["sidebar-menu", "open"];
  } else {
    overlayClasses = [""];
    sidebarClasses = ["sidebar-menu"];
  }

  const dispatchCategories = useDispatch();

  useEffect(() => {
    dispatchCategories(fetchCategories());
  }, [dispatchCategories]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <SidebarWrapper>
      <div
        className={overlayClasses.join(" ")}
        onClick={() => dispatch(toggleSidebar())}
      />
      <div className={sidebarClasses.join(" ")}>
        <div className="sidebar-container">
          <Link
            to={Cookie.getJSON("userInfo") ? "/profile" : "/signin"}
            className="log-in-or-sign-in"
            onClick={() => dispatch(toggleSidebar())}
          >
            {Cookie.getJSON("userInfo") ? "My Account" : "Log in / Sign in"}
          </Link>
          <ul>
            <li>
              <NavLink exact to="/" onClick={() => dispatch(toggleSidebar())}>
                All Product
              </NavLink>
            </li>
            {error
              ? null
              : categories
              ? categories.map((cat) => (
                  <li key={cat} onClick={() => dispatch(toggleSidebar())}>
                    <NavLink to={"/category/" + cat}>{cat}</NavLink>
                  </li>
                ))
              : null}
          </ul>
          {Cookie.getJSON("userInfo") ? (
            <div
              className="log-out"
              onClick={() => {
                logoutHandler();
                dispatch(toggleSidebar());
              }}
            >
              <Link to="/">Log Out</Link>
            </div>
          ) : null}
        </div>
      </div>
    </SidebarWrapper>
  );
};
