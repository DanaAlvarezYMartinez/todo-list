const Todo = require('../models/todo');

const getTodos = (req, res) => {
  Todo.find({})
    .then((todos) => {
      if (todos.length) return res.json(todos);
      return req.status(204).send({ message: 'NO CONTENT' });
    })
    .catch((err) => res.status(500).send({ err }));
};

const postTodo = (req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => res.status(201).send({ todo }))
    .catch((err) => res.status(500).send({ err }));
};

const deleteTodo = (req,res) => {
  Todo.find({id:req.params.id}).deleteOne().exec();
  return req.status(200).send({message: 'xD'})
};

module.exports = {
  getTodos,
  postTodo,
  deleteTodo,
};
