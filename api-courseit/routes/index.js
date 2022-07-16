var express = require('express');
var router = express.Router();

const userController = require('../controllers/UserController');
const todoController = require('../controllers/todoController');

const adminInfo = {
  username: 'danatest',
  password: '1234',
};

function isAdmin(req, res, next) {
  const { headers } = req;
  if (headers.authorization) {
    const data = Buffer.from(
      headers.authorization.split(' ')[1],
      'base64'
    ).toString();
    const username = data.split(':')[0];
    const password = data.split(':')[1];

    if (username == adminInfo.username && password == adminInfo.password) {
      next();
    }
  }
  return res.sendStatus(401);
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/users', (req, res) =>
  userController.getUsers(req, res)
);

router.get('/api/users/cantidad', (req, res) =>
  userController.getQtyUsers(req, res)
);

router.post('/api/user', (req, res) => userController.postUser(req, res));

router.get('/api/user/:id', (req, res, next) => userController.getUserById(req, res, next));

router.get('/api/user/older/:age', (req, res) =>
  userController.getUsersOlderThan(req, res)
);

router.get('/api/user/under/:age', (req, res) =>
  userController.getUsersYoungerThan(req, res)
);


// Todoooooooooooooooos
router.get('/api/todos', (req, res) =>
  todoController.getTodos(req, res)
);

router.post('/api/todo', (req, res) => todoController.postTodo(req,res));

router.delete('/api/todo/:id', (req, res) => todoController.deleteTodo(req,res));


module.exports = router;
