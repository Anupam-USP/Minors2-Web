const express = require("express");
const bodyParser = require("body-parser");
// const datepicker = require("js-datepicker");

const app = express();

app.use(express.urlencoded({ extented: true }));

const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const url =
  "mongodb+srv://anupamAdmin:anupamAdmin@cluster0.2c2zj.mongodb.net/student_db";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("student.ejs");
});

app.get("/records", (req, res) => {
  const database = client.db("student_db");
  const students = database.collection("student_records");
  students.find({}).toArray(function (err, std_record) {
    // console.log(std_record);
    res.render("records", {
      records: std_record,
    });
  });
});

app.get("/Student", function (req, res) {
  res.redirect("/");
});

app.get("/Admin", function (req, res) {
  res.render("Admin.ejs");
});

app.get("/cal", function (req, res) {
  res.render("cal.ejs");
});

app.get("/stdTable", (req, res) => {
  // res.render("stdTable");
  const database = client.db("student_db");
  const students = database.collection("student_records");
  students.find({}).toArray(function (err, std_record) {
    // console.log(std_record);
    res.render("stdTable", {
      records: std_record,
    });
  });
});

app.post("/", function (req, res) {
  let roll = req.body.rollno;
  const database = client.db("student_db");
  const students = database.collection("student_records");
  students.find({}).toArray(function (err, std_record) {
    res.render("stdTable", {
      records: std_record,
      rollno: roll,
      basis: 1,
    });
  });
});

app.post("/cal", function (req, res) {
  console.log(req.body);
  // let name = req.body.stdName;
  let date = req.body.date;
  const database = client.db("student_db");
  const students = database.collection("student_records");
  students.find({}).toArray(function (err, std_record) {
    res.render("stdTable", {
      records: std_record,
      date: date,
      basis: 2,
    });
  });
});

// app.get("/Student", function (req, res) {
//   res.redirect("/")
// });

function fetchData() {
  const database = client.db("student_db");
  const students = database.collection("student_records");
  students.find({}).toArray(function (err, std_record) {
    // console.log(std_record);
    return std_record;
  });
}

async function run() {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("App listening at http://localhost:" + port);
});
