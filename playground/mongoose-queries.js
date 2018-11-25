const {mongoose} = require("./../server/db/mongoose.js");
const {Todo} = require("./../server/models/todo.js");
const {User} = require("./../server/models/user.js");
const {ObjectID} = require("mongodb");

var id = "5bf96737a1f39b62267a7428";

// var id = "5bfa31ee2d2bbb1b331b717d";
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("Todos: ", todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("Todo: ", todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo)
//     return console.log("ID not found.");
//   console.log("Todo By ID: ", todo);
// });

User.findById(id).then((todo) => {
  if (!todo)
    return console.log("ID not found.");
  console.log(JSON.stringify(todo, undefined, 4));
}, (err) => {
  console.log(err);
});
