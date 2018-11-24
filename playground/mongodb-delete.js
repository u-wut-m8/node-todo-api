const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err, client) => {
  if (err)
    return console.log(`Unable to connect to MongoDB server.`);
  console.log("Connected to MongoDB server.");
  const db = client.db("TodoApp");
  // db.collection("Tools").deleteMany({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // });
  // db.collection("Tools").deleteOne({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // });
  db.collection("Users").deleteMany({name: "Potato"}).then((result) => {
    console.log(JSON.stringify(result, undefined, 4));
  });
  db.collection("Users").findOneAndDelete({_id: new ObjectID("5bf9060a49323749f14c6ee1")}).then((result) => {
    console.log(result);
  });
  // client.close();
});
