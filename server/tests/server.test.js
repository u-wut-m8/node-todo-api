const expect = require('expect');
const supertest = require('supertest');

var {app} = require("./../server.js");
var {Todo} = require("./../models/todo.js");
var {ObjectID} = require("mongodb");

const todos = [{
  _id: new ObjectID(),
  text: "Test data 1."
}, {
  _id: new ObjectID(),
  text: "Test data 2."
}];

//Assuming we start with 0 todos before each test
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

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
