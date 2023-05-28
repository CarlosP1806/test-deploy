import './App.css'
import { Route, Routes } from "react-router-dom";

import AuthForm from './components/AuthForm';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { UserDataProvider } from './context/UserContext';
import RegisteredRoute from './components/RegisteredRoute';

function App() {

  return (
    <>
    <UserDataProvider>
      <Routes>
        <Route 
          path="/login" 
          element={
            <RegisteredRoute>
              <AuthForm />
            </RegisteredRoute>
          } 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserDataProvider>
    </>
  )
}

export default App
