import express from "express";
import User from "../models/User";
import { getToken } from "../utils";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(user),
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password" });
  }
});

export default router;
