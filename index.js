const express = require("express");
const app = express();

const Login =require('./models/userLogin');

require("./database/connection");

app.use(express.json());

app.listen(5000, () => {
  console.log("Listening port on 5000");
});
