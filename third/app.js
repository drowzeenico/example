const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const UsersController = require('./controllers/Users');
const { jwt, validateJwt, logger, errorHandler, resultWrapper } = require("./middlewares");

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// jwt
app.use(jwt);
app.use(validateJwt);

// logger
app.use(logger);

app.use(errorHandler);

app.get("/greeting", (req, res) => {
  const result = new UsersController().greeting(req.user);
  resultWrapper(res, result);
});

app.post("/login", (req, res) => {
  const result = new UsersController(req.body).login();
  resultWrapper(res, result);
});

app.listen(process.env.PORT, () => {
  console.info(`Listening on port ${process.env.PORT}`);
});
