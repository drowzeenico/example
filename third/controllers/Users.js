const jwt = require("jsonwebtoken");

const { UserNotFound } = require("../Errors");
const UserModel = require("../models/Users");

class UsersController {
  constructor(req = {}) {
    this.req = req;
  }

  login() {
    try {
      const user = UserModel.findByCredentials(
        this.req.email,
        this.req.password
      );
      if (!user) throw new UserNotFound();

      return jwt.sign({ userId: user._id }, process.env.SECRET);
    } catch (e) {
      return e;
    }
  }

  greeting(user) {
    return user;
  }
}

module.exports = UsersController;
