const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length) return res.json(users);
      return req.status(204).send({ message: 'NO CONTENT' });
    })
    .catch((err) => res.status(500).send({ err }));
};

const getQtyUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length) return res.json(users.length);
      return req.status(204).send({ message: 'NO CONTENT' });
    })
    .catch((err) => res.status(500).send({ err }));
};

const postUser = (req, res) => {
  let user = new User(req.body);
  user
    .save()
    .then((user) => res.status(201).send({ user }))
    .catch((err) => res.status(500).send({ err }));
};

const getUserById = (req, res, next) => {
  const { params } = req;

  User.find(params)
    .then((users) => {
      if (users.length) return res.json(users);
      return res.sendStatus(204);
    })
    .catch((err) => {
      req.body.error = err;
      next();
    });
};

const getUsersOlderThan = (req, res) => {
  let aux = [];
  const { params } = req;
  console.log(params);
  User.find({})
  .then((users) => {
    users.forEach((user) =>{
      if(user.age >= params.age){
        aux.push(user);
      }
    })
    if (users.length) return res.json(aux);
    return req.status(204).send({ message: 'NO CONTENT' });
  })
  .catch((err) => res.status(500).send({ err }));
};

const getUsersYoungerThan = (req, res) => {
  const { params } = req;
  const { age } = params;
  const aux = [];

  persons.forEach((person) => {
    if (person.age < age) aux.push(person);
  });

  if (aux) return res.json(aux);
};

module.exports = {
  getUsers,
  getQtyUsers,
  postUser,
  getUserById,
  getUsersOlderThan,
  getUsersYoungerThan,
};
