const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

var Todo = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// var newTodo = new Todo({
//   text: "Cook dinner"
// });
//
// newTodo.save().then((doc) => {
//   console.log("Saved todo to database ", doc);
// }, (err) => {
//   console.log("Unable to save todo.");
// });
//
// var myTodo = new Todo({
//   text: "Eat dinner",
//   completed: true,
//   completedAt: new Date()
// });
//
// myTodo.save().then((doc) => {
//   console.log("Saved todo to database ", doc);
// }, (err) => {
//   console.log("Unable to save todo.");
// });

var User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  }
});

var newUser = new User({
  email: "potato@banana.com"
});

newUser.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 4));
}, (err) => {
  console.log(err);
});
