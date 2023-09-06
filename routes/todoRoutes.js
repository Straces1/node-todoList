const express = require('express')
const todoController = require('../controllers/todoController')
const router = express.Router()

router.get('/', todoController.todo_index)
router.get('/todos', todoController.get_todos)
router.post('/todos', todoController.post_todo)
router.delete('/todos/:id', todoController.delete_todo)
router.patch('/todos/:id', todoController.update_todo)

module.exports = router;