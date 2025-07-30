import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import EditorScreen from './screens/EditorScreen';
import PoemDetailScreen from './screens/PoemDetailScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

// Componente para manejar la navegación basada en autenticación
function AppNavigator() {
  const { user, initializing } = useAuth();
  const { theme } = useTheme();

  if (initializing) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.surface,
            elevation: 1,
            shadowOpacity: 0.1,
          },
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: theme.text,
          },
          headerBackTitleVisible: false,
        }}
      >
        {user ? (
          // Usuario autenticado - Mostrar pantallas principales
          <>
            <Stack.Screen 
              name="Inicio" 
              component={HomeScreen}
              options={{
                title: 'Vuelo de Palabras',
                headerStyle: {
                  backgroundColor: theme.background,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                },
              }}
            />
            <Stack.Screen 
              name="Editar" 
              component={EditorScreen}
              options={{
                title: 'Nuevo Poema',
              }}
            />
            <Stack.Screen 
              name="Detalle" 
              component={PoemDetailScreen}
              options={{
                title: 'Poema',
              }}
            />
          </>
        ) : (
          // Usuario no autenticado - Mostrar pantallas de auth
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{
                title: 'Iniciar Sesión',
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{
                title: 'Crear Cuenta',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
