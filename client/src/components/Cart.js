import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../actions";

const CartWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Cart = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const { cartItems, error } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  return (
    <CartWrapper>
      <div>Cart</div>
    </CartWrapper>
  );
};
