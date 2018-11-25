const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require("./models/todo.js");
const {User} = require("./models/user.js");
const {ObjectID} = require("mongodb");

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get("/todos/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send();
  Todo.findById(req.params.id).then((todo) => {
    if (todo)
      return res.send({todo});
    return res.status(404).send();
  }, (err) => {
    res.status(400).send();
  });
});

app.delete("/todos/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).send();
  Todo.findByIdAndRemove(req.params.id).then((todo) => {
    if (!todo)
      return res.status(404).send();
    return res.send({todo});
  }).catch((err) => {
    return res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
