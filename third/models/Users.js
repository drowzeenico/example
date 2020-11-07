const users = [];
for (let i = 1; i < 100; i++) {
  users.push({
    _id: i,
    name: `User${i}`,
    password: `password${i}`,
    email: `email${i}@gmail.com`,
  });
}

class UsersModel {
  constructor() {}

  static findByCredentials(email, password) {
    return users.find(u => u.email == email && u.password == password);
  }

  static findById(userId) {
    return users.find(u => u._id == userId);
  }
}

module.exports = UsersModel;
