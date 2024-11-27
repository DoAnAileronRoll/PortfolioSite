const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: [
      "Access-Control-Allow-Headers",
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
    ],
  })
);

// app.options("*", cors());
// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// };
// app.use(allowCrossDomain);

const userRouter = require("./routes/user");
const mmaRouter = require("./routes/mma");
app.use("/user", userRouter);
app.use("/mma", mmaRouter);
app.use(logger);
app.use(express.urlencoded({ extended: true }));



app.listen(PORT, () => console.log(`API Active ON http://localhost:${PORT}`));

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.get("/", (req, res) => {
  res.status(200).send({
    tshirt: "HAAAA",
    size: "large",
  });
});

function logger(req, res, next) {
  console.log(req.originalURL);
  next();
}
