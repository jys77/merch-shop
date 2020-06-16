import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";

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

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(config.PORT, () => {
  console.log(`Server is up on port ${config.PORT}.`);
});
