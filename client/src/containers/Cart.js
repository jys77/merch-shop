import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addToCart, cartNumChange, removeFromCart } from "../actions";

const CartWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  .empty {
    font-family: "Poppins", sans-serif;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    &-text {
      font-size: 1.4rem;
      text-align: center;
    }
    &-button {
      cursor: pointer;
      margin-top: 2rem;
      font-size: 1rem;
      background-color: rgb(28, 25, 25);
      color: #fff;
      height: 50px;
      width: 30%;
      line-height: 50px;
      text-align: center;
      text-decoration: none;
      &:hover {
        background-color: #fff;
        font-weight: 700;
        color: rgb(28, 25, 25);
        border: 2px solid rgb(28, 25, 25);
      }
      @media (max-width: 767px) {
        width: 100%;
      }
    }
  }
  .your-cart {
    font-size: 1.5rem;
    font-family: "Roboto", sans-serif;
    color: #3d4852;
  }
  .cart-container {
    display: flex;
    flex-flow: row;
    @media (max-width: 767px) {
      flex-flow: column;
    }
    .cart-left {
      margin-top: 2rem;
      width: 60%;
      @media (max-width: 767px) {
        width: 100%;
      }
      .cart-items {
        li.cart-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px #f1f5f8 solid;
          @media (max-width: 767px) {
            flex-flow: column;
          }
          .cart-product {
            display: flex;
            a.cart-img {
              border: 2px solid #3d4852;
              text-decoration: none;
              height: 90px;
              width: 90px;
              img {
                width: 100%;
              }
            }
            .item-desc {
              margin-left: 2rem;
              display: flex;
              flex-flow: column;
              justify-content: center;
              font-family: "Poppins", sans-serif;
              .item-name {
                margin-bottom: 1rem;
                font-size: 1rem;
              }
              .item-price {
                font-weight: 500;
                font-size: 1.2rem;
              }
            }
          }
          .item-count {
            display: flex;
            align-items: center;
            @media (max-width: 767px) {
              margin-top: 1rem;
            }
            select {
              width: 50px;
              -webkit-appearance: none;
              background-color: white;
              border: 1px solid #6e7073;
              border-radius: 2px;
              color: #45474c;
              cursor: default;
              outline: none;
              padding: 8px 10px;
            }
            .item-remove {
              cursor: pointer;
              margin-top: 3px;
              margin-left: 1rem;
              vertical-align: middle;
              font-size: 0.9rem;
              font-family: "Poppins", sans-serif;
              svg {
                width: 33.5px;
                height: 33.5px;
              }
            }
          }
        }
      }
    }
    .cart-right {
      margin-top: 2rem;
      width: 40%;
      height: 320px;
      border: 1px solid #dae1e7;
      padding: 2rem;
      @media (max-width: 767px) {
        width: 100%;
      }
      @media (min-width: 768px) {
        margin-left: 2rem;
      }
      .cart-panel {
        display: flex;
        flex-flow: column;
        font-family: "Roboto", sans-serif;
        font-size: 1.2rem;
        .subtotal {
          display: flex;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px #f1f5f8 solid;
        }
        .shipping {
          display: flex;
          justify-content: space-between;
          padding-top: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px #f1f5f8 solid;
        }
        .total {
          display: flex;
          font-weight: 700;
          justify-content: space-between;
          padding-top: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px #f1f5f8 solid;
        }
        .checkout-button {
          cursor: pointer;
          margin-top: 2.5rem;
          background-color: rgb(28, 25, 25);
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: #fff;
          &:hover {
            background-color: #fff;
            font-weight: 700;
            color: rgb(28, 25, 25);
            border: 2px solid rgb(28, 25, 25);
          }
        }
      }
    }
  }
`;

export const Cart = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const { cartItems, error } = useSelector((state) => state.cart);

  const itemsPrice = cartItems.reduce((a, b) => a + b.qty * b.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <CartWrapper>
      <div className="your-cart">
        <p>YOUR CART</p>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty">
          <div className="empty-text">Your shopping cart is empty.</div>
          <Link to="/" className="empty-button">
            Go shopping
          </Link>
          <div></div>
        </div>
      ) : error ? (
        { error }
      ) : (
        <div className="cart-container">
          <div className="cart-left">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id} className="cart-item">
                  <div className="cart-product">
                    <Link to={"/product/" + item._id} className="cart-img">
                      <img src={item.image} alt={item.name} />
                    </Link>
                    <div className="item-desc">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">$ {item.price}</div>
                    </div>
                  </div>
                  <div className="item-count">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(cartNumChange(item._id, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <div
                      className="item-remove"
                      onClick={() => removeHandler(item._id)}
                    >
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0H100V100H0V0Z" fill="#1C1919" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M84 91L8.99999 16L15.364 9.63605L90.364 84.636L84 91Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.00001 85L84 9.99999L90.364 16.364L15.364 91.364L9.00001 85Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-right">
            <div className="cart-panel">
              <div className="subtotal">
                <div className="subtotal-text">Subtotal</div>
                <div className="subtotal-num">$ {itemsPrice}</div>
              </div>
              <div className="shipping">
                <div className="shipping-text">Shipping</div>
                <div className="shipping-num">${shippingPrice}</div>
              </div>
              <div className="total">
                <div className="total-text">Total</div>
                <div className="total-num">$ {totalPrice}</div>
              </div>
              <div className="checkout-button" onClick={checkoutHandler}>
                CHECKOUT
              </div>
            </div>
          </div>
        </div>
      )}
    </CartWrapper>
  );
};
