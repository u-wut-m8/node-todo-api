// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

var objId = new ObjectID();
console.log(objId);

MongoClient.connect("mongodb://localhost:27017/TodoApp", {useNewUrlParser: true}, (err, client) => {
  if (err){
    console.log("Unable to connect to MongoDB server.");
    return;
  }
  console.log("Connected to MongoDB server.");
  const db = client.db("TodoApp");
  db.collection("Tools").find().toArray().then((docs) => {
    console.log("Tools");
    console.log(JSON.stringify(docs, undefined, 4));
  }, (err) => {
    console.log(`Unable to load data: ${err}`);
  });
  // db.collection("Tools").insertOne({
  //   text: "Something to do.",
  //   completed: false
  // }, (err, result) => {
  //   if (err){
  //     console.log("Unable to insert todo: ", err);
  //     return;
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 4));
  // });

  // db.collection("Users").insertOne({
  //   name: "Potato",
  //   age: 20,
  //   location: "Timbuktu"
  // }, (err, result) => {
  //   if (err){
  //     console.log("Unable to insert data: ", err);
  //     return;
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();
});
