import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, cleanCart } from "../actions";
const PaymentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  .payment-header {
    font-size: 1.5rem;
    font-family: "Roboto", sans-serif;
    color: #3d4852;
  }
  .payment-container {
    font-family: "Roboto", sans-serif;
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 768px) {
      justify-content: space-between;
    }
    .payment-left {
      display: flex;
      flex-flow: column;
      width: 66%;
      @media (max-width: 767px) {
        width: 100%;
      }
      .left-card {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        border: 1px solid black;
        padding: 1rem;
        display: flex;
        flex-flow: column;
        .card-header {
          font-size: 1.2rem;
        }
        .shipping-address {
          margin-top: 1rem;
          display: flex;
          flex-flow: column;
          justify-content: flex-start;
          line-height: 1.5rem;
        }
        .payment-method {
          display: flex;
          flex-flow: column;
          .paypal {
            margin-top: 1rem;
            span {
              margin-left: 1rem;
            }
          }
        }
        .review {
          margin-top: 1rem;
          display: flex;
          flex-flow: column;
          .item {
            margin-top: 0.5rem;
            display: flex;
            padding-bottom: 0.5rem;
            border-bottom: 1px #f1f5f8 solid;
            .image {
              width: 80px;
              height: 80px;
              vertical-align: center;
              img {
                width: 100%;
              }
            }
            .desc {
              margin-left: 1rem;
              display: flex;
              flex-flow: column;
              align-items: flex-start;
              div:nth-child(1) {
                font-size: 1rem;
              }
              div:nth-child(2) {
                font-weight: 500;
                margin-top: 0.3rem;
                font-size: 1.2rem;
              }
              div:nth-child(3) {
                margin-top: 0.3rem;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
    .payment-right {
      margin-top: 0.5rem;
      padding: 2rem;
      width: 33%;
      border: 1px solid black;
      height: 250px;
      @media (max-width: 767px) {
        width: 100%;
      }
      .summary {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
      .order-line {
        line-height: 2rem;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        font-size: 1rem;
      }
      .order-total {
        line-height: 2rem;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        font-size: 1.2rem;
      }
      .order-button {
        margin-top: 1rem;
        cursor: pointer;
        font-size: 1.2rem;
        height: 40px;
        line-height: 40px;
        background-color: rgb(28, 25, 25);
        text-align: center;
        color: #fff;
        &:hover {
          border: 1px solid rgb(28, 25, 25);
          background-color: #fff;
          font-weight: 700;
          color: black;
        }
      }
    }
  }
`;
export const Payment = (props) => {
  const { cartItems, shipping } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const itemsPrice = cartItems.reduce((a, b) => a + b.qty * b.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;
  const orderItems = cartItems.map((x) => {
    return {
      name: x.name,
      qty: x.qty,
      image: x.image,
      price: x.price,
      product: x._id,
    };
  });
  const { success, order } = useSelector((state) => state.orderCreate);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems,
        shipping,
        payment: { paymentMethod },
        itemsPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      dispatch(cleanCart());
      props.history.push("/order/" + order._id);
    }
  }, [success]);

  const address = shipping.fullAddress ? shipping.fullAddress.split(", ") : "";
  let firstLine = "";
  let secondLine = "";
  let thirdLine = "";
  if (address.length === 6) {
    firstLine = `${address[0]} ${address[1]}`;
    secondLine = `${address[2]}, ${address[3]} ${address[4]}`;
    thirdLine = `${address[5]}`;
  } else if (address.length === 5) {
    firstLine = `${address[0]}`;
    secondLine = `${address[1]}, ${address[2]} ${address[3]}`;
    thirdLine = `${address[4]}`;
  }
  return (
    <PaymentWrapper>
      <div className="payment-header">Place your Order</div>
      <div className="payment-container">
        <div className="payment-left">
          <div className="left-card">
            <div className="card-header">Shipping Address</div>
            <div className="shipping-address">
              <p>{shipping.name}</p>
              <p>{firstLine}</p>
              <p>{secondLine}</p>
              <p>{thirdLine}</p>
            </div>
          </div>
          <div className="left-card">
            <div className="card-header">Payment Method</div>
            <div className="payment-method">
              <label className="paypal" htmlFor="paypal">
                <input
                  type="radio"
                  value="paypal"
                  id="paypal"
                  name="paypal"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>PayPal</span>
              </label>
            </div>
          </div>
          <div className="left-card">
            <div className="card-header">Review Your Order</div>
            <div className="review">
              {cartItems.map((item) => (
                <div key={item._id} className="item">
                  <div className="image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="desc">
                    <div>{item.name}</div>
                    <div>$ {item.price}</div>
                    <div>Quantity: {item.qty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="payment-right">
          <div className="summary">Order Summary</div>
          <div className="order-line">
            <span>
              Items (
              {cartItems.reduce((a, b) => parseInt(a) + parseInt(b.qty), 0)})
            </span>
            <span>$ {itemsPrice}</span>
          </div>
          <div className="order-line">
            <span>Shipping</span>
            <span>$ {shippingPrice}</span>
          </div>
          <div className="order-total">
            <span>Order Total</span>
            <span>$ {totalPrice}</span>
          </div>
          <div className="order-button" onClick={submitHandler}>
            Place Order
          </div>
        </div>
      </div>
    </PaymentWrapper>
  );
};
