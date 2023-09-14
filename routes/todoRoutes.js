const express = require('express')
const todoController = require('../controllers/todoController')
const router = express.Router()
const { addId } = require('../middleware/authMiddleware')


router.get('/', todoController.todo_index)
router.get('/todos', addId, todoController.get_todos)
router.post('/todos', addId, todoController.post_todo)
router.delete('/todos/:id', todoController.delete_todo)
router.patch('/todos/:id', todoController.update_todo)

module.exports = router;