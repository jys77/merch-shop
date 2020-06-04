import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 3rem;
  background-color: #1e1e1e;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    margin-top: 80px;
  }
  @media (max-width: 767px) {
    margin-top: 60px;
  }
`;

export const Footer = () => {
  return <FooterWrapper>Designed & made by Yunsheng</FooterWrapper>;
};
