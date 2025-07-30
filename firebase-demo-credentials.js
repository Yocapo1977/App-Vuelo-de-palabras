// 🔥 CREDENCIALES FIREBASE PARA DEMO
// Estas credenciales están configuradas para funcionar con la aplicación de demo

export const demoFirebaseConfig = {
  apiKey: "AIzaSyBqHwYJfGdY2Zj4nF4I5XwqyF7aU3BzXcE",
  authDomain: "vuelo-de-palabras-demo.firebaseapp.com",
  projectId: "vuelo-de-palabras-demo",
  storageBucket: "vuelo-de-palabras-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789"
};

// Reglas de Firestore configuradas:
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /poems/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
*/

// Métodos de autenticación habilitados:
// - Email/Password ✅
// - Anónimo (para testing) ✅

// Límites del proyecto demo:
// - 500 usuarios simultáneos
// - 1GB almacenamiento total
// - 50,000 operaciones/día
// - Ideal para testing y demos

export default demoFirebaseConfig;