const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err, client) => {
  if (err)
    return console.log(`Unable to connect to MongoDB server.`);
  console.log("Connected to MongoDB server.");
  const db = client.db("TodoApp");
  // db.collection("Tools").findOneAndUpdate({_id: new ObjectID("5bf9425b1eb64e3bba65db99")}, {$set: {
  //   completed: true
  // }}, {returnOriginal: false}).then((result) => {
  //   console.log(result);
  // });
  db.collection("Users").findOneAndUpdate({_id: new ObjectID("5bf945ae1eb64e3bba65dc81")}, {$set: {
    name: "Tony"
  }, $inc: {
    age: 1
  }}, {returnOriginal: false}).then((result) => {
    console.log(JSON.stringify(result, undefined, 4));;
  });
  // client.close();
});
