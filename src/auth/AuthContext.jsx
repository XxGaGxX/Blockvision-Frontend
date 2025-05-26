import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    
    const [isLogged, setIsLogged] = useState(() => {
        const storedValue = localStorage.getItem('isLogged');
        return storedValue === 'true'; 
    });

    const [favoritesCoins, setFavoritesCoins] = useState(() => {
        const oldFavCoins = localStorage.getItem('favoritesCoins')
        return Array.isArray(oldFavCoins)
    })

    useEffect(() => {
        localStorage.setItem('isLogged', isLogged);
        localStorage.setItem('favoritesCoins', favoritesCoins)
    }, [isLogged, favoritesCoins]);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};