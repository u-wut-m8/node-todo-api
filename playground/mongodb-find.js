// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", {useNewUrlParser: true}, (err, client) => {
  if (err){
    console.log("Unable to connect to MongoDB server.");
    return;
  }
  console.log("Connected to MongoDB server.");
  const db = client.db("TodoApp");
  // db.collection("Tools").find({_id: new ObjectID("5bf90459a73cca49b10dae56")}).toArray().then((docs) => {
  //   console.log("Tools");
  //   console.log(JSON.stringify(docs, undefined, 4));
  // }, (err) => {
  //   console.log(`Unable to load data: ${err}`);
  // });
  // db.collection("Tools").find().count().then((count) => {
  //   console.log(`Number of documents in the collection = ${count}`);
  // }, (err) => {
  //   console.log(`Unable to fetch data: ${err}`);
  // });
  db.collection("Users").find({name: "Potato"}).toArray().then((docs) => {
    console.log("Users");
    console.log(JSON.stringify(docs, undefined, 4));
  }, (err) => {
    console.log(`Unable to fetch data: ${err}`);
  });
  // client.close();
});
