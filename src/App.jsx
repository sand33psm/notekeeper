import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login"
import NotFoundPage from "./pages/NotFound/NotFound";
import Notes from "./pages/Notes/Notes";
import Register from './pages/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from './slices/themeSlice';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  function Logout() {
    localStorage.clear()
    
    return <Navigate to="/login" />
    
  }
  
  function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (

    <BrowserRouter>
      <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="/notes" element={
            <ProtectedRoute>

              <Notes />
            </ProtectedRoute>
            } 
            />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>  
    </BrowserRouter>
  )
}

export default App
