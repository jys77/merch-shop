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
      _id: signinUser._id,
      fname: signinUser.fname,
      lname: signinUser.lname,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
});

router.post("/register", async (req, res) => {
  const emailExists = await User.findOne({
    email: req.body.email,
  });
  if (emailExists) {
    res.status(401).send({ msg: "The E-mail has been registered." });
  } else {
    const user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser._id,
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ msg: "Invalid register information." });
    }
  }
});

export default router;
