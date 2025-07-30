# ✨ Vuelo de Palabras ✍️📱

> *"La sonrisa es el perfecto abrazo del alma, que congela en un instante la alegría y deja mudas las palabras y salpicado el corazón..."*

**Vuelo de Palabras** es una aplicación completa para poetas, soñadores y escritores que desean crear, guardar y compartir versos desde el corazón… y desde el celular o la web.

---

## 🌟 Funciones principales

- 🖋️ **Editor de poesía** - Interface minimalista y elegante para escribir
- 💾 **Almacenamiento local** - Tus poemas se guardan de forma segura
- 📱 **Multiplataforma** - Compatible con móviles, tabletas y web
- 🌐 **PWA Ready** - Funciona como aplicación web progresiva
- 📤 **Compartir poemas** - Comparte tus creaciones fácilmente
- ✏️ **Edición completa** - Modifica tus poemas cuando quieras
- 📊 **Estadísticas** - Cuenta de palabras, líneas y caracteres
- 🎨 **Diseño minimalista** - Enfoque en la escritura sin distracciones

---

## 📱 Características de la App

### Pantalla Principal
- Lista de todos tus poemas guardados
- Vista previa del contenido
- Fechas de creación y modificación
- Contador de poemas
- Botón flotante para crear nuevos poemas

### Editor de Poemas
- Campo de título opcional
- Área de texto optimizada para poesía
- Contador de caracteres en tiempo real
- Autoguardado y confirmación de cambios
- Placeholder inspiracional

### Vista de Detalle
- Visualización completa del poema
- Información de creación y edición
- Estadísticas detalladas (palabras, líneas, caracteres)
- Opciones para compartir, editar y eliminar
- Interfaz elegante con tipografía serif

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

3. **Inicia la aplicación:**

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
- **React Navigation** - Navegación entre pantallas
- **AsyncStorage** - Almacenamiento local
- **JavaScript ES6+** - Lenguaje de programación

---

## 📁 Estructura del Proyecto

```
vuelo-de-palabras/
├── screens/
│   ├── HomeScreen.js      # Pantalla principal con lista de poemas
│   ├── EditorScreen.js    # Pantalla de edición/creación
│   └── PoemDetailScreen.js # Pantalla de detalle del poema
├── utils/
│   └── storage.js         # Servicio de almacenamiento
├── App.js                 # Componente principal y navegación
├── package.json           # Dependencias y scripts
├── app.json              # Configuración de Expo
└── README.md             # Documentación
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Gestión de Poemas
- [x] Crear nuevos poemas
- [x] Editar poemas existentes
- [x] Eliminar poemas (con confirmación)
- [x] Visualizar lista de poemas
- [x] Ver detalles completos de cada poema

### ✅ Interfaz de Usuario
- [x] Diseño responsive y elegante
- [x] Navegación fluida entre pantallas
- [x] Botones de acción intuitivos
- [x] Confirmaciones para acciones destructivas
- [x] Estados de carga y feedback visual

### ✅ Funciones Avanzadas
- [x] Compartir poemas en redes sociales
- [x] Estadísticas de texto (palabras, líneas, caracteres)
- [x] Autoguardado y validación de cambios
- [x] Fechas de creación y modificación
- [x] Ordenamiento por fecha de actualización

---

## 🚀 Próximas Funcionalidades

- [ ] Búsqueda y filtrado de poemas
- [ ] Categorías y etiquetas
- [ ] Exportar poemas a PDF
- [ ] Modo oscuro
- [ ] Respaldo en la nube
- [ ] Compartir con otros usuarios

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
