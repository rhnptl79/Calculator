var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const { calculate } = require("./src/calculator");

// set the view engine to ejs
app.set("view engine", "ejs");
// parse html forms
app.use(bodyParser.urlencoded({ extended: false }));

// index page
app.get("/", function (req, res) {
  res.redirect("/calculator");
});

// calculator page
app.get("/calculator", function (req, res) {
  let operationResult = {
    firstNumber: "",
    secondNumber: "",
    result: "",
    error: false,
  };
  // use res.render to load up an ejs view file
  res.render("pages/calculator", operationResult);
});

// calculator tasks
app.post("/calculator", function (req, res) {
  const { firstNumber, secondNumber, operation } = req.body;
  const operationResult = calculate(firstNumber, secondNumber, operation);
  console.log("Operation result -- ", operationResult);
  res.render("pages/calculator", operationResult);
});

app.listen(8080);
console.log(
  "Server is listening on port 8080 so visit http://localhost:8080/calculator"
);
