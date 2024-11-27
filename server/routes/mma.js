const express = require("express");
const mmaRouter = express.Router();
const repo = require("../repo");
mmaRouter.use(express.json());

mmaRouter.get("/", async (req, res) => {
  res.status(200).send({
    Users: await repo.GetAllUsers(),
  });
});
mmaRouter.get("/nextevent", async (req, res) => {
  res.status(200).send({
    NextEvent: await repo.GetNextEvent(),
  });
});

module.exports = mmaRouter