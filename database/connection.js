const mongoose = require("mongoose");
const dotenv  = require("dotenv");


dotenv.config();
const url = process.env.MONGO_DB_ATLAS_CONNECTION;
console.log(url);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology : true,
  })
  .then(() => {
    console.log("Connected to DataBase.");
  })
  .catch((e) => {
    console.log("Connection Failed");
  });