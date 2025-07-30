import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import EditorScreen from './screens/EditorScreen';
import PoemDetailScreen from './screens/PoemDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Inicio"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
              elevation: 1,
              shadowOpacity: 0.1,
            },
            headerTintColor: '#2c3e50',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen 
            name="Inicio" 
            component={HomeScreen}
            options={{
              title: 'Vuelo de Palabras',
              headerStyle: {
                backgroundColor: '#fff',
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
