const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");

var data = {
  id: 10
};

var token = jwt.sign(data, "123abc");
console.log(token);

var decoded = jwt.verify(token, "123abc");
console.log("Decoded: ", decoded);
// var message = "I am a random wanderer.";
// var hash = SHA256(message).toString();
//
// console.log(`Message = ${message}`);
// console.log(`Hash = ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "salt").toString()
// }
//
// token.data.id = 5;
//
// if (SHA256(JSON.stringify(token.data) + "salt").toString() === token.hash)
//   console.log("Yes");
// else
//   console.log("No");
