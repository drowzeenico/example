const UsersController = require("../../controllers/Users");
const { UserNotFound } = require("../../Errors");
const { validateJwt } = require("../../middlewares");

describe("login test", () => {
  it("should throw UserNotFound error", async () => {
    const requestBody = {
      email: "notExists",
      password: "wrong",
    };

    const res = new UsersController(requestBody).login();

    expect(res).toBeInstanceOf(UserNotFound);
  });

  it("should authorize user", async () => {
    const requestBody = {
      email: "email1@gmail.com",
      password: "password1",
    };

    const res = new UsersController(requestBody).login();

    expect(res).toEqual(expect.stringContaining(res));
  });
});

describe("greeting test", () => {
  it("should verify user", async () => {
    const _id = 1;
    const email = "email1@gmail.com";
    const name = 'User1';

    const request = {
      user: { userId: _id }
    };

    validateJwt(request, {}, jest.fn);

    const res = new UsersController().greeting(request.user);

    expect(res).toEqual(expect.objectContaining({ email, name, _id }));
  });
});
