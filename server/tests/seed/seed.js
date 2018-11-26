const {ObjectID} = require("mongodb");
const {Todo} = require("./../../models/todo.js");
const {User} = require("./../../models/user.js");
const jwt = require("jsonwebtoken");

const ObjectOneID = new ObjectID();
const ObjectTwoID = new ObjectID();
const users = [{
  _id: ObjectOneID,
  email: "temp@mail.com",
  password: "userOnePass",
  tokens: [{
    access: "auth",
    token: jwt.sign({_id: ObjectOneID, access: "auth"}, "abc123").toString()
  }]
}, {
  _id: ObjectTwoID,
  email: "user@email.org",
  password: "userTwoPass"
}];

const todos = [{
  _id: new ObjectID(),
  text: "Test data 1.",
  completed: true,
  completedAt: 345
}, {
  _id: new ObjectID(),
  text: "Test data 2."
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
