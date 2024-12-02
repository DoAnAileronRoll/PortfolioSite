import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  NavItem,
  Row,
  Image,
} from "react-bootstrap";
import { FightInterface } from "./pages/NextEvent";
import { useContext } from "react";
import { CurrentUserContext } from "./MainNavBar";
import infocircle from "../assets/infocircle.svg";

interface Fighter {
  FighterID: number;
  Gender: string;
  WinCount: number;
  LossCount: number;
  DrawCount: number;
  NoContestCount: number;
  CreatedDate: Date;
  UpdatedDate: Date;
  LastFight: string;
  FirstName: string;
  LastName: string;
  LastFightDate: Date;
  Nickname: string;
  Ranking: string;
}

interface FightPredictionProps {
  RedFighterID: number;
  BlueFighterID: number;
  ThisFight: FightInterface;
}

const FightPrediction = ({
  RedFighterID,
  BlueFighterID,
  ThisFight,
}: FightPredictionProps) => {
  const currentUser = useContext(CurrentUserContext);
  const [redFighter, setRedFighter] = useState<Fighter>({
    FighterID: 0,
    Gender: "",
    WinCount: 0,
    LossCount: 0,
    DrawCount: 0,
    NoContestCount: 0,
    CreatedDate: new Date(),
    UpdatedDate: new Date(),
    LastFight: "",
    FirstName: "",
    LastName: "",
    LastFightDate: new Date(),
    Nickname: "",
    Ranking: "",
  });
  const [blueFighter, setBlueFighter] = useState<Fighter>({
    FighterID: 0,
    Gender: "",
    WinCount: 0,
    LossCount: 0,
    DrawCount: 0,
    NoContestCount: 0,
    CreatedDate: new Date(),
    UpdatedDate: new Date(),
    LastFight: "",
    FirstName: "",
    LastName: "",
    LastFightDate: new Date(),
    Nickname: "",
    Ranking: "",
  });
  const [confidenceValue, setConfidenceValue] = useState("");

  const [reasoningText, setReasoningText] = useState("");
  const [selectedWinner, setSelectedWinner] = useState(0);

  const getFighterAsync = async (FighterID: number) => {
    const getFighterRequest = await fetch(
      `http://localhost:8080/mma/fighter/${FighterID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const getFighterResult = await getFighterRequest.json();

    const newFighter: Fighter = {
      FighterID: getFighterResult.Fighter.FighterID,
      Gender: getFighterResult.Fighter.Gender,
      WinCount: getFighterResult.Fighter.WinCount,
      LossCount: getFighterResult.Fighter.LossCount,
      DrawCount: getFighterResult.Fighter.DrawCount,
      NoContestCount: getFighterResult.Fighter.NoContestCount,
      CreatedDate: getFighterResult.Fighter.CreatedDate,
      UpdatedDate: getFighterResult.Fighter.UpdatedDate,
      LastFight: getFighterResult.Fighter.LastFight,
      FirstName: getFighterResult.Fighter.FirstName,
      LastName: getFighterResult.Fighter.LastName,
      LastFightDate: getFighterResult.Fighter.LastFightDate,
      Nickname: getFighterResult.Fighter.Nickname,
      Ranking: getFighterResult.Fighter.Ranking,
    };
    return newFighter;
  };

  const setFightersAsync = async () => {
    var RedFighter = await getFighterAsync(RedFighterID);
    var BlueFighter = await getFighterAsync(BlueFighterID);

    setRedFighter(RedFighter);
    console.log(RedFighter);
    setBlueFighter(BlueFighter);
    console.log(BlueFighter);
  };

  const createPrediction = async () => {
    console.log("Creation starting");

    const createPredictionRequest = await fetch(
      `http://localhost:8080/mma/prediction/create`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PredictedWinnerID: selectedWinner,
          ConfidenceScore: confidenceValue,
          CreatedByUserID: currentUser.UserID,
          PredictionReasoning: reasoningText,
        }),
      }
    );
  };

  const showTooltip = async () => {};

  useEffect(() => {
    setFightersAsync();
    // do stuff here...
  }, []); //

  return (
    <>
      {redFighter === null && blueFighter === null && <p>No fighters found</p>}
      <Container className="border rounded-4 pb-2 mb-2">
        <Row>
          <Col>
            <Row>
              <Col>
                <h1 className="">{redFighter?.FirstName}</h1>
              </Col>

              <Col className="d-flex flex-column">
                <NavItem className="my-auto" onClick={() => showTooltip()}>
                  <Image className="me-1" width={23} src={infocircle} />
                </NavItem>
              </Col>
            </Row>

            <Row>
              <Col>
                {" "}
                <h1 className="">{redFighter?.LastName}</h1>
              </Col>
              <Col>
                <Form.Check
                  inline
                  label="Select"
                  name={ThisFight.FightID.toString()}
                  type="radio"
                  className="ms-3"
                  id={"1"}
                  onChange={() => setSelectedWinner(redFighter.FighterID)}
                />
              </Col>
            </Row>

            {redFighter.Nickname !== "" && <h2>"{redFighter?.Nickname}"</h2>}
            {redFighter?.NoContestCount !== null &&
              redFighter?.NoContestCount > 0 && (
                <h3>
                  {redFighter?.WinCount}-{redFighter?.LossCount}-
                  {redFighter?.DrawCount}, {redFighter?.NoContestCount} NC
                </h3>
              )}
            <h3>
              {redFighter?.WinCount}-{redFighter?.LossCount}-
              {redFighter?.DrawCount}
            </h3>
            {redFighter.Ranking === "C" && <h5>Champ</h5>}
            {redFighter.Ranking !== "" && redFighter.Ranking !== "C" && (
              <h5>#{redFighter.Ranking}</h5>
            )}
          </Col>

          <Col>
            <h4 style={{ textAlign: "center" }} className="pt-1">
              {ThisFight.WeightClass}
            </h4>
            <Form className="mx-auto">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  onChange={(e) => setReasoningText(e.target.value)}
                  as="textarea"
                  placeholder="Prediction reasoning"
                  rows={3}
                />
              </Form.Group>
              <Form.Label style={{ textAlign: "center" }} className="mx-auto">
                Confidence: {confidenceValue}
              </Form.Label>
              <Form.Range
                value={confidenceValue}
                name="hello"
                min={1}
                max={10}
                onChange={(e) => setConfidenceValue(e.target.value)}
                className="custom-slider"
              />
              <Row className="">
                <Col>
                  <h3>{ThisFight.RedOdds}</h3>
                </Col>
                <Col>
                  <h3 style={{ textAlign: "right" }}>{ThisFight.BlueOdds}</h3>
                </Col>
              </Row>
              <Row className="justify-content-center">
                {currentUser.UserID !== null && (
                  <Button
                    className="bg-dark"
                    onClick={() => createPrediction()}
                  >
                    SUBMIT
                  </Button>
                )}
                {currentUser.UserID === null && (
                  <Button className="bg-dark" disabled>
                    SUBMIT
                  </Button>
                )}
              </Row>
            </Form>
          </Col>
          <Col className="justify-content-right">
            <Row>
              <Col className="d-flex flex-column justify-content-right">
                <NavItem className="my-auto mx-auto" onClick={() => showTooltip()}>
                  <Image className="me-2" width={23} src={infocircle} />
                </NavItem>
              </Col>
              <Col>
                {" "}
                <h1 style={{ textAlign: "right" }} className="ms-auto">
                  {blueFighter?.FirstName}
                </h1>
              </Col>
            </Row>

            {/* <h1 style={{ textAlign: "right" }} className="ms-auto">
              {blueFighter?.FirstName}
            </h1> */}

            <Row>
              <Col className="d-flex flex-column justify-content-right">
                <Form.Check
                  inline
                  reverse
                  label="Select"
                  name={ThisFight.FightID.toString()}
                  type="radio"
                  id={"2"}
                  onChange={() => setSelectedWinner(blueFighter.FighterID)}
                />
              </Col>
              <Col>
                <h1 style={{ textAlign: "right" }} className="">
                  {blueFighter?.LastName}
                </h1>
              </Col>
            </Row>

            {blueFighter.Nickname !== "" && (
              <h2 style={{ textAlign: "right" }}>"{blueFighter?.Nickname}"</h2>
            )}
            {blueFighter?.NoContestCount !== null &&
              blueFighter?.NoContestCount > 0 && (
                <h3 style={{ textAlign: "right" }}>
                  {blueFighter?.WinCount}-{blueFighter?.LossCount}-
                  {blueFighter?.DrawCount}, {blueFighter?.NoContestCount} NC
                </h3>
              )}
            <h3 style={{ textAlign: "right" }}>
              {blueFighter?.WinCount}-{blueFighter?.LossCount}-
              {blueFighter?.DrawCount}
            </h3>
            {blueFighter.Ranking === "C" && (
              <h5 style={{ textAlign: "right" }}>Champ</h5>
            )}
            {blueFighter.Ranking !== "" && blueFighter.Ranking !== "C" && (
              <h5 style={{ textAlign: "right" }}>#{blueFighter.Ranking}</h5>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FightPrediction;
