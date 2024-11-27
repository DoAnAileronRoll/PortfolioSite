import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { DateTimeParser } from "../../utilities/MySqlDatetimeParser";

type NextEventInfoType = {
  EventID: number | null;
  Name: string | null;
  Location: string | null;
  CreatedDate: string | null;
  UpdatedDate: string | null;
  EventDate: string ;
};

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

  const getNextEvent = async () => {
    const result = await fetch("http://localhost:8080/mma/nextevent", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("die")
    const resultJson = await result.json();

    let event = {
      EventID: resultJson.NextEvent.EventID,
      Name: resultJson.NextEvent.Name,
      Location: resultJson.NextEvent.Location,
      CreatedDate: resultJson.NextEvent.CreatedDate,
      UpdatedDate: resultJson.NextEvent.UpdatedDate,
      EventDate: resultJson.NextEvent.EventDate,
    };

    var eventDate = DateTimeParser(event.EventDate)
    setEventDate(eventDate)
    setNextEventInfo(event);
  };

  useEffect(()=>{
    getNextEvent();
    // do stuff here...
}, []) //

  return (
    <>
      <Stack>
        <h1 className="mx-auto">NEXTEVENT</h1>
        <h1 className="mx-auto">{nextEventInfo.Name}</h1>
        <h2 className="mx-auto">{eventDate?.toDateString()} </h2>
        <h3 className="mx-auto">{eventDate?.toLocaleTimeString()} </h3>
        {/* <p className="mx-auto">Next Event Date: {() => DateTimeParser(nextEventInfo.EventDate).toString()} </p> */}
        <p className="mx-auto">We are currently under construction. </p>
        <p className="mx-auto">We appreciate your patience.</p>
        <Button className="mx-auto" onClick={() => getNextEvent()}>RELOAD</Button>
      </Stack>
    </>
  );
};

export default NextEvent;
