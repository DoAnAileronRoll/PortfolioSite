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
mmaRouter.get("/fight/:fightid/", async (req,res) => {
  const {fightid} = req.params

  res.status(200).send({
    Fight: await repo.GetFight(fightid)
  });
});


mmaRouter.get("/fighter/:fighterid", async (req,res) => {
  const { fighterid } = req.params;

  res.status(200).send({
    Fighter: await repo.GetFighter(fighterid)
  })
})

mmaRouter.post("/prediction/create", async (req,res) => {
  await repo.CreatePrediction(req.body)
  res.status(200).send({
    Message: "Prediction successful"
  })
})

mmaRouter.get("/prediction/:predictionid", async (req,res) => {
  const {predictionid} = req.params
  
  res.status(200).send({
    Prediction: await repo.GetPrediction(predictionid)
  })
})

///Get User Event Predictions
mmaRouter.get("/event/:eventID/predictions/:userID", async (req,res) => {
  //const {eventID, userID} = req.params
  console.log(req.params.eventID)
  res.status(200).send({
    Prediction: await repo.GetUserEventPredictions(req.params.eventID, req.params.userID)
  })
})

mmaRouter.put("/prediction/update/:predictionid", async (req,res) => {
  const {predictionid} = req.params
  
  res.status(200).send({
    UpdateResponse: await repo.UpdatePrediction(req.body, predictionid)
  })
})

mmaRouter.get("/fighter/brief/:fighterid", async (req,res) => {
  const { fighterid } = req.params;

  res.status(200).send({
    FighterBrief: await repo.GetFighterBrief(fighterid)
  })
})

 
module.exports = mmaRouter