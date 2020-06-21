import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Home } from "../Home";
import { Product } from "../Product";
import { Cart } from "../Cart";
import { SignIn } from "../SignIn";
import { Register } from "../Register";
import { Shipping } from "../Shipping";
import { Payment } from "../Payment";
import { Order } from "../Order";
import { Profile } from "../Profile";
import { NotFound } from "../../components/NotFound";

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
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/category/:category" component={Home} />
        <Route path="/product/:id" component={Product} />
        <Route path="/cart/:id?" component={Cart} />
        <Route path="/signin" component={SignIn} />
        <Route path="/register" component={Register} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/payment" component={Payment} />
        <Route path="/order/:id" component={Order} />
        <Route path="/profile" component={Profile} />
        <Route path="*" component={NotFound} />
      </Switch>
    </ContentWrapper>
  );
};
