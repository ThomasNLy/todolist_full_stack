const mongoose = require("mongoose");
const todoSchema = require("./Model/ToDoSchema.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 8000;
const dbPassword = process.env.PASSWORD;

const uri = `mongodb+srv://practice:${dbPassword}@cluster0.itzhbvq.mongodb.net/`;
//
mongoose
  .connect(uri, { dbName: "tasks_to_do" })
  .then(() => console.log("success connected"))
  .catch((err) => console.log(err));

const todoDoc = mongoose.model("todos", todoSchema);

app.get("/", (req, res) => {
  res.send("server is up");
});

app.get("/todos", async (req, res) => {
  let allTasks = await todoDoc.find();
  res.json(allTasks);
  console.log(allTasks);
});

app.post("/todos", async (req, res) => {
  let addNewItem = new todoDoc({
    taskid: req.body.taskid,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    date: req.body.date,
  });

  await addNewItem
    .save()
    .then(() => res.json(addNewItem))
    .catch((err) => console.log(`${err}\n invalid data format}`));
});

app.put("/todos", async (req, res) => {
  let databaseid = req.body._id;
  await todoDoc
    .findByIdAndUpdate(databaseid, {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      date: req.body.date,
    })
    .then(async () => {
      res.json(await todoDoc.find());
    });
});

app.delete("/todos", async (req, res) => {
  let databaseid = req.body._id;
  let deletedItem = await todoDoc.findByIdAndDelete(databaseid);

  res.json(`deleted : ${deletedItem}`);
});

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
