
module.exports.UserNotFound = class UserNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "User not found";
    this.status = 404;
  }
}