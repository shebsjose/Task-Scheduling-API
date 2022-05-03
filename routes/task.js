const express = require("express");
const router = new express.Router();
const Task = require("../models/taskModel");
const { taskValidation } = require("../validation");

router.post("/create", async (req, res) => {

  const { error } = taskValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task({
    description: req.body.description,
    user : req.body.user,
    time : req.body.time
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


  router.patch('/change-status/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const updates = req.body;
    const options = {new : true}
    const task = await Task.findByIdAndUpdate(id, updates, options);
    res.send(task);
    } catch (err) {
      res.status(404).send(err)
      console.log(err);
    }
  })

  router.get("/all-task", async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(201).send(tasks);
  } catch (e) {
      res.status(500).send(e);
      console.log(e);
  }
  });

  router.delete('/delete/:id', async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({_id: req.params.id})
      if (!task) {
        res.status(404).send()
      }
      res.status(201).send(task)
    } catch (e) {
      res.status(404).send(e)
      console.log(e);
    }
  });

  router.put('/update/:id', async (req, res) => {
    try {
      const id = req.params.id;
     const updates = req.body;
      const task = await Task.findByIdAndUpdate(id, updates);
      if (!task) {
        res.status(404).send();
      }
      res.status(200).send(task);
    } catch (e) {
      res.status(404).send(e);
      console.log(e);
    }
  })

  
  module.exports = router;

