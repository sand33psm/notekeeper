import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { toggleDarkMode } from '../../slices/themeSlice';
import Navbar from '../../components/Navbar/Navbar';


const Home = () => {
  const dispatch = useDispatch()  
  const isAuthorizedFromRedux = useSelector((state) => state.auth.isAuthorized); // Get from Redux store
  const [isAuthorized, setIsAuthorized] = useState(isAuthorizedFromRedux); // Local state for isAuthorized
  // const isAuthorized = useSelector((state) => state.auth.isAuthorized)
  console.log("isAuthorized", isAuthorized);
  
  const darkMode = useSelector((state) => state.theme.darkMode)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsAuthorized(isAuthorizedFromRedux); // Update the local state every render
  }, [isAuthorizedFromRedux]); // Dependency array ensures it updates whenever the Redux value changes


  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 to-green-100'}`}>
      {/* Navbar */}
      {
        isAuthorized ? <Navbar buttonType={"Logout"}/> : <Navbar buttonType={"Login"}/>
      }
      {/* <Navbar buttonType={"Login"}/> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content Section */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Capture Your Thoughts, Organize Your Life
              </h1>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Transform your note-taking experience with NoteKeeper. Create, organize, and access your notes from anywhere, anytime.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                
                <Link to={'notes/'} className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg">
                  Get Started - It's Freeee
                </Link>
              </div>
            </div>
          </div>

          {/* Right Illustration Section */}
          <div className="flex-1 relative">
            {/* Laptop Illustration */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-xl transform rotate-2`}>
              <div className={`border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`}>
                <div className="space-y-2">
                  <div className={`h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full w-3/4`}></div>
                  <div className={`h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full w-1/2`}></div>
                  <div className={`h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full w-2/3`}></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className={`absolute -top-4 right-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg transform -rotate-6`}>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-500 rounded"></div>
              </div>
            </div>

            <div className={`absolute bottom-4 left-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg transform rotate-6`}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className={`w-16 h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}></div>
              </div>
            </div>

            {/* Clipboard */}
            <div className={`absolute -right-4 bottom-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg transform -rotate-12`}>
              <div className="space-y-2">
                <div className={`h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full w-16`}></div>
                <div className={`h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full w-12`}></div>
                <div className={`h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full w-14`}></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-8 right-16">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>
            <div className="absolute top-8 left-0">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;