const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
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
  }
});

router.post("/login", async (req, res) => {
 
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({email: req.body.email });
  if (!user)
    return res.status(400).send("Email or password is incorrect" );

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Password is incorrect" );

  const token = jwt.sign({user : user}, "My_secret_token");
  console.log(token);
  res.header('auth-token').send({token,user});
});

router.get("/get-user", async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(201).send(users);
} catch (e) {
    res.status(500).send(e);
    console.log(e);
}
});

module.exports = router;
