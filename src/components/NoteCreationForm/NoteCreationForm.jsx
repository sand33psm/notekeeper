import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../../slices/themeSlice'
import api from '../../api';

function NoteCreationForm({noteAdded, setNoteAdded}) {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [isExpanded, setIsExpanded] = useState(false);
    
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async (e) => {
        setNoteAdded((prevNoteStatus) => !prevNoteStatus)
        e.preventDefault();
        
        try {
            const res = await api.post('api/notes/', {
                "title": title,
                "content": content
            })
            setNoteAdded((prevNoteStatus) => !prevNoteStatus)
            
            
        } catch (error) {
            console.log(error);
            
        }

        setTitle("")
        setContent("")
    };

    return (
        <div className="transition-colors duration-100 max-w-7xl container mx-auto px-4 py-12">
            <div className={`mb-8 p-6 rounded-lg shadow-lg transition-colors     duration-100 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
                {!isExpanded ? (
                    <input
                        type="text"
                        placeholder="Add a note..."
                        onClick={() => setIsExpanded(true)}
                        className={`w-full p-3 rounded border ${
                            darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-4">Create New Note</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`transition-colors duration-100 w-full p-2 rounded border ${
                                        darkMode 
                                            ? 'bg-gray-700 border-gray-600' 
                                            : 'bg-white border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label htmlFor="content" className="block mb-2">
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows="4"
                                    className={`w-full p-2 rounded border ${
                                        darkMode 
                                            ? 'bg-gray-700 border-gray-600' 
                                            : 'bg-white border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    required
                                />
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Create Note
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setFormData({ title: '', content: '' });
                                    }}
                                    className={`px-4 py-2 rounded transition-colors duration-200 ${
                                        darkMode
                                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                    }`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default NoteCreationForm;