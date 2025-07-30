import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Configuración de Firebase para DEMO - Proyecto público de prueba
const firebaseConfig = {
  apiKey: "AIzaSyBqHwYJfGdY2Zj4nF4I5XwqyF7aU3BzXcE",
  authDomain: "vuelo-de-palabras-demo.firebaseapp.com",
  projectId: "vuelo-de-palabras-demo",
  storageBucket: "vuelo-de-palabras-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configurar Auth con persistencia
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch (error) {
    // Si ya está inicializado, usar la instancia existente
    auth = getAuth(app);
  }
}

// Inicializar Firestore
const db = getFirestore(app);

export { auth, db };
export default app;