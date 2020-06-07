import express from "express";
import data from "./data";
import mongoose from "mongoose";

import config from "./config";
import userRoute from "./routes/userRoute";
const app = express();

const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error.reason));

app.use("/api/users", userRoute);

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
