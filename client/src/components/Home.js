import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductList } from "../actions";
const HomeWrapper = styled.main`
  display: flex;
  .sidebar {
    margin: 5rem;
    @media (max-width: 767px) {
      display: none;
    }
    @media (min-width: 768px) {
      width: 16.6%;
    }
    .sidebar-list {
      list-style-type: none;
      li {
        font-family: "Poppins", sans-serif;
        font-size: 1.3rem;
        margin-bottom: 1rem;
        &:first-child {
          text-transform: uppercase;
          font-family: "Roboto", sans-serif;
          font-weight: 700;
          color: #606f7b;
          margin-bottom: 2rem;
        }
      }
    }
  }
  .products {
    @media (max-width: 767px) {
      width: 100%;
    }
    @media (min-width: 768px) {
      margin: 5rem;
      width: 83.4%;
    }
    .products-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        @media (min-width: 768px) {
          width: 33.33333%;
        }
        @media (max-width: 767px) {
          width: 50%;
        }
        a {
          margin-bottom: 2rem;
          font-family: "Poppins", sans-serif;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          align-items: center;
          color: black;
          .image {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            img {
              width: 100%;
              /* height: 100%; */
            }
          }
          .name {
            font-size: 0.8rem;
            color: #8795a1;
            margin-top: 0.5rem;
          }
          .price {
            margin-top: 0.5rem;
            font-size: 1rem;
          }
        }
      }
    }
  }
`;

export const Home = () => {
  // const [products, setProducts] = useState([]);
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  return (
    <HomeWrapper>
      <div className="sidebar">
        <ul className="sidebar-list">
          <li>Filter by Products</li>
          <li>All Products</li>
          <li>Hat</li>
          <li>Shirts</li>
          <li>Hoodies</li>
          <li>Pants</li>
        </ul>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        { error }
      ) : (
        <div className="products">
          <ul className="products-list">
            {products.map((product) => (
              <li key={product._id}>
                <a href="/">
                  <div className="image">
                    <img alt={product.name} src={product.image} />
                  </div>
                  <h3 className="name">{product.name}</h3>
                  <h2 className="price">${product.price}</h2>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </HomeWrapper>
  );
};
