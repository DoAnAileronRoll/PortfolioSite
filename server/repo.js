const mysql = require("mysql2");
const dotenv = require("dotenv");
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
  GetNextEvent: async function () {
    const [result] = await pool.query(`
            select * from Event
            where EventDate > NOW() - INTERVAL 6 HOUR
            order by EventDate
            limit 1
        `);
    return result[0];
  },
};

function getJSONValues(jsonBody) {
  var bodyString = JSON.stringify(jsonBody);
  return JSON.parse(bodyString);
}
