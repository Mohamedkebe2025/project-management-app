const express = require('express');
const router = express.Router();
const Space = require('../models/Space');

// GET all spaces
router.get('/', async (req, res) => {
  try {
    const spaces = await Space.find();
    res.json(spaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new space
router.post('/', async (req, res) => {
  const space = new Space({
    name: req.body.name,
  });

  try {
    const newSpace = await space.save();
    res.status(201).json(newSpace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific space
router.get('/:id', getSpace, (req, res) => {
  res.json(res.space);
});

// PUT update a space
router.put('/:id', getSpace, async (req, res) => {
  if (req.body.name != null) {
    res.space.name = req.body.name;
  }
  try {
    const updatedSpace = await res.space.save();
    res.json(updatedSpace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a space
router.delete('/:id', getSpace, async (req, res) => {
  try {
    await res.space.remove();
    res.json({ message: 'Deleted Space' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSpace(req, res, next) {
  let space;
  try {
    space = await Space.findById(req.params.id);
    if (space == null) {
      return res.status(404).json({ message: 'Cannot find space' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.space = space;
  next();
}

module.exports = router;
