# 📱 **DEMO - Vuelo de Palabras**
*Guía para probar la aplicación en tu celular*

## 🚀 **Opción 1: Demo Inmediato con Expo Go (Recomendado)**

### Paso 1: Instalar Expo Go
Descarga **Expo Go** en tu celular:
- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

### Paso 2: Ejecutar la aplicación
1. **En tu computadora**, abre terminal en la carpeta del proyecto
2. Ejecuta:
```bash
npm install
npx expo start
```
3. **Aparecerá un QR Code** en la terminal

### Paso 3: Conectar tu celular
1. **Abre Expo Go** en tu celular
2. **Escanea el QR** que aparece en la terminal
3. **¡Listo!** La app se cargará en tu celular

---

## 🔥 **Opción 2: Configurar tu propio Firebase (Personalizado)**

Si quieres tu propia base de datos:

### Paso 1: Crear proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "vuelo-de-palabras-tuyo"
3. Habilita **Authentication** > **Email/Password**
4. Crea **Firestore Database** en modo de prueba

### Paso 2: Obtener configuración
1. Ve a configuración del proyecto (⚙️)
2. Añade una app **Web**
3. Copia la configuración `firebaseConfig`

### Paso 3: Actualizar credenciales
Reemplaza en `utils/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "TU-API-KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  // ... resto de tu configuración
};
```

---

## 📱 **Cómo probar la sincronización**

### Demo de Sincronización en Tiempo Real:

1. **Registra una cuenta** en la app de tu celular
2. **Crea algunos poemas**
3. **Abre la misma app en el navegador**:
   ```bash
   npx expo start --web
   ```
4. **Inicia sesión** con la misma cuenta
5. **¡Verás tus poemas sincronizados!**

### Pruebas para hacer:
- ✅ **Escribir poema en celular** → Ver en web
- ✅ **Editar poema en web** → Ver cambios en celular  
- ✅ **Eliminar en celular** → Desaparece en web
- ✅ **Crear en web** → Aparece en celular

---

## 🎯 **Funcionalidades del Demo**

### ✨ **Pantallas disponibles:**
- **Login/Registro**: Crea tu cuenta
- **Lista de poemas**: Ve todos tus poemas
- **Editor**: Escribe nuevos poemas
- **Vista detalle**: Lee poemas completos
- **Compartir**: Comparte tus creaciones

### 🔄 **Características en tiempo real:**
- Sincronización instantánea entre dispositivos
- Sin necesidad de refrescar manualmente
- Datos seguros por usuario
- Funciona offline (con sync al reconectar)

---

## 🛠️ **Solución de Problemas**

### Si no carga la app:
1. **Verifica la conexión**: Celular y PC deben estar en la misma red WiFi
2. **Reinicia Expo**: Presiona `r` en la terminal
3. **Limpia cache**: Presiona `c` en la terminal

### Si no funciona Firebase:
1. **Revisa la consola** del navegador (F12)
2. **Verifica credenciales** en `utils/firebase.js`
3. **Chequea las reglas** de Firestore

### Errores comunes:
- **"Firebase already initialized"**: Normal, la app maneja esto
- **"Network error"**: Verifica conexión a internet
- **"Auth error"**: Verifica email y contraseña

---

## 📊 **Datos del Demo**

### Base de datos incluye:
- Sistema de usuarios completo
- Almacenamiento de poemas en la nube
- Sincronización automática
- Reglas de seguridad por usuario

### Límites del demo:
- **500 usuarios** simultáneos máximo
- **1GB** de datos total
- **50,000** operaciones por día

---

## 🎥 **Video Demo Sugerido**

Para hacer un video demostrativo:

1. **Mostrar registro** de usuario
2. **Escribir un poema** en el celular
3. **Abrir web** y mostrar el mismo poema
4. **Editar en web** y mostrar cambio en celular
5. **Crear nuevo poema** en web
6. **Mostrar aparición** en celular

---

## 🚀 **¡Listo para probar!**

La aplicación está completamente funcional con:
- ✅ Autenticación segura
- ✅ Sincronización en tiempo real
- ✅ Interfaz elegante y responsive
- ✅ Funciona en móvil y web
- ✅ Datos privados por usuario

### Comandos rápidos:
```bash
# Instalar dependencias
npm install

# Ejecutar en celular (Expo Go)
npx expo start

# Ejecutar en web
npx expo start --web

# Limpiar cache si hay problemas
npx expo start --clear
```

**¡Disfruta probando Vuelo de Palabras!** ✨📝

---

*¿Problemas? La configuración Firebase está lista para usar. Solo escanea el QR y comienza a escribir poemas.*