import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Image,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { FightInterface } from "./pages/NextEvent.js";
import { useContext } from "react";
import { CurrentUserContext } from "./MainNavBar.js";
import infocircle from "../assets/infocircle.svg";
import "../assets/custom.css";
import BasicToast from "./BasicToast.js";

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
interface FighterBrief {
  FighterBriefID: number;
  FighterID: number;
  BriefText: string;
  Cons: string;
  Pros: string;
}

interface FightPredictionProps {
  RedFighterID: number;
  BlueFighterID: number;
  ThisFight: FightInterface;
  ConfidenceValue: number;
  PredictionReasoning: string;
  SelectedWinner: number;
  PredictionID: number;
}

const FightPrediction = ({
  RedFighterID,
  BlueFighterID,
  ThisFight,
  ConfidenceValue,
  PredictionReasoning,
  SelectedWinner,
  PredictionID,
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
  const [confidenceValue, setConfidenceValue] = useState(
    ConfidenceValue.toString()
  );
  const [reasoningText, setReasoningText] = useState(PredictionReasoning);
  const [selectedWinner, setSelectedWinner] = useState(SelectedWinner);
  const [errorToastShow, setErrorToastShow] = useState(false);
  const [errorToastBodyText, setErrorToastBodyText] = useState(
    "There was an error."
  );

  const [RedFighterBrief, setRedFighterBrief] = useState<FighterBrief>();
  const [BlueFighterBrief, setBlueFighterBrief] = useState<FighterBrief>();

  const getFighterAsync = async (FighterID: number) => {
    const getFighterRequest = await fetch(
      `http://mmawebsiteapi:8080/mma/fighter/${FighterID}`,
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

  const setFighterBrief = async (FighterID: number) => {
    const getFighterBriefRequest = await fetch(
      `http://mmawebsiteapi:8080/mma/fighter/brief/${FighterID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const getFighterBriefResult = await getFighterBriefRequest.json();

    const newFighterBrief: FighterBrief = {
      BriefText: "",
      Cons: "",
      FighterID: 0,
      FighterBriefID: 0,
      Pros: "",
    };
    if (Object.keys(getFighterBriefResult).length === 0) {
      return newFighterBrief;
    } else {
      newFighterBrief.BriefText = getFighterBriefResult.FighterBrief.BriefText;
      newFighterBrief.Cons = getFighterBriefResult.FighterBrief.Cons;
      newFighterBrief.FighterID = getFighterBriefResult.FighterBrief.FighterID;
      newFighterBrief.FighterBriefID =
        getFighterBriefResult.FighterBrief.FighterBriefID;
      newFighterBrief.Pros = getFighterBriefResult.FighterBrief.Pros;

      //console.log(newFighterBrief);
      return newFighterBrief;
    }
  };

  const setFightersAsync = async () => {
    const RedFighter = await getFighterAsync(RedFighterID);
    const BlueFighter = await getFighterAsync(BlueFighterID);

    setRedFighter(RedFighter);
    setBlueFighter(BlueFighter);

    setRedFighterBrief(await setFighterBrief(RedFighter.FighterID));
    setBlueFighterBrief(await setFighterBrief(BlueFighter.FighterID));
    //console.log(RedFighterBrief);
    //console.log(BlueFighterBrief);
  };

  const updatePrediction = async () => {
    if (selectedWinner === 0) {
      //console.log("Error in prediction");
      setErrorToastBodyText(
        "You did not provide a selected winner. Try again."
      );
      setErrorToastShow(true);
      return;
    }

    console.log(selectedWinner + " " + confidenceValue + " " + reasoningText);

    await fetch(`http://mmawebsiteapi:8080/mma/prediction/update/${PredictionID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PredictedWinnerID: selectedWinner,
        ConfidenceScore: confidenceValue,
        PredictionReasoning: reasoningText,
      }),
    });
  };

  useEffect(() => {
    setFightersAsync();
    // do stuff here...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //

  return (
    <>
      {redFighter === null && blueFighter === null && <p>No fighters found</p>}
      <Container className="border rounded-4 pb-2 mb-2" fluid>
        <Row>
          <Col>
            <Row>
              <Col>
                <h2 className="">{redFighter?.FirstName}</h2>
              </Col>

              <Col className="d-flex flex-column justify-content-right" xs={1}>
                  {RedFighterBrief?.FighterID !== 0 && (
                    <OverlayTrigger
                      key={RedFighterID}
                      trigger="click"
                      placement={"bottom"}
                      rootClose
                      overlay={
                        <Popover style={{ width: 500 }} id="popover-basic">
                          <Popover.Header style={{ width: 500, paddingBottom: 0}} as="h3">
                            <h3>Some Thoughts</h3>
                          </Popover.Header>
                          <Popover.Body style={{ width: 500 }}>
                            <p>
                              <strong>Overview:</strong>{" "}
                              {RedFighterBrief?.BriefText}
                            </p>
                            <p>
                              <strong>Pros:</strong> {RedFighterBrief?.Pros}
                            </p>
                            <p>
                              <strong>Cons:</strong> {RedFighterBrief?.Cons}
                            </p>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Image className="my-auto mx-auto" src={infocircle} />
                    </OverlayTrigger>
                  )}
              </Col>
            </Row>

            <Row>
              <Col>
                {" "}
                <h2 className="">{redFighter?.LastName}</h2>
              </Col>
            </Row>

            {redFighter.Nickname !== "" && <h3>"{redFighter?.Nickname}"</h3>}
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

            <Row>
              <Col className="d-flex flex-column justify-content-center" Col>
                <Form.Check
                  checked={selectedWinner === RedFighterID && true}
                  name={ThisFight.FightID.toString()}
                  label=""
                  type="radio"
                  className="my-auto"
                  id={"1"}
                  onChange={() => setSelectedWinner(redFighter.FighterID)}
                />
              </Col>
            </Row>
          </Col>

          <Col>
            <h4 style={{ textAlign: "center" }} className="pt-1">
              {ThisFight.WeightClass}
            </h4>

            <Form className="">
              <Row>
                <Col>
                  <Form.Group
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      onChange={(e) => setReasoningText(e.target.value)}
                      as="textarea"
                      value={reasoningText}
                      rows={3}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Label style={{ textAlign: "center" }} className="mx-auto my-auto ">
                <h3 className="my-auto">Confidence: {confidenceValue}</h3>
              </Form.Label>
              <Form.Range
                name="hello"
                defaultValue={confidenceValue}
                min={1}
                max={10}
                onChange={(e) => setConfidenceValue(e.target.value)}
                className="custom-slider"
              />
              <Row className="justify-content-center " >
                <Col className="d-flex flex-column nopadding" xs={3}>
                  <h4 className="my-auto">{ThisFight.RedOdds}</h4>
                </Col>
                <Col className="d-flex flex-column nopadding" xs={3}>
                  <h5 style={{ textAlign: "center" }} className="my-auto">
                    Odds
                  </h5>
                </Col>
                <Col className="d-flex flex-column nopadding"  xs={3}>
                  <h4 style={{ textAlign: "right" }} className="my-auto">
                    {ThisFight.BlueOdds}
                  </h4>
                </Col>
              </Row>
              <Row className="justify-content-center">
                {currentUser.UserID !== null && (
                  <Button
                    className="bg-dark"
                    onClick={() => updatePrediction()}
                  >
                    <h5>UPDATE</h5>
                  </Button>
                )}
                {currentUser.UserID === null && (
                  <Button className="bg-dark" disabled>
                    <h5>UPDATE</h5>
                  </Button>
                )}
              </Row>
            </Form>
          </Col>
          <Col>
            <Row>
              <Col className="d-flex flex-column justify-content-left nopadding" xs={1}>
                {BlueFighterBrief?.FighterID !== 0 && (
                  <OverlayTrigger
                    key={BlueFighterID}
                    trigger="click"
                    placement={"bottom"}
                    rootClose
                    overlay={
                      <Popover style={{ width: 500 }} id="popover-basic">
                        <Popover.Header style={{ width: 500 , paddingBottom: 0}}>
                          <h3>Some Thoughts</h3>
                        </Popover.Header>
                        <Popover.Body style={{ width: 500 }}>
                          <p>
                            <strong>Overview:</strong>{" "}
                            {BlueFighterBrief?.BriefText}
                          </p>
                          <p>
                            <strong>Pros:</strong> {BlueFighterBrief?.Pros}
                          </p>
                          <p>
                            <strong>Cons:</strong> {BlueFighterBrief?.Cons}
                          </p>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <Image className="my-auto mx-auto" src={infocircle} />
                  </OverlayTrigger>
                )}
              </Col>
              <Col>
                <h2 style={{ textAlign: "right" }} className="ms-auto">
                  {blueFighter?.FirstName}
                </h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2 style={{ textAlign: "right" }} className="">
                  {blueFighter?.LastName}
                </h2>
              </Col>
            </Row>

            {blueFighter.Nickname !== "" && (
              <h3 style={{ textAlign: "right" }}>"{blueFighter?.Nickname}"</h3>
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

            <Row>
              <Col className="d-flex flex-column justify-content-right">
                <Form.Check
                  checked={selectedWinner === BlueFighterID && true}
                  name={ThisFight.FightID.toString()}
                  type="radio"
                  reverse
                  className="my-auto"
                  id={"2"}
                  onChange={() => setSelectedWinner(blueFighter.FighterID)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {errorToastShow && (
          <BasicToast
            bodyText={errorToastBodyText}
            onClick={() => setErrorToastShow(false)}
            titleText="USER ERROR"
          />
        )}
      </Container>
    </>
  );
};

export default FightPrediction;
