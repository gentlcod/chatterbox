// AuthContext.js
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = function({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
            if (user) {
                navigate('/chats');
            }
        });

        return unsubscribe;
    }, [user, navigate]);

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
