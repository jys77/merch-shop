import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import config from "./config";
import userRoute from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import orderRouter from "./routes/orderRoute";
const app = express();

const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error.reason));

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

app.listen(5000, () => {
  console.log("Server up on port 5000");
});
