import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

const ThemeContext = createContext({});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

const lightTheme = {
  background: '#ffffff',
  surface: '#f8f9fa',
  primary: '#007bff',
  secondary: '#6c757d',
  text: '#2c3e50',
  textSecondary: '#6c757d',
  border: '#e9ecef',
  card: '#ffffff',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
  accent: '#17a2b8',
};

const darkTheme = {
  background: '#121212',
  surface: '#1e1e1e',
  primary: '#4dabf7',
  secondary: '#868e96',
  text: '#ffffff',
  textSecondary: '#adb5bd',
  border: '#495057',
  card: '#2d3436',
  success: '#51cf66',
  warning: '#ffd43b',
  error: '#ff6b6b',
  accent: '#22b8cf',
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme_preference');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    try {
      await AsyncStorage.setItem('theme_preference', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const value = {
    isDarkMode,
    theme,
    toggleTheme,
    loading,
  };

  if (loading) {
    return null; // O un loading spinner
  }

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para generar estilos dinámicos basados en el tema
export const useThemedStyles = (createStyles) => {
  const { theme } = useTheme();
  return createStyles(theme);
};

// Componente para transiciones suaves entre temas
export const ThemedView = ({ children, style, ...props }) => {
  const { theme } = useTheme();
  
  return (
    <View 
      style={[
        { backgroundColor: theme.background },
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

export const ThemedText = ({ children, style, variant = 'primary', ...props }) => {
  const { theme } = useTheme();
  
  const getTextColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.textSecondary;
      case 'primary':
      default:
        return theme.text;
    }
  };
  
  return (
    <Text 
      style={[
        { color: getTextColor() },
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
};