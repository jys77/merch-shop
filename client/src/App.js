import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./containers/layout//Header";
import { Footer } from "./containers/layout//Footer";
import { Content } from "./containers/layout/Content";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Content />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
