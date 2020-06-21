import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 3rem;
  background-color: #1e1e1e;
  color: #fff;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  @media (min-width: 768px) {
    margin-top: 80px;
  }
  @media (max-width: 767px) {
    margin-top: 60px;
  }
  div:nth-child(1) {
    a {
      text-decoration: none;
      color: #348ac7;
    }
    @media (max-width: 767px) {
      display: none;
    }
  }
  div:nth-child(2) {
    span {
      color: red;
    }
  }
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <div>
        Welcome to star or fork it on{" "}
        <a href="https://github.com/jys77/merch-shop" target="_blank">
          GitHub
        </a>
        , and feel free to create issues or pull requests.
      </div>
      <div>
        Designed & Made with <span>♥</span> by Yunsheng
      </div>
    </FooterWrapper>
  );
};
