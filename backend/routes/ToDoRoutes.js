const express = require('express');
const router = express.Router();
const todoController = require('../controllers/ToDoController');

// Fetch todos for a specific user
router.get('/:id', todoController.getToDo);

// Save a new todo for a user
router.post('/', todoController.saveToDo);

// Update a todo
router.put('/', todoController.updateToDo);

// Delete a todo
router.delete('/', todoController.deleteToDo);

module.exports = router;
