// AuthContext.js
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        navigate('/chats');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const value = {
    user,
    login: async (provider) => {
      try {
        const result = await auth.signInWithPopup(provider);
        console.log('User logged in:', result.user);
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    logout: async () => {
      try {
        await auth.signOut();
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
