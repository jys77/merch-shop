import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { saveShipping } from "../actions";
import { countryList } from "../constants";

const ShippingWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  .shipping-header {
    font-size: 1.5rem;
    font-family: "Roboto", sans-serif;
    color: #3d4852;
  }
  .shipping-container {
    display: flex;
    flex-flow: row;
    margin-top: 2rem;
    @media (max-width: 767px) {
      flex-flow: column;
    }
    .shipping-left {
      font-family: "Roboto", sans-serif;
      width: 66.666667%;
      @media (max-width: 767px) {
        width: 100%;
      }
      .shipping-form {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid black;
        padding: 2rem;
        justify-content: space-between;
        .shipping-text {
          font-family: "Poppins", sans-serif;
          font-size: 1.2rem;
          width: 100%;
          margin-top: 0.5rem;
        }
        .shipping-input {
          flex: 0 0 66%;
          max-width: 66%;
          border: 1px solid black;
          height: 40px;
          padding: 1rem 0.5rem;
          margin-top: 0.8rem;
          margin-bottom: 0.8rem;
          box-shadow: none;
          -webkit-appearance: none;
          outline: none;
          border-radius: 0;
          @media (max-width: 767px) {
            flex: 0 0 100%;
            width: 100%;
            max-width: 100%;
          }
        }
        .shipping-input-s {
          flex: 0 0 33%;
          max-width: 33%;
          border: 1px solid black;
          height: 40px;
          padding: 1rem 0.5rem;
          margin-top: 0.8rem;
          margin-bottom: 0.8rem;
          box-shadow: none;
          -webkit-appearance: none;
          outline: none;
          border-radius: 0;
          @media (max-width: 767px) {
            flex: 0 0 100%;
            width: 100%;
            max-width: 100%;
          }
        }
        .shipping-select {
          flex: 0 0 66%;
          max-width: 66%;
          border: 1px solid black;
          height: 40px;
          margin-top: 0.8rem;
          margin-bottom: 0.8rem;
          box-shadow: none;
          outline: none;
          border-radius: 0;
          @media (max-width: 767px) {
            flex: 0 0 100%;
            width: 100%;
            max-width: 100%;
          }
        }
        .shipping-button {
          cursor: pointer;
          flex: 0 0 66%;
          max-width: 66%;
          border: 1px solid black;
          height: 40px;
          line-height: 40px;
          color: #fff;
          background-color: rgb(28, 25, 25);
          margin-top: 0.8rem;
          margin-bottom: 0.8rem;
          @media (max-width: 767px) {
            flex: 0 0 100%;
            width: 100%;
            max-width: 100%;
          }
          &:hover {
            background-color: #fff;
            font-weight: 700;
            color: black;
          }
        }
      }
    }
    .shipping-right {
      width: 33.333333%;
      border: 1px solid black;
      display: flex;
      flex-flow: column;
      font-family: "Roboto", sans-serif;
      padding: 2rem;
      height: 230px;
      @media (max-width: 767px) {
        width: 100%;
        margin-top: 1.3rem;
      }
      @media (min-width: 768px) {
        margin-left: 2rem;
      }
      .shipping-left-info {
        display: flex;
        justify-content: space-between;
        font-size: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px #f1f5f8 solid;
        margin-top: 1rem;
      }
      .shipping-left-total {
        display: flex;
        justify-content: space-between;
        font-weight: 700;
        font-size: 1.3rem;
        padding-bottom: 1rem;
        border-bottom: 1px #f1f5f8 solid;
        margin-top: 1rem;
      }
    }
  }
`;

export const Shipping = (props) => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [addressMain, setAddressMain] = useState(null);
  const [addressOpt, setAddressOpt] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [country, setCountry] = useState("Canada");
  const [postal, setPostal] = useState(null);
  const fullAddress = `${addressMain}, ${
    addressOpt ? `${addressOpt}, ` : ""
  }${city}, ${province}, ${postal}, ${country}`;

  const { cartItems } = useSelector((state) => state.cart);

  const itemsPrice = cartItems.reduce((a, b) => a + b.qty * b.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ email, name, fullAddress }));
    props.history.push("/payment");
  };

  return (
    <ShippingWrapper>
      <div className="shipping-header">Shipping Address</div>
      <div className="shipping-container">
        <div className="shipping-left">
          <form onSubmit={submitHandler} className="shipping-form">
            <div className="shipping-text">Contact Information</div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="shipping-input"
              name="email"
              placeholder="E-Mail"
              id="email"
              required
            />
            <div className="shipping-text">Shipping Information</div>
            <input
              onChange={(e) => setName(e.target.value)}
              className="shipping-input"
              name="name"
              placeholder="Full Name"
              id="name"
              required
            />
            <input
              onChange={(e) => setAddressMain(e.target.value)}
              className="shipping-input"
              name="address_1"
              placeholder="Street Address"
              id="address_1"
              required
            />
            <input
              onChange={(e) => setAddressOpt(e.target.value)}
              className="shipping-input-s"
              name="address_2"
              placeholder="Address 2(Opt.)"
              id="address_2"
            />
            <select
              className="shipping-select"
              name="country"
              id="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              {countryList.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <input
              onChange={(e) => setPostal(e.target.value)}
              className="shipping-input-s"
              name="postal"
              placeholder="Zip/Postal Code"
              id="postal"
              required
            />
            <input
              onChange={(e) => setCity(e.target.value)}
              className="shipping-input"
              name="city"
              placeholder="City"
              id="city"
              required
            />
            <input
              onChange={(e) => setProvince(e.target.value)}
              className="shipping-input-s"
              name="province"
              placeholder="State/Province"
              id="province"
              required
            />
            <button className="shipping-button" type="submit">
              Proceed To Payment
            </button>
          </form>
        </div>
        <div className="shipping-right">
          <div className="shipping-left-info">
            <div>Subtotal</div>
            <div>$ {itemsPrice}</div>
          </div>
          <div className="shipping-left-info">
            <div>Shipping</div>
            <div>$ {shippingPrice}</div>
          </div>
          <div className="shipping-left-total">
            <div>Total</div>
            <div>$ {totalPrice}</div>
          </div>
        </div>
      </div>
    </ShippingWrapper>
  );
};
