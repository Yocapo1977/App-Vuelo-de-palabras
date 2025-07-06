import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EditorScreen from './screens/EditorScreen';
import PoemDetailScreen from './screens/PoemDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Editar" component={EditorScreen} />
        <Stack.Screen name="Detalle" component={PoemDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
