import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Notes.css';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('No token found. Redirecting to login.');
      navigate('/');
    } else {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      alert('Unauthorized or failed to load notes.');
      navigate('/');
    }
  };

  const createNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please enter both a title and content');
      return;
    }
    try {
      if (editNoteId) {
        // Update existing note
        await axios.put(
          `http://localhost:5000/api/notes/${editNoteId}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditNoteId(null); // Clear editing state
      } else {
        // Create new note
        await axios.post(
          'http://localhost:5000/api/notes',
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err) {
      alert('Failed to create/update note');
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      alert('Failed to delete note');
    }
  };

  const startEditing = (note) => {
    setEditNoteId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const cancelEditing = () => {
    setEditNoteId(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="notes-container">
      <h2>Your Notes</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button onClick={createNote}>
        {editNoteId ? 'Update Note' : 'Add Note'}
      </button>
      {editNoteId && (
        <button onClick={cancelEditing} className="cancel-btn">
          Cancel
        </button>
      )}

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map(note => (
            <li key={note._id} className="note-item">
              <strong>{note.title}</strong>: {note.content}
              <div className="note-actions">
                <button onClick={() => startEditing(note)}>Edit</button>
                <button onClick={() => deleteNote(note._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
        }}
        className="logout-btn"
      >
        Logout
      </button>
    </div>
  );
}
