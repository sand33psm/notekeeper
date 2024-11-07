import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../slices/themeSlice';
import { Pencil, Trash2, X, Check } from 'lucide-react';

function Note({ id, title, content, date, onDelete, onEdit }) {

  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onEdit(id, {
      title: editedTitle,
      content: editedContent
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <div className={`rounded-lg shadow-md overflow-hidden transition-colors duration-100 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Note header with title and action buttons */}
      <div className={`px-6 py-4 border-b ${
        darkMode ? 'border-gray-600' : 'border-gray-200'
      } flex justify-between items-start`}>
        <div className="flex-grow">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className={`w-full text-lg font-bold mb-2 px-2 py-1 rounded ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              } border`}
            />
          ) : (
            <h3 className="text-lg font-bold mb-2">{title}</h3>
          )}
        </div>
        <div className="flex space-x-2 ml-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 rounded-full hover:bg-green-100 text-green-600 transition-colors duration-200"
                title="Save"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors duration-200"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className={`p-2 rounded-full ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                } transition-colors duration-200`}
                title="Edit"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(id)}
                className={`p-2 rounded-full ${
                  darkMode 
                    ? 'hover:bg-red-900/50 text-red-400 hover:text-red-300' 
                    : 'hover:bg-red-100 text-red-600 hover:text-red-700'
                } transition-colors duration-200`}
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Note content */}
      <div className={`px-6 py-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className={`w-full min-h-[100px] px-2 py-1 rounded ${
              darkMode 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-gray-50 border-gray-200'
            } border`}
          />
        ) : (
          content
        )}
      </div>

      {/* Note date */}
      <div className={`px-6 py-4 border-t ${
        darkMode ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-500'
      }`}>
        {date}
      </div>
    </div>
  )
}

export default Note;