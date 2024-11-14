import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import Note from '../../components/Note/Note';
import api from '../../api';
import { toggleDarkMode } from '../../slices/themeSlice';
import Navbar from '../../components/Navbar/Navbar';
import NoteCreationForm from '../../components/NoteCreationForm/NoteCreationForm';

const Notes = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [notes, setNotes] = useState([]);
  const [noteAdded, setNoteAdded] = useState(false);
  const [noteDeleted, setNotedeleted] = useState(false);
  const [noteEdited, setNoteEdited] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  const deleteNote = async (id) => {
    setNotedeleted(false);
    console.log("Id => ", id);
    try {
      const res = await api.delete(`/api/notes/${id}/`);
      console.log(res);
      if (res.status === 204) {
        setNotedeleted(true);
        alert("Note deleted successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async (id, { title, content }) => {
    setNoteEdited(false);
    console.log("Iside onEdit => id ", id);
    try {
      const res = await api.put(`api/notes/${id}/`, { title, content });
      console.log(res.data);
      setNoteEdited(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('api/notes/');
        setNotes(res.data);
      } catch (error) {
        console.log("Failed to fetch data", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    })();
  }, [noteAdded, noteDeleted, noteEdited]);

  return (
    <div className={`min-h-screen transition-colors duration-100 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
      <Navbar buttonType={"Logout"} />

      <NoteCreationForm noteAdded={noteAdded} setNoteAdded={setNoteAdded} />

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-blue-600 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Notes container */}
      {!loading && (
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Note key={note.id} id={note.id} title={note.title} content={note.content} date={note.created_at} onDelete={deleteNote} onEdit={editNote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
