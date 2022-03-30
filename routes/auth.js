const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/userRegister");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  console.log("Register =>", req.body);
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists" );

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }rx4
});

router.post("/login", async (req, res) => {
  console.log("Login => ",req.body);

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({email: req.body.email });
  if (!user)
    return res.status(400).send("Email or password is incorrect" );

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Password is incorrect" );

  const token = jwt.sign({_id : user._id}, "My_secret_token");
  console.log(token);
  res.header('auth-token').send({token,user});
});

module.exports = router;
