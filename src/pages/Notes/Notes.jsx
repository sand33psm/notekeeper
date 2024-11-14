import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  const deleteNote = async (id) => {
    setNotedeleted(false);
    try {
      const res = await api.delete(`/api/notes/${id}/`);
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
    try {
      const res = await api.put(`api/notes/${id}/`, { title, content });
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
        setLoading(false);
      }
    })();
  }, [noteAdded, noteDeleted, noteEdited]);

  return (
    <div className={`min-h-screen transition-colors duration-100 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar buttonType={"Logout"} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Note Creation Form */}
        <NoteCreationForm noteAdded={noteAdded} setNoteAdded={setNoteAdded} />

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="spinner-border animate-ping inline-block w-32 h-32 border-4 border-solid border-green-600 rounded-full   border-top-color: bg-gray-300   border-right-color: slate-500" role="status">
              <span className="visually-hidden relative top-12 left-1 text-black">Fetching Notes</span>
            </div>
          </div>
        )}

        {/* Notes container */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Note key={note.id} id={note.id} title={note.title} content={note.content} date={note.created_at} onDelete={deleteNote} onEdit={editNote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
