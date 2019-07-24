const express = require("express");
const faker = require("faker");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'joinUs_db'
});



app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) AS count FROM users";

  connection.query(q, (err, response) => {
    if (err) throw err;
    let count = response[0].count
    res.render("home", {
      count: count
    });
  });
});

app.post("/register", (req, res) => {
  let q = "INSERT INTO users SET ?"
  connection.query(q, {
    email: req.body.email
  }, (err, response) => {
    if (err) throw err;
    res.redirect("/");
  });

});


app.listen(3000, _ => {
  console.log("Server running on Port 3000");
});