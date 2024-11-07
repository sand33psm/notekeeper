import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../slices/themeSlice';

const NotFoundPage = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} flex flex-col items-center justify-center`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <button
            onClick={() => dispatch(toggleDarkMode(!darkMode))}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'}`}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      

      <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl">Oops! Page not found.</p>
        <Link
          to="/"
          className={`px-6 py-3 rounded-md text-lg font-medium ${
            darkMode
              ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
              : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
          }`}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;