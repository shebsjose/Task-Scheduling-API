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

router.get("/:id", async (req, res) => {
    console.log("get Task=>", req.body);
    const { error } = taskValidation(req.body);
    if (error) return res.status(400).send(error);
  
    try {
        const userExists = await Task.findOne({_id: req.params.id});
        res.send(userExists);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.get("/user", async (req, res) => {
    console.log("get Task=>", req.body);
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  module.exports = router;

