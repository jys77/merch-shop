import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../actions";

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
    @media (min-width: 768px) {
      display: none;
    }
    background-color: #fff;
    position: fixed;
    top: 60px;
    width: 15rem;
    height: 100%;
    transition: all 0.3s ease-in-out;
    transform: translateX(-15rem);
  }
  .open {
    transform: translateX(0rem);
  }
`;

export const Sidebar = () => {
  const { show } = useSelector((state) => state.sidebarToggle);
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

  return (
    <SidebarWrapper>
      <div
        className={overlayClasses.join(" ")}
        onClick={() => dispatch(toggleSidebar())}
      />
      <div className={sidebarClasses.join(" ")}></div>
    </SidebarWrapper>
  );
};
