import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductList, fetchCategories } from "../actions";
import { Loader } from "../components/Loader";
import LazyLoad from "react-lazyload";

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
        a {
          text-decoration: none;
          color: black;
          &.active,
          &:active {
            font-weight: 700;
          }
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
      .lazyload-wrapper {
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

export const Home = (props) => {
  // const [products, setProducts] = useState([]);
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const { categories, error: catError } = useSelector(
    (state) => state.categories
  );
  const category = props.match.params.category
    ? props.match.params.category
    : "";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList(category));
  }, [dispatch, category]);

  const dispatchCategories = useDispatch();
  useEffect(() => {
    dispatchCategories(fetchCategories());
  }, [dispatchCategories]);

  return (
    <HomeWrapper>
      <div className="sidebar">
        <ul className="sidebar-list">
          <li>Filter by Products</li>
          <li>
            <NavLink exact to="/">
              All Products
            </NavLink>
          </li>
          {catError
            ? null
            : categories
            ? categories.map((cat) => (
                <li key={cat}>
                  <NavLink to={"/category/" + cat}>{cat}</NavLink>
                </li>
              ))
            : null}
        </ul>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        { error }
      ) : (
        <div className="products">
          <ul className="products-list">
            {products.map((product) => (
              <LazyLoad
                key={product._id}
                once={true}
                height="100%"
                offset={[-200, 0]}
                placeholder={<Loader />}
              >
                <li>
                  <Link to={"/product/" + product._id}>
                    <div className="image">
                      <img alt={product.name} src={product.image} />
                    </div>
                    <h3 className="name">{product.name}</h3>
                    <h2 className="price">${product.price}</h2>
                  </Link>
                </li>
              </LazyLoad>
            ))}
          </ul>
        </div>
      )}
    </HomeWrapper>
  );
};
