import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import User from './pages/User';
import StoreOwner from './pages/StoreOwner';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const App: React.FC = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            token ? (
              role === 'ADMIN' ? (
                <Admin />
              ) : role === 'STORE_OWNER' ? (
                <StoreOwner />
              ) : (
                <User />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Explicit routes for debugging */}
        <Route path="/dashboard/user" element={token ? <User /> : <Navigate to="/login" />} />
        <Route path="/dashboard/admin" element={token ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/dashboard/store-owner" element={token ? <StoreOwner /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;