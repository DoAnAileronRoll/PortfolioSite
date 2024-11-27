const express = require("express");
const userRouter = express.Router();
const repo = require("../repo");
userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
  res.status(200).send({
    Users: await repo.GetAllUsers(),
  });
});

userRouter.post("/create", async (req, res) => {
  //console.log(req.body)
  var bodyString = JSON.stringify(req.body);
  var objectValue = JSON.parse(bodyString);

  console.log("CHECKING");
  if ((await repo.UserExistsAsync(req.body)) === 0) {
    //create
    repo.CreateUserAsync(req.body);
    console.log("CREATE RECEIVED");
    res.status(200).send({
      Body: req.body,
      Email: objectValue["Email"],
      Username: objectValue["Username"],
      LastName: objectValue["LastName"],
      FirstName: objectValue["FirstName"],
    });
  } else {
    res.status(400).send({ message: "Username Email combo already exists" });
  }
});

userRouter.post("/login", async (req, res) => {
  //   var bodyString = JSON.stringify(req.body);
  //   var objectValue = JSON.parse(bodyString);

  console.log(req.body);

  if (
    (req.body["Email"] !== null &&
      req.body["Username"] !== null &&
      (await repo.UserExistsAsync(req.body))) === 1
  ) {
    var responseBody = await repo.GetUserWEmailAndUsername(req.body);
    res.status(200).send({
      Body: responseBody,
    });
  } else {
    res.status(400).send({ message: "Email username combo does not exist" });
  }
});

userRouter.get("/:UserID", async (req, res) => {
  const { UserID } = req.params;

  if (!UserID) {
    res.status(400).send({ message: "No UserID Specified" });
  }

  res.status(200).send({
    User: req.User,
  });
});

userRouter.param("UserID", async (req, res, next, UserID) => {
  req.User = await repo.GetUserAsync(UserID);
  next();
});

module.exports = userRouter;
