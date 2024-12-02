import React, { useEffect, useState, useContext } from "react";
import { Button, Stack } from "react-bootstrap";
import { DateTimeParser } from "../../utilities/MySqlDatetimeParser";
import FightPrediction from "../FightPrediction";
import { CurrentUserContext } from "../MainNavBar";

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
  const currentUser = useContext(CurrentUserContext);

  const getNextEvent = async () => {
    const nextEventRequest = await fetch(
      "http://localhost:8080/mma/nextevent",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const nextEventResult = await nextEventRequest.json();

    let event = {
      EventID: nextEventResult.NextEvent.EventID,
      Name: nextEventResult.NextEvent.Name,
      Location: nextEventResult.NextEvent.Location,
      CreatedDate: nextEventResult.NextEvent.CreatedDate,
      UpdatedDate: nextEventResult.NextEvent.UpdatedDate,
      EventDate: nextEventResult.NextEvent.EventDate,
    };

    var eventDate = DateTimeParser(event.EventDate);
    setEventDate(eventDate);

    const eventFightsRequest = await fetch(
      `http://localhost:8080/mma/event/fights/${event.EventID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    var eventFightsResult = await eventFightsRequest.json();
    //set Fights list
    setFightArr(eventFightsResult.Fights);
    console.log(fightArr);

    setNextEventInfo(event);
  };

  useEffect(() => {
    getNextEvent();
    // do stuff here...
  }, []); //

  return (
    <>
      <Stack>
        <h1 className="mx-auto">NEXTEVENT</h1>
        <h1 className="mx-auto">{nextEventInfo.Name}</h1>
        <h2 className="mx-auto">{eventDate?.toDateString()} </h2>
        <h3 className="mx-auto">{eventDate?.toLocaleTimeString()} </h3>
        {currentUser.UserID === null && <h3 className="mx-auto">Login to make predictions.</h3>}
        <p className="mx-auto">We are currently under construction. </p>
        <p className="mx-auto">We appreciate your patience.</p>
        {fightArr.length === 0 && <h1>No Fights found</h1>}
        {fightArr.map((item, index) => (
          <FightPrediction
            ThisFight={fightArr[index]}
            key={index}
            RedFighterID={fightArr[index].RedFighterID}
            BlueFighterID={fightArr[index].BlueFighterID}
          />
        ))}
        <Button
          variant="dark"
          className="mx-auto m-1"
          onClick={() => getNextEvent()}
        >
          RELOAD
        </Button>
      </Stack>
    </>
  );
};

export default NextEvent;
