const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  taskid: {type: String, required: true},
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  date: { type: Date, required: true },
});

module.exports = todoSchema;
