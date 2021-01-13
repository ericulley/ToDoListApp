const express = require("express");
const todos = express.Router();
const Todo = require("../models/animals.js");

todos.get("/", (req, res) => {
    Todo.find({}, (err, found) => {
        res.json(found);
    })
})

todos.post("/", (req, res) => {
    Todo.create(req.body, (err, created) => {
        Todo.find({}, (err, found) => {
            res.json(found);
        })
    })
})

todos.put("/:id", (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updated) => {
        Todo.find({}, (err, found) => {
            res.json(found);
        })
    })
})

todos.delete("/:id", (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, deleted) => {
        Todo.find({}, (err, found) => {
            res.json(found);
        })
    })
})

module.exports = todos;