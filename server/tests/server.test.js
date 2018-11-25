const expect = require('expect');
const supertest = require('supertest');

var {app} = require("./../server.js");
var {Todo} = require("./../models/todo.js");

const todos = [{
  text: "Test data 1."
}, {
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
  })
})
