const express = require('express');
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(auth);

router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
