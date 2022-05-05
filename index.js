const express = require("express");
const app = express();
const cors = require('cors');
const dotenv  = require("dotenv");
require("./database/connection");
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);   // parent child-authRoute
app.use('/api/task', taskRoute);

app.listen(port, host, () => {
  console.log(`Listening port on ${port}`);
});
