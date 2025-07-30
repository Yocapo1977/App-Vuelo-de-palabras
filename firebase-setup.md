# 🔥 Configuración de Firebase para Vuelo de Palabras

## Pasos para configurar Firebase

### 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Nombra tu proyecto: `vuelo-de-palabras`
4. Configura Google Analytics (opcional)

### 2. Configurar Authentication

1. En el panel de Firebase, ve a **Authentication**
2. Haz clic en "Comenzar"
3. Ve a la pestaña **Sign-in method**
4. Habilita "Correo electrónico/contraseña"

### 3. Configurar Firestore Database

1. Ve a **Firestore Database**
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (por ahora)
4. Elige una ubicación cercana a tus usuarios

### 4. Configurar reglas de seguridad

Ve a las reglas de Firestore y reemplázalas con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acceso a poemas solo para usuarios autenticados
    match /poems/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 5. Obtener configuración para la app

1. En "Configuración del proyecto" (⚙️)
2. Desplázate hasta "Tus aplicaciones"
3. Haz clic en "Agregar app" y selecciona "Web"
4. Registra la app con el nombre "Vuelo de Palabras Web"
5. Copia la configuración `firebaseConfig`

### 6. Actualizar el archivo firebase.js

Reemplaza las credenciales en `utils/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key-aquí",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 7. Para configuración móvil (opcional)

Para React Native puro, también necesitarás:

1. Crear app para Android/iOS en Firebase
2. Descargar `google-services.json` (Android) y `GoogleService-Info.plist` (iOS)
3. Seguir instrucciones específicas de React Native Firebase

## Características implementadas

✅ **Autenticación de usuarios**
- Registro con email y contraseña
- Inicio de sesión
- Restablecimiento de contraseña
- Persistencia de sesión

✅ **Base de datos en tiempo real**
- Sincronización automática entre dispositivos
- Escucha cambios en tiempo real
- Operaciones CRUD para poemas

✅ **Migración automática**
- Migra poemas locales a la nube al registrarse
- Mantiene compatibilidad con datos existentes

## Seguridad

- Los datos están protegidos por autenticación
- Cada usuario solo puede acceder a sus propios poemas
- Las reglas de Firestore validan permisos en el servidor

## Funcionalidades de sincronización

- **Escribir en móvil → Ver en web**: ✅
- **Escribir en web → Ver en móvil**: ✅
- **Editar en cualquier dispositivo**: ✅
- **Eliminar se refleja en todos los dispositivos**: ✅
- **Tiempo real**: Los cambios aparecen inmediatamente

¡Una vez configurado Firebase, la aplicación tendrá sincronización completa entre todos los dispositivos!