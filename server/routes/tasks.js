const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks for a list
router.get('/list/:listId', async (req, res) => {
  try {
    const tasks = await Task.find({ listId: req.params.listId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  try {
    if (!req.body.listId || !req.body.description) {
      return res.status(400).json({ 
        error: 'Missing required fields: listId, description' 
      });
    }
    
    const task = new Task({
      description: req.body.description,
      listId: req.body.listId,
      completed: req.body.completed || false,
      dueDate: req.body.dueDate,
      priority: req.body.priority || 'medium'
    });


    const newTask = await task.save();
    await newTask.populate('listId', 'name color');
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ 
      error: 'Server Error',
      details: err.message 
    });
  }
});

// GET a specific task
router.get('/:id', getTask, (req, res) => {
  res.json(res.task);
});

// PUT update a task
router.put('/:id', getTask, async (req, res) => {
  const updates = {
    description: req.body.description,
    completed: req.body.completed,
    dueDate: req.body.dueDate,
    priority: req.body.priority
  };

  Object.keys(updates).forEach(key => {
    if (updates[key] !== undefined) {
      res.task[key] = updates[key];
    }
  });
  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a task
router.delete('/:id', getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Deleted Task' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id)
      .populate('listId', 'name _id');
      
    if (!task) {
      return res.status(404).json({ 
        error: 'Task not found' 
      });
    }
    
    res.task = task;
    next();
  } catch (err) {
    res.status(500).json({ 
      error: 'Server Error',
      details: err.message 
    });
  }

  res.task = task;
  next();
}

module.exports = router;
