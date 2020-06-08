import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Home } from "../Home";
import { Product } from "../Product";
import { Cart } from "../Cart";
import { SignIn } from "../SignIn";
import { Register } from "../Register";

const ContentWrapper = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  @media (min-width: 768px) {
    margin-top: 100px;
  }
  @media (max-width: 767px) {
    margin-top: 80px;
  }
`;

export const Content = () => {
  return (
    <ContentWrapper>
      <Sidebar />
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" component={Product} />
      <Route path="/cart/:id?" component={Cart} />
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Register} />
    </ContentWrapper>
  );
};
