const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const note = await Note.create({ title, content, tags, user: req.user._id });
    res.status(201).json(note);
  } catch {
    res.status(500).json({ message: 'Failed to create note' });
  }
};

exports.getNotes = async (req, res) => {
    try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

exports.getNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
};

exports.updateNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { title, content, tags },
    { new: true }
  );
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json({ message: 'Note deleted' });
};
