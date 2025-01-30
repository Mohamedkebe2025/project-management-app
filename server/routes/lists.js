const express = require('express');
const router = express.Router();
const List = require('../models/List');

// GET all lists for a space
router.get('/space/:spaceId', async (req, res) => {
  try {
    const lists = await List.find({ spaceId: req.params.spaceId });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new list
router.post('/', async (req, res) => {
  const list = new List({
    name: req.body.name,
    spaceId: req.body.spaceId,
  });

  try {
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific list
router.get('/:id', getList, (req, res) => {
  res.json(res.list);
});

// PUT update a list
router.put('/:id', getList, async (req, res) => {
  if (req.body.name != null) {
    res.list.name = req.body.name;
  }
  try {
    const updatedList = await res.list.save();
    res.json(updatedList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a list
router.delete('/:id', getList, async (req, res) => {
  try {
    await res.list.remove();
    res.json({ message: 'Deleted List' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getList(req, res, next) {
  let list;
  try {
    list = await List.findById(req.params.id);
    if (list == null) {
      return res.status(404).json({ message: 'Cannot find list' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.list = list;
  next();
}

module.exports = router;
