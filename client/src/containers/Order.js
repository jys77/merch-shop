import React, { useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsOrder, payOrder } from "../actions";
import { PayPalButton } from "../components/PayPalButton";
import { Loader } from "../components/Loader";
const OrderWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  .order-header {
    font-size: 0.9rem;
    font-family: "Roboto", sans-serif;
    color: #3d4852;
  }
  .order-container {
    font-family: "Roboto", sans-serif;
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 768px) {
      justify-content: space-between;
    }
    .order-left {
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
          div:nth-child(1) {
            margin-top: 1rem;
            text-transform: uppercase;
          }
          div:nth-child(2) {
            margin-top: 1rem;
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
                a {
                  text-decoration: none;
                  color: black;
                  &:hover {
                    color: darkgray;
                  }
                }
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
    .order-right {
      margin-top: 0.5rem;
      padding: 2rem;
      width: 33%;
      border: 1px solid black;
      height: 320px;
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
        margin-bottom: 1rem;
      }
    }
  }
`;
export const Order = (props) => {
  const { loading, order, error } = useSelector((state) => state.orderDetails);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = useSelector((state) => state.orderPay);

  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile/orders");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
  }, [successPay]);

  const address = order.shipping.fullAddress
    ? order.shipping.fullAddress.split(", ")
    : "";
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

  const SuccessPaymentHandler = () => {
    dispatch(payOrder(order._id));
  };

  return (
    <OrderWrapper>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>{error.msg}</div>
      ) : (
        <div>
          <div className="order-header">
            Order ID: <strong>{props.match.params.id}</strong>
          </div>
          <div className="order-header">
            Order Time:{" "}
            <strong>
              {moment(order.createdAt).format("YYYY/MM/DD HH:mm:ss")}
            </strong>
          </div>
          <div className="order-container">
            <div className="order-left">
              <div className="left-card">
                <div className="card-header">Shipping Address</div>
                <div className="shipping-address">
                  <p>{order.shipping.name}</p>
                  <p>{firstLine}</p>
                  <p>{secondLine}</p>
                  <p>{thirdLine}</p>
                </div>
              </div>
              <div className="left-card">
                <div className="card-header">Payment Method</div>
                <div className="payment-method">
                  <div>{order.payment.paymentMethod}</div>
                  <div>
                    Status:{" "}
                    {order.isPaid
                      ? "Paid at " +
                        moment(order.paidAt).format("YYYY/MM/DD HH:mm:ss")
                      : "Not Paid"}
                  </div>
                </div>
              </div>
              <div className="left-card">
                <div className="card-header">Review Your Order</div>
                <div className="review">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="item">
                      <div className="image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="desc">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>
                        </div>
                        <div>$ {item.price}</div>
                        <div>Quantity: {item.qty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-right">
              <div className="summary">Order Summary</div>
              <div className="order-line">
                <span>
                  Items (
                  {order.orderItems.reduce(
                    (a, b) => parseInt(a) + parseInt(b.qty),
                    0
                  )}
                  )
                </span>
                <span>$ {order.itemsPrice}</span>
              </div>
              <div className="order-line">
                <span>Shipping</span>
                <span>$ {order.shippingPrice}</span>
              </div>
              <div className="order-total">
                <span>Order Total</span>
                <span>$ {order.totalPrice}</span>
              </div>
              {loadingPay && <div>Finishing Payment...</div>}
              {errorPay && <div>Something went error.</div>}
              {!order.isPaid && (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={SuccessPaymentHandler}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </OrderWrapper>
  );
};
