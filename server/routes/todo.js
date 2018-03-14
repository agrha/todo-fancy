var express = require('express');
var router = express.Router();
const Todo = require('../controllers/todo')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/',Todo.viewAll)
router.get('/:id',Todo.viewTodo)
router.post('/',Todo.create)
router.put('/:id',Todo.update)
router.delete('/:id',Todo.delete)

module.exports = router;
