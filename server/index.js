import express from "express";
import data from "./data";
const app = express();

app.get("/api/products", (req, res) => {
  if (data.products) {
    res.send(data.products);
  } else {
    res.status(404).send({ msg: "Products Not found." });
  }
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product Not found." });
  }
});

app.listen(5000, () => {
  console.log("Server up on port 5000");
});
