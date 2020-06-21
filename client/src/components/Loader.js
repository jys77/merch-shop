import React from "react";
import styled, { keyframes } from "styled-components";

const load = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
`;

const LoaderWrapper = styled.div`
  .loader,
  .loader:before,
  .loader:after {
    background: #000000;
    -webkit-animation: ${load} 1s infinite ease-in-out;
    animation: ${load} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }
  .loader {
    color: #000000;
    text-indent: -9999em;
    height: 100vh;
    margin: 200px auto;
    margin-bottom: 100vh;
    position: relative;
    font-size: 11px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: "";
  }
  .loader:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 1.5em;
  }
`;

export const Loader = () => (
  <LoaderWrapper>
    <div className="loader" />
  </LoaderWrapper>
);
