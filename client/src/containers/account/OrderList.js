import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../actions";
import { Loader } from "../../components/Loader";

const OrderListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  .tip {
    margin-bottom: 100vh;
    font-size: 1.2rem;
    font-weight: 700;
  }
  .orders-header {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px #f1f5f8 solid;
  }
  .order-list {
    display: flex;
    flex-flow: column;
    ul {
      list-style: none;
      li {
        a {
          text-decoration: none;
          color: black;
          .single-order {
            margin-bottom: 2rem;
            cursor: pointer;
            font-family: "Roboto", sans-serif;
            border: 1px solid black;
            display: flex;
            flex-flow: column;
            padding: 1rem;
            max-width: 400px;
            .order-info {
              font-size: 0.7rem;
              margin-bottom: 0.5rem;
            }
            .item {
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
              display: flex;
              justify-content: space-between;
              .image {
                width: 80px;
                height: 80px;
                img {
                  width: 100%;
                }
              }
              .desc {
                margin-left: 2rem;
                display: flex;
                flex-flow: column;
                line-height: 1.5rem;
                div:nth-child(1) {
                  font-size: 1rem;
                  text-align: right;
                }
                div:nth-child(2) {
                  font-size: 1.1rem;
                  font-weight: 500;
                  text-align: right;
                }
                div:nth-child(3) {
                  font-size: 1rem;
                  text-align: right;
                }
              }
            }
            .payment-status {
              margin-top: 1rem;
              margin-bottom: 1rem;
            }
            .total-price {
              font-weight: 700;
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
`;

export const OrderList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  const { loading, orders, error } = useSelector((state) => state.myOrders);
  return (
    <OrderListWrapper>
      <div className="orders-header">My Orders</div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="tip">{error.msg}</div>
      ) : orders.length <= 0 ? (
        <div className="tip">No Orders Found</div>
      ) : orders.length > 0 ? (
        <div className="order-list">
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <Link to={"/order/" + order._id}>
                  <div className="single-order">
                    <div className="order-info">
                      Order ID: <strong>{order._id}</strong>
                    </div>
                    <div className="order-info">
                      Order Time:{" "}
                      <strong>
                        {moment(order.createdAt).format("YYYY/MM/DD HH:mm:ss")}
                      </strong>
                    </div>
                    {order.orderItems.map((item) => (
                      <div key={(order._id, item._id)} className="item">
                        <div className="image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="desc">
                          <div>{item.name}</div>
                          <div>$ {item.price}</div>
                          <div>x {item.qty}</div>
                        </div>
                      </div>
                    ))}
                    <div
                      className="payment-status"
                      style={
                        order.isPaid ? { color: "green" } : { color: "red" }
                      }
                    >
                      {order.isPaid
                        ? "Paid at " +
                          moment(order.paidAt).format("YYYY/MM/DD HH:mm:ss")
                        : "Not Paid"}
                    </div>
                    <div className="total-price">
                      Total: $ {order.totalPrice}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="tip">Something went wrong.</div>
      )}
    </OrderListWrapper>
  );
};
