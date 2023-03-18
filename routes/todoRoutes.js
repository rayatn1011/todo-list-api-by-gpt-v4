const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.protect, todoController.createTodo);
router.get('/', authMiddleware.protect, todoController.getTodos);
router.patch('/:todoId', authMiddleware.protect, todoController.updateTodo);
router.delete('/:todoId', authMiddleware.protect, todoController.deleteTodo);

module.exports = router;
