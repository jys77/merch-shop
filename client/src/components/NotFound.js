import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundWrapper = styled.div`
  width: 100%;
  height: 100%;
  .not-found {
    margin-top: 40vh;
    margin-bottom: 60vh;
    display: flex;
    flex-flow: column;
    align-items: center;
    @media (max-width: 767px) {
      padding: 1rem;
      margin-top: 20vh;
      margin-bottom: 30vh;
    }
    div:nth-child(1) {
      font-family: "Poppins", sans-serif;
      font-size: 5rem;
      font-weight: 500;
      margin-bottom: 2rem;
    }
    div:nth-child(2) {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
    div:nth-child(3) {
      font-size: 1.5rem;
      width: 210px;
      height: 50px;
      border: 1px solid rgb(28, 25, 25);
      text-align: center;
      line-height: 45px;
      color: #fff;
      background-color: rgb(28, 25, 25);
      a {
        text-decoration: none;
        color: #fff;
      }
      :hover {
        cursor: pointer;
        background-color: #fff;
        color: black;
        font-weight: 500;
        a {
          text-decoration: none;
          color: black;
        }
      }
    }
  }
`;

export const NotFound = () => {
  return (
    <NotFoundWrapper>
      <div className="not-found">
        <div>Error: 404</div>
        <div>Oops! Something went wrong...</div>
        <div>
          <Link to="/">Go Homepage</Link>
        </div>
      </div>
    </NotFoundWrapper>
  );
};
