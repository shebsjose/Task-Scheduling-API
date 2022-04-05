const express = require("express");
const app = express();
const cors = require('cors');

require("./database/connection");

const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoute);   // parent child-authRoute
app.use('/api/task', taskRoute);

app.listen(5000, () => {
  console.log("Listening port on 5000");
});
