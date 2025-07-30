# ✨ Vuelo de Palabras ✍️📱

> *"La sonrisa es el perfecto abrazo del alma, que congela en un instante la alegría y deja mudas las palabras y salpicado el corazón..."*

**Vuelo de Palabras** es una aplicación completa para poetas, soñadores y escritores que desean crear, guardar y compartir versos desde el corazón… y desde el celular o la web.

---

## 🌟 Funciones principales

- 🖋️ **Editor de poesía** - Interface minimalista y elegante para escribir
- 👤 **Cuentas de usuario** - Registro e inicio de sesión seguro
- ☁️ **Sincronización en la nube** - Tus poemas en todos tus dispositivos
- 🔄 **Tiempo real** - Los cambios se reflejan instantáneamente
- 📱 **Multiplataforma** - Compatible con móviles, tabletas y web
- 🌐 **PWA Ready** - Funciona como aplicación web progresiva
- 📤 **Compartir poemas** - Comparte tus creaciones fácilmente
- ✏️ **Edición completa** - Modifica tus poemas cuando quieras
- 📊 **Estadísticas** - Cuenta de palabras, líneas y caracteres
- 🔒 **Privacidad** - Solo tú puedes acceder a tus poemas
- 🎨 **Diseño minimalista** - Enfoque en la escritura sin distracciones

---

## 📱 Características de la App

### 🔐 Sistema de Autenticación
- Registro de usuarios con email y contraseña
- Inicio de sesión seguro
- Restablecimiento de contraseña
- Persistencia de sesión entre dispositivos

### 🏠 Pantalla Principal
- Lista de todos tus poemas sincronizados
- Vista previa del contenido
- Fechas de creación y modificación
- Contador de poemas
- Información del usuario conectado
- Botón flotante para crear nuevos poemas
- Actualización en tiempo real

### ✏️ Editor de Poemas
- Campo de título opcional
- Área de texto optimizada para poesía
- Contador de caracteres en tiempo real
- Guardado automático en la nube
- Confirmación de cambios
- Placeholder inspiracional

### 📖 Vista de Detalle
- Visualización completa del poema
- Información de creación y edición
- Estadísticas detalladas (palabras, líneas, caracteres)
- Opciones para compartir, editar y eliminar
- Interfaz elegante con tipografía serif

### ☁️ Sincronización en Tiempo Real
- Los cambios se reflejan instantáneamente en todos los dispositivos
- Escribe en el móvil, ve en la web y viceversa
- No necesitas refrescar manualmente
- Migración automática de poemas locales

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 16 o superior
- npm o yarn
- Expo CLI (opcional)

### Instalación Local

1. **Clona el repositorio:**
```bash
git clone https://github.com/Yocapo1977/App-Vuelo-de-palabras.git
cd App-Vuelo-de-palabras
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Configura Firebase:**
- Sigue las instrucciones en `firebase-setup.md`
- Actualiza las credenciales en `utils/firebase.js`

4. **Inicia la aplicación:**

**Para desarrollo web:**
```bash
npm start
# o
npx expo start --web
```

**Para desarrollo móvil:**
```bash
npx expo start
```
Luego escanea el código QR con la app Expo Go en tu móvil.

---

## 📦 Build para Producción

### Versión Web
```bash
npx expo export:web
```
Los archivos se generarán en la carpeta `dist/`

### Versión Móvil
```bash
npx expo build:android
npx expo build:ios
```

---

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desarrollo
- **Firebase** - Backend completo (Auth + Firestore)
- **React Navigation** - Navegación entre pantallas
- **Firestore** - Base de datos en tiempo real
- **Firebase Auth** - Autenticación de usuarios
- **AsyncStorage** - Almacenamiento local (migración)
- **JavaScript ES6+** - Lenguaje de programación

---

## 📁 Estructura del Proyecto

```
vuelo-de-palabras/
├── screens/
│   ├── HomeScreen.js       # Pantalla principal con lista de poemas
│   ├── EditorScreen.js     # Pantalla de edición/creación
│   ├── PoemDetailScreen.js # Pantalla de detalle del poema
│   ├── LoginScreen.js      # Pantalla de inicio de sesión
│   └── RegisterScreen.js   # Pantalla de registro
├── contexts/
│   └── AuthContext.js      # Contexto de autenticación global
├── utils/
│   ├── firebase.js         # Configuración de Firebase
│   ├── authService.js      # Servicio de autenticación
│   ├── firestoreService.js # Servicio de base de datos
│   └── storage.js          # Servicio de almacenamiento local
├── App.js                  # Componente principal y navegación
├── package.json            # Dependencias y scripts
├── app.json               # Configuración de Expo
├── firebase-setup.md      # Instrucciones de configuración
└── README.md              # Documentación
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Sistema de Usuarios
- [x] Registro de cuentas con email/contraseña
- [x] Inicio de sesión seguro
- [x] Restablecimiento de contraseña
- [x] Persistencia de sesión
- [x] Cerrar sesión

### ✅ Gestión de Poemas
- [x] Crear nuevos poemas en la nube
- [x] Editar poemas existentes
- [x] Eliminar poemas (con confirmación)
- [x] Visualizar lista de poemas sincronizada
- [x] Ver detalles completos de cada poema

### ✅ Sincronización y Base de Datos
- [x] Almacenamiento en Firebase Firestore
- [x] Sincronización en tiempo real
- [x] Escucha de cambios automática
- [x] Migración automática de datos locales
- [x] Reglas de seguridad por usuario

### ✅ Interfaz de Usuario
- [x] Diseño responsive y elegante
- [x] Navegación fluida entre pantallas
- [x] Pantallas de autenticación
- [x] Información del usuario conectado
- [x] Estados de carga y feedback visual
- [x] Confirmaciones para acciones destructivas

### ✅ Funciones Avanzadas
- [x] Compartir poemas en redes sociales
- [x] Estadísticas de texto (palabras, líneas, caracteres)
- [x] Guardado automático en la nube
- [x] Fechas de creación y modificación
- [x] Ordenamiento por fecha de actualización
- [x] Acceso multiplataforma (móvil ↔ web)

---

## 🚀 Próximas Funcionalidades

- [ ] Búsqueda y filtrado de poemas
- [ ] Categorías y etiquetas
- [ ] Exportar poemas a PDF
- [ ] Modo oscuro
- [ ] Compartir poemas entre usuarios
- [ ] Colecciones de poemas
- [ ] Backup y restauración
- [ ] Configuración de privacidad avanzada

---

## 📜 Autor

Desarrollado por **Adrian Vázquez**  
Apasionado por la programación, el deporte y la poesía.  
🕊️ *"Tecnología con alma de verso."*

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 💖 Agradecimientos

- A la comunidad de React Native y Expo
- A todos los poetas que inspiran con sus palabras
- A los desarrolladores que comparten conocimiento

---

*✨ Que tus palabras vuelen alto y lleguen al corazón de quien las lea ✨*
