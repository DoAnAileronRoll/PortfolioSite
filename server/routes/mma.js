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

mmaRouter.get("/event/fights/:eventid", async (req,res) => {
  const { eventid } = req.params;

  res.status(200).send({
    Fights: await repo.GetEventFights(eventid)
  });
});

mmaRouter.get("/fight/all/", async (req,res) => {

  res.status(200).send({
    Fights: await repo.GetAllFights()
  });
});


mmaRouter.get("/fighter/:fighterid", async (req,res) => {
  const { fighterid } = req.params;

  res.status(200).send({
    Fighter: await repo.GetFighter(fighterid)
  })
})

mmaRouter.post("/prediction/create", async (req,res) => {
  repo.CreatePrediction(req.body)
  res.status(200).send({
    Message: "Prediction successful"
  })
})

module.exports = mmaRouter