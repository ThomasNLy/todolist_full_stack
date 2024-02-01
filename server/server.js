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
const dbPassword = process.env.Password;
const uri = `mongodb+srv://practice:${dbPassword}@cluster0.itzhbvq.mongodb.net/`;

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
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  });

  await addNewItem.save().then(() => res.json(addNewItem));
});

app.put("/todos", async (req, res) => {
  let id = req.body.id;
  await todoDoc
    .findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    })
    .then(async () => {
      res.json(await todoDoc.find());
    });
});

app.delete("/todos", async (req, res) => {
  let id = req.body.id;
  let deletedItem = await todoDoc.findByIdAndDelete(id);

  // console.log(`deleted: ${deletedItem}`);
  res.json(`deleted : ${deletedItem}`);
});

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
