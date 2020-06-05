import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { fetchProductDetail } from "../actions";
import { Link } from "react-router-dom";

const ProductWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-flow: row;
  width: 100%;
  @media (max-width: 767px) {
    flex-flow: column;
  }
  .product-left {
    width: 66.66%;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    @media (max-width: 767px) {
      width: 100%;
    }
    &-nav {
      margin-left: 1rem;
      margin-bottom: 5rem;
      span {
        &:nth-child(1) {
          a {
            text-decoration: none;
            color: black;
            font-size: 1rem;
          }
        }
        &:nth-child(2) {
          color: #8795a1;
          font-size: 1rem;
        }
        &:nth-child(3) {
          color: #8795a1;
          font-size: 1rem;
        }
      }
    }
    &-image {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      width: 90%;
      img {
        width: 100%;
      }
    }
  }
  .product-right {
    font-family: "Poppins", sans-serif;
    width: 33.33%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    @media (max-width: 767px) {
      margin-top: 3rem;
      padding: 1rem;
      width: 100%;
    }
    &-name {
      font-size: 1.5rem;
      color: #8795a1;
      margin-top: 1rem;
    }
    &-desc {
      font-family: sans-serif;
      font-size: 1rem;
      color: #3d4852;
      margin-top: 1rem;
      max-width: 50%;
      @media (max-width: 767px) {
        max-width: 100%;
      }
    }
    &-price {
      font-size: 2rem;
      color: #22292f;
      margin-top: 1rem;
    }
    &-stock {
      font-size: 1rem;
      color: #3d4852;
      margin-top: 1rem;
    }
    &-cart {
      font-size: 1rem;
      margin-top: 1rem;
      display: flex;
      .count {
        select {
          -webkit-appearance: none;
          background-color: white;
          border: 1px solid #6e7073;
          border-radius: 2px;
          color: #45474c;
          cursor: default;
          outline: none;
          padding: 8px 30px 8px 10px;
        }
      }
      .add-to-cart {
        margin-left: 1rem;
        width: 35%;
        outline: none;
        font-size: 1rem;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background-color: #172480;
        border-color: #172480;
      }
    }
  }
`;

export const Product = (props) => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  useEffect(() => {
    dispatch(fetchProductDetail(props.match.params.id));
    return () => {};
  }, [dispatch, props.match.params.id]);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    { error }
  ) : (
    <ProductWrapper>
      <div className="product-left">
        <div className="product-left-nav">
          <span>
            <Link to="/">Home</Link>
          </span>
          <span> >> </span>
          <span>{product.category}</span>
        </div>
        <div className="product-left-image">
          <img src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="product-right">
        <div className="product-right-name">{product.name}</div>
        <div className="product-right-desc">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <br />
          <p>
            Ut enimadminim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="product-right-price">$ {product.price}</div>
        <div className="product-right-stock">
          {product.countInStock > 0 ? "In Stock" : "Sold Out"}
        </div>
        {product.countInStock > 0 ? (
          <div className="product-right-cart">
            <div className="count">
              <select>
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="add-to-cart">
              <p>Add To Cart</p>
            </div>
          </div>
        ) : null}
      </div>
    </ProductWrapper>
  );
};
