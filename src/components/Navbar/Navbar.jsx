import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../../slices/themeSlice'
import { Sun, Moon, Menu } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar({buttonType}) {
    const darkMode = useSelector((state) => state.theme.darkMode)
    const dispatch = useDispatch()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`w-full transition-colors duration-100 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to={'/'} className={`text-xl font-bold hover:cursor-pointer hover:text-orange-500 ${darkMode ? 'text-white' : 'text-gray-800'}`}>NoteKeeper</Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => dispatch(toggleDarkMode(!darkMode))}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {
                buttonType ? 
                <Link to={`/${buttonType}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {buttonType}
                </Link> : 
                ""
              }
            </div>

            {/* Mobile Menu and Dark Mode Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={() => dispatch(toggleDarkMode(!darkMode))}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {
                buttonType ? 
                <Link to={`/${buttonType}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {buttonType}
                </Link> : 
                ""
              }
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                {
                buttonType ? 
                <Link to={`/${buttonType}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {buttonType}
                </Link> : 
                ""
                }
              </div>
            </div>
          )}
        </div>
      </nav>
  )
}