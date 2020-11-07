const jwt = require("express-jwt");
const UsersModel = require("./models/Users");

const resultWrapper = (res, result = {}) => {
  const httpStatus = result.status || 200;
  delete result.status;

  let response = { success: true, response: result };

  if (result instanceof Error) {
    response = { success: false, error: result };
  }

  res.status(httpStatus).json(response);
};
module.exports.resultWrapper = resultWrapper;

module.exports.jwt = jwt({
  secret: process.env.SECRET,
  getToken: (req) => req.headers[process.env.JWT_HEADER],
  algorithms: ['HS256']
}).unless({
  path: ['/login']
});

module.exports.validateJwt = (req, res, next) => {
  const jwtUser = req.user;

  if (!jwtUser && req.path === "/login") {
    return next();
  }

  if (!jwtUser.userId) {
    return res.status(403).end();
  }

  const user = UsersModel.findById(jwtUser.userId);
  if (!user)
    return res.status(403).end();

  req.user = user;

  next();
};

module.exports.logger = (req, res, next) => {
  const { url, method } = req;
  const { statusCode } = res;

  console.info(`${method} ${url} ${statusCode}`);
  next();
};

module.exports.errorHandler = (err, req, res, next) => {
  console.error(err)
  if (!err.status) err.status = 500;
  resultWrapper(res, err);
};