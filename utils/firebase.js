import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "vuelo-de-palabras.firebaseapp.com",
  projectId: "vuelo-de-palabras",
  storageBucket: "vuelo-de-palabras.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configurar Auth con persistencia
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

// Inicializar Firestore
const db = getFirestore(app);

// Para desarrollo local (opcional)
// if (__DEV__ && Platform.OS !== 'web') {
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export { auth, db };
export default app;