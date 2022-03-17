const express = require("express");
const app = express();

require("./database/connection");

app.listen(5000, () => {
  console.log("Listening port on 5000");
});
