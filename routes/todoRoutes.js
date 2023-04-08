const todoController = require('../controllers/todoController')

const router = require('express').Router()

router.post('/add', todoController.addTodo)
router.get('/', todoController.getAllTodos)
router.get('/completed/:true', todoController.completedTodo)
router.get('/:id', todoController.getTodoById)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

module.exports = router