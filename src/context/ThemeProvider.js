import React, { createContext, useState } from 'react'
export const ThemeContext = createContext();
export const LightTheme = {
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    subText: '#666666',
    primary: '#007BFF',
    textback: '#065D54',
};
export const DarkTheme = {
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    subText: '#AAAAAA',
    primary: '#4280EF',
    textback: 'black',
};
const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const theme = darkMode ? DarkTheme : LightTheme;
    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode,
                theme,
            }}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeProvider;