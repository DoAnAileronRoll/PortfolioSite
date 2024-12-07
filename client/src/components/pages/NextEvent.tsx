import  { useEffect, useState, useContext } from "react";
import { Button, Col, Stack } from "react-bootstrap";
import { DateTimeParser } from "../../utilities/MySqlDatetimeParser.js";
import FightPrediction from "../FightPrediction.js";
import { CurrentUserContext } from "../MainNavBar.js";
import FightPredictionUpdate from "../FightPredictionUpdate.js";

export type NextEventInfoType = {
  EventID: number | null;
  Name: string | null;
  Location: string | null;
  CreatedDate: string | null;
  UpdatedDate: string | null;
  EventDate: string;
};

export interface FightInterface {
  FightID: number;
  EventID: number;
  RedFighterID: number;
  BlueFighterID: number;
  WinnerID: number;
  LoserID: number;
  CreatedDate: Date;
  UpdatedDate: Date;
  RedOdds: string;
  BlueOdds: string;
  OrderOnCard: number;
  CardTypeID: number;
  FightStatusID: number;
  WeightClass: string;
}
export interface PredictionInterface {
  PredictionID: number;
  PredictedWinnerID: number;
  ConfidenceScore: number;
  CreatedByUserID: number;
  CreatedDate: Date;
  UpdatedDate: Date;
  PredictionReasoning: string;
  FightID: number;
}

interface PredictedFightInterface {
  Prediction: PredictionInterface;
  Fight: FightInterface;
}

const NextEvent = () => {
  const [nextEventInfo, setNextEventInfo] = useState<NextEventInfoType>({
    EventID: null,
    Name: null,
    Location: null,
    CreatedDate: null,
    UpdatedDate: null,
    EventDate: "",
  });
  const [eventDate, setEventDate] = useState<Date>();
  const [fightArr, setFightArr] = useState<FightInterface[]>([]);
  const [unpredictedFightArr, setUnpredictedFightArr] = useState<
    FightInterface[]
  >([]);
  const [predictedFightArr, setPredictedFightArr] = useState<
    PredictedFightInterface[]
  >([]);
  const currentUser = useContext(CurrentUserContext);

  const getNextEvent = async () => {
    const nextEventRequest = await fetch(
      "http://mmawebsiteapi:8080/mma/nextevent",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const nextEventResult = await nextEventRequest.json();

    const event: NextEventInfoType = {
      EventID: nextEventResult.NextEvent.EventID,
      Name: nextEventResult.NextEvent.Name,
      Location: nextEventResult.NextEvent.Location,
      CreatedDate: nextEventResult.NextEvent.CreatedDate,
      UpdatedDate: nextEventResult.NextEvent.UpdatedDate,
      EventDate: nextEventResult.NextEvent.EventDate,
    };

    const eventDate = DateTimeParser(event.EventDate);
    setEventDate(eventDate);

    const eventFightsRequest = await fetch(
      `http://mmawebsiteapi:8080/mma/event/fights/${event.EventID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const eventFightsResult = await eventFightsRequest.json();
    //set Fights list
    setFightArr(eventFightsResult.Fights);

    setNextEventInfo(event);
  };

  const getPredictionsAsync = async () => {
    if (currentUser.UserID === null) {
      return;
    }
    console.log(
      currentUser.UserID +
        " is the user id, attempting to get prediciotns. " +
        nextEventInfo.EventID
    );

    const userEventPredictionsRequest = await fetch(
      `http://mmawebsiteapi:8080/mma/event/${nextEventInfo.EventID}}/predictions/${currentUser.UserID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    //list of predictions
    const userEventPredictionsResult = await userEventPredictionsRequest.json();

    const predictionsList: PredictionInterface[] =
      userEventPredictionsResult.Prediction;

    const unpredictedFights: FightInterface[] = [];
    //fightArr is list of Fights
    const predictedFights: PredictedFightInterface[] = [];

    fightArr.forEach((fight) => {
      let predicted = false;
      predictionsList.forEach((prediction) => {
        if (fight.FightID === prediction.FightID) {
          predictedFights.push({ Fight: fight, Prediction: prediction });
          predicted = true;
        }
      });
      if (predicted === false) {
        unpredictedFights.push(fight);
      }
    });
    console.log(predictedFightArr)
    console.log(unpredictedFightArr)


    console.log("predicted")
    console.log(predictedFights)
    console.log("unpredicted")
    console.log(unpredictedFights)

    setPredictedFightArr(predictedFights);
    setUnpredictedFightArr(unpredictedFights);
  };

  useEffect(() => {
    getNextEvent();
  }, []); //

  useEffect(() => {
    getPredictionsAsync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextEventInfo, unpredictedFightArr]);

  return (
    <>
      <Stack>
        <h1 className="mx-auto">NEXTEVENT</h1>
        <h1 className="mx-auto">{nextEventInfo.Name}</h1>
        <h2 className="mx-auto">{eventDate?.toDateString()} </h2>
        <h3 className="mx-auto">{eventDate?.toLocaleTimeString()} </h3>
        {currentUser.UserID === null && (
          <h3 className="mx-auto">Login to make predictions.</h3>
        )}
        {currentUser.UserID !== null && (
          <h3 className="mx-auto">MAKE EVENT PREDICTIONS</h3>
        )}
        {unpredictedFightArr.length === 0 && (
          <h1 className="mx-auto">No Fights to Predict</h1>
        )}
        {unpredictedFightArr.map((fight) => (
            <Col style={{marginLeft: 8, marginRight: 8}}>
              <FightPrediction
              setUnpredictedFights={setUnpredictedFightArr}
              unpredictedFights={unpredictedFightArr}
                ThisFight={fight}
                key={fight.FightID}
                RedFighterID={fight.RedFighterID}
                BlueFighterID={fight.BlueFighterID}
              />
            </Col>
        ))}

        <h3 className="mx-auto">YOUR EVENT PREDICTIONS</h3>
        {predictedFightArr.length === 0 && (
          <h1 className="mx-auto">No Predictions Found</h1>
        )}
        {predictedFightArr.map((fight) => (
            <Col style={{marginLeft: 8, marginRight: 8}}>
              <FightPredictionUpdate
                BlueFighterID={fight.Fight.BlueFighterID}
                ConfidenceValue={fight.Prediction.ConfidenceScore}
                PredictionReasoning={fight.Prediction.PredictionReasoning}
                RedFighterID={fight.Fight.RedFighterID}
                SelectedWinner={fight.Prediction.PredictedWinnerID}
                ThisFight={fight.Fight}
                key={fight.Fight.FightID}
                PredictionID={fight.Prediction.PredictionID}
              />
            </Col>
        ))}

        <Button
          variant="dark"
          className="mx-auto m-1"
          onClick={() => getNextEvent()}
        >
          <h5>RELOAD</h5>
        </Button>
      </Stack>
    </>
  );
};

export default NextEvent;
