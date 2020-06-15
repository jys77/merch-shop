import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { getToken, isAuth } from "../utils";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
  });
  if (signinUser) {
    if (await bcrypt.compare(req.body.password, signinUser.password)) {
      res.send({
        _id: signinUser._id,
        fname: signinUser.fname,
        lname: signinUser.lname,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
    } else {
      res.status(401).send({ msg: "Invalid Password." });
    }
  } else {
    res.status(401).send({ msg: "Invalid Email" });
  }
});

router.post("/register", async (req, res) => {
  const emailExists = await User.findOne({
    email: req.body.email,
  });
  if (emailExists) {
    res.status(401).send({ msg: "The E-mail has been registered." });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
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

router.put("/:id", isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    if (req.body.oldPassword || req.body.newPassword) {
      if (req.body.oldPassword && !req.body.newPassword) {
        res.status(401).send({ msg: "Please set the new password!" });
      } else if (!req.body.oldPassword && req.body.newPassword) {
        res.status(401).send({ msg: "Please enter the old password!" });
      } else if (req.body.oldPassword === req.body.newPassword) {
        res.status(401).send({ msg: "Please set a different password!" });
      } else if (!(await bcrypt.compare(req.body.oldPassword, user.password))) {
        res.status(401).send({ msg: "The old password is wrong!" });
      } else if (req.body.oldPassword !== req.body.newPassword) {
        user.password =
          (await bcrypt.hash(req.body.newPassword, 10)) || user.password;
      }
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      lname: updatedUser.lname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  }
});

export default router;
