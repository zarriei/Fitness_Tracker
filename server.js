const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// const { response } = require("express");


const PORT = process.env.PORT || 3005;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useFindAndModify: false
});

//require(apiRoute)(app);
require("./routes/htmlroutes.js")(app);
require("./routes/apiroutes.js")(app);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});