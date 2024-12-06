const mysql = require("mysql2");
const dotenv = require("dotenv");
const { json } = require("express");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
  })
  .promise();

module.exports = {
  GetUserAsync: async function (userid) {
    const [result] = await pool.query(
      `
            select * 
            from User 
            where UserID = ?`,
      [userid]
    );
    return result[0];
  },

  GetUserWEmailAndUsername: async function (jsonBody) {
    const [result] = await pool.query(
      `
                select * from User where 
                Email = ? and Username = ?
            `,
      [jsonBody["Email"], jsonBody["Username"]]
    );
    return result[0];
  },

  GetAllUsers: async function () {
    const [result] = await pool.query(`
            select * 
            from User `);
    return result[0];
  },

  CreateUserAsync: async function (jsonBody) {
    const [result] = await pool.query(
      `
                insert into User 
                    (FirstName, LastName, CreatedDate, UpdatedDate, Email, Username)
                values(
                    ?,?
                    ,current_timestamp() ,current_timestamp()
                    ,?,?)  
            `,
      [
        jsonBody["FirstName"],
        jsonBody["LastName"],
        jsonBody["Email"],
        jsonBody["Username"],
      ]
    );
  },

  UserExistsAsync: async function (jsonBody) {
    console.log("CHECKING");
    const [result] = await pool.query(
      `
            select count(*) 
            from User
            where Email = ?
            and Username = ?`,
      [jsonBody["Email"], jsonBody["Username"]]
    );
    console.log(result[0]["count(*)"]);
    // if(result[0]["count(*)"] === '0'){
    //     return false;
    // }
    return result[0]["count(*)"];
  },

  //MMA STARTS HERE
  GetNextEvent: async function () {
    const [result] = await pool.query(`
            select * from Event
            where EventDate > NOW() - INTERVAL 6 HOUR
            order by EventDate
            limit 1
        `);
    return result[0];
  },
  GetEventFights: async function (eventid) {
    const [result] = await pool.query(
      `
          select * from Fight
          where EventID = ?
      `,
      [eventid]
    );
    return result;
  },
  GetAllFights: async function () {
    const [result] = await pool.query(
      `
          select * from Fight
      `
    );
    return result;
  },
  GetFight: async function (fightid) {
    const [result] = await pool.query(
      `
          select * from Fight where FightID = ?
      `, [fightid]
    );
    return result;
  },

  GetFighter: async function (fighterid) {
    const [result] = await pool.query(
      `
          select * from Fighter
          where FighterID = ?
      `,
      [fighterid]
    );
    return result[0];
  },

  GetFighterBrief: async function (fighterID) {
    const [result] = await pool.query(
      `select * from FighterBrief
          where FighterID = ?`,
      [fighterID]
    );
    return result[0];
  },

  CreatePrediction: async (jsonBody) => {
    const [result] = await pool.query(
      `insert into Prediction (PredictedWinnerID, ConfidenceScore, 
      CreatedByUserID, CreatedDate
      , UpdatedDate, PredictionReasoning, FightID)
      values ( ?, ?, ?, NOW(), NOW(), ?, ?)`,
      [
        jsonBody.PredictedWinnerID,
        jsonBody.ConfidenceScore,
        jsonBody.CreatedByUserID,
        jsonBody.PredictionReasoning,
        jsonBody.FightID,
        //jsonBody.PredictedLoser,
      ]
    );
    return result;
  },
  GetPrediction: async (predictionid) => {
    const [result] = await pool.query(
      `
      select * from Prediction 
      where PredictionID = ?
      `,
      [predictionid]
    );
    return result;
  },

  GetUserEventPredictions: async (eventid, userid) => {
    const [result] = await pool.query(
      `select p.PredictionID, p.PredictedWinnerID, p.ConfidenceScore
      , p.CreatedByUserID, p.CreatedDate, p.UpdatedDate
      , p.PredictionReasoning, p.FightID, f.FightID, u.UserID
      , e.EventID from User u
      inner join Prediction p on u.UserID = p.CreatedByUserID
      inner join Fight f on f.FightID = p.FightID
      inner join Event e on e.EventID = f.EventID
      where
      e.EventID = ?
      and  u.UserID = ?`,
      [eventid, userid]
    );
    return result;
  },

  UpdatePrediction: async (jsonBody, PredictionID) => {
    const [result] = await pool.query(
      `update Prediction
      set PredictedWinnerID = ?
      , ConfidenceScore = ?
      , PredictionReasoning = ?
      where PredictionID = ?`,
      [
        jsonBody.PredictedWinnerID,
        jsonBody.ConfidenceScore,
        jsonBody.PredictionReasoning,
        PredictionID,
        //jsonBody.PredictedLoser,
      ]
    );
    return result;
  },
};

function getJSONValues(jsonBody) {
  var bodyString = JSON.stringify(jsonBody);
  return JSON.parse(bodyString);
}
