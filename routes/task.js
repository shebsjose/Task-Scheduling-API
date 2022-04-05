const express = require("express");
const router = new express.Router();
const Task = require("../models/taskModel");
const User = require("../models/userModel");
const { taskValidation } = require("../validation");

router.post("/create", async (req, res) => {
  console.log("Create Task=>", req.body);
  const { error } = taskValidation(req.body);
  if (error) return res.status(400).send(error);

  const task = new Task({
    description: req.body.description,
    user : req.body.user
  });
  try {
    const savedTask = await task.save();
    res.send(savedTask);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/single-task/:id", async (req, res) => {
    const { error } = taskValidation(req.body);
    if (error) return res.status(400).send(error);
  
    try {
        const userExists = await Task.findOne({_id: req.params.id});
        res.send(userExists);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.get("/users", async (req, res) => {
    console.log("get User=>", req.body);
    try {
      const users = await User.find().select('-password');
      res.status(201).send(users);
  } catch (e) {
      res.status(500).send(e);
      console.log(e);
  }
  });

  router.get("/all-task", async (req, res) => {
    console.log("get User=>", req.body);
    try {
      const tasks = await Task.find();
      res.status(201).send(tasks);
  } catch (e) {
      res.status(500).send(e);
      console.log(e);
  }
  });

  module.exports = router;

