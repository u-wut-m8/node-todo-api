const expect = require('expect');
const supertest = require('supertest');

var {app} = require("./../server.js");
var {Todo} = require("./../models/todo.js");
var {User} = require("./../models/user.js");
var {ObjectID} = require("mongodb");
const {todos, populateTodos, users, populateUsers} = require("./seed/seed.js");

beforeEach(populateUsers);
//Assuming we start with 0 todos before each test
beforeEach(populateTodos);

describe("POST /todos", () => {
  it("should create a new todo", (done) => {
    var text = "This is some test data.";

    supertest(app)
    .post("/todos")
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err)
        return done(err);
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it("should not create todo with invalid body data", (done) =>{
    supertest(app)
    .post("/todos")
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err)
        return done(err);
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe("GET /todos", () => {
  it("should get all todos", (done) => {
    supertest(app)
    .get("/todos")
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    }).end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return todo document", (done) => {
    supertest(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    }).end(done);
  });

  it("should return 404 if todo not found", (done) => {
    supertest(app)
    .get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it("should return 404 for non-object ids", (done) => {
    supertest(app)
    .get(`/todos/123abc`)
    .expect(404)
    .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should remove a todo", (done) => {
    var id = todos[0]._id.toHexString();
    supertest(app)
    .delete(`/todos/${id}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(id);
    }).end((err, res) => {
      if (err)
        return done(err);
      Todo.findById(id).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });

  it("should return 404 if todo not found", (done) => {
    var id = new ObjectID().toHexString();
    supertest(app)
    .delete(`/todos/${id}`)
    .expect(404)
    .end(done);
  });

  it("should return 404 for non-object ids", (done) => {
    supertest(app)
    .delete(`/todos/123abc`)
    .expect(404)
    .end(done);
  });
});

describe("PATCH /todos/:id", () => {
  it("should clear completedAt when todo is not completed", (done) => {
    var id = todos[0]._id.toHexString();
    var text = "New text.";
    supertest(app)
    .patch(`/todos/${id}`)
    .send({
      completed: false,
      text
    }).expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    }).end(done);
  });

  it("should update the todo", (done) => {
    var id = todos[1]._id.toHexString();
    var text = "New text.";
    supertest(app)
    .patch(`/todos/${id}`)
    .send({
      completed: true,
      text
    }).expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA("number");
    }).end(done);
  });
});

describe("describe GET /user/me", () => {
  it("should return user if authenticated", (done) => {
    supertest(app)
    .get("/users/me")
    .set("x-auth", users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    }).end(done);
  });

  it("should return 401 if not authenticated", (done) => {
    supertest(app)
    .get("/users/me")
    .expect(401)
    .expect((res) => {
      expect(res.body).toEqual({});
    }).end(done);
  });
});

describe("POST /users", () => {
  it("should create a user", (done) => {
    var email = "example@example.org", password = "abcd1234!";
    supertest(app)
    .post("/users")
    .send({email, password})
    .expect(200)
    .expect((res) => {
      expect(res.headers["x-auth"]).toExist();
      expect(res.body._id).toExist();
      expect(res.body.email).toBe(email);
    }).end((err) => {
      if (err)
        return done(err);
      User.findOne({email}).then((user) => {
        expect(user).toExist();
        expect(user.password).toNotBe(password);
        done();
      });
    });
  });

  it("should return validation errors if request invalid", (done) => {
    var email = "noob.com", password = "abc";
    supertest(app)
    .post("/users")
    .send({email, password})
    .expect(400)
    .end(done);
  });

  it("should not create user if email in use", (done) => {
    var email = "user@email.org", password = "abcd123456";
    supertest(app)
    .post("/users")
    .send({email, password})
    .expect(400)
    .end(done);
  });
});
