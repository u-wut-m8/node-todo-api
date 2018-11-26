const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

var password = "123abc";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = "$2a$10$iI2h1yIPNEFT3gcpAQmJgu9sVc0jqwnVb4nx9egYiv6vA7BjXqeO.";
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, "123abc");
// console.log(token);
//
// var decoded = jwt.verify(token, "123abc");
// console.log("Decoded: ", decoded);
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
