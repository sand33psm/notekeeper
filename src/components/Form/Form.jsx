import React, { useState } from 'react';
import api from '../../api'
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { useSelector } from 'react-redux';

const Form = ({ route, method }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username && !password){
      setError("Username or password is blank");
      return
    }

    try {
      const res = await api.post(route, { username, password })
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setTimeout(() => {
          if (
            localStorage.getItem(ACCESS_TOKEN) &&
            localStorage.getItem(REFRESH_TOKEN)
          ) {
            navigate("/notes");
          } else {
            setError("Failed to store tokens in localStorage");
          }
        }, 100); // Delay in milliseconds
      } else {
        navigate("/login")
      }
    } catch (error) {
      if (error.response.data.detail === "No active account found with the given credentials") {
        setError(
          <p className="text-base">
              No active account found with the given credentials. If you don't have an account,
              please{' '}
              <Link
                to="/register"
                className={`font-medium text-lg ${
                  darkMode ? 'text-red-300 hover:text-red-200' : 'text-white hover:text-gray-200'
                }`}
              >
                Create One
              </Link>
              .
            </p>
        );
      } else {
        setError(error.response.data.detail || "An error occurred, please try again.");
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} flex items-center justify-center px-4 sm:px-6 lg:px-8`}>
      <div className={`shadow-lg rounded-lg w-full max-w-md mx-auto p-8 sm:p-12 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>           
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">{method === "login" ? "Welcome back!" : "Create an account"}</h1>
        </div>

        {error && (
          <div className={`bg-red-500 text-white rounded-md px-4 py-2 mb-4 ${darkMode ? 'bg-red-700' : 'bg-red-500'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? 'bg-gray-700 text-white placeholder-gray-400'
                : 'bg-gray-200 text-gray-900 placeholder-gray-500'
            }`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? 'bg-gray-700 text-white placeholder-gray-400'
                : 'bg-gray-200 text-gray-900 placeholder-gray-500'
            }`}
          />
          <button
            type="submit"
            className={`rounded-md px-4 py-2 w-full ${
              darkMode
                ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
            }`}
          >
            {method === 'login'? "Log In" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {method === 'login' ? (
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-600 font-medium">
                Sign up
              </Link>
            </p>
          ) : (
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                Log in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;