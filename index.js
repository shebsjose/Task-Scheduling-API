const express = require("express");
const app = express();
const cors = require('cors');

require("./database/connection");

const authRoute = require("./routes/auth");
app.use(cors());

app.use(express.json());

app.use('/api/user', authRoute);   // parent child-authroute

app.listen(5000, () => {
  console.log("Listening port on 5000");
});
