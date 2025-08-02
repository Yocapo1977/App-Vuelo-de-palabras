# ✨ Vuelo de Palabras ✍️📱

> *"La sonrisa es el perfecto abrazo del alma, que congela en un instante la alegría y deja mudas las palabras y salpicado el corazón..."*

**Vuelo de Palabras** es una aplicación para poetas, soñadores y escritores que desean crear, guardar y compartir versos desde el corazón… y desde el celular o la web.

---

## 🌟 Funciones principales

- 🖋️ **Editor de poesía** simple y directo con consejos de escritura
- 💾 **Guardado local** de poemas con persistencia
- 📊 **Estadísticas** detalladas de cada poema (versos, palabras, caracteres)
- 📱 **Compatible** con móviles y web usando React Native + Expo
- 🌐 **Aplicación web** progresiva (PWA)
- 🎨 **Diseño minimalista** y elegante con tema púrpura
- 📤 **Compartir poemas** fácilmente
- ❤️ **Sistema de likes** para poemas favoritos
- 🔍 **Navegación intuitiva** entre pantallas

---

## 🚀 Cómo usar la aplicación

### 📝 Crear un nuevo poema
1. Toca el botón ✍️ en la pantalla principal
2. Escribe el título de tu poema
3. Escribe el contenido en el área de texto
4. Toca "Guardar Poema"

### 📖 Ver poemas
- Los poemas se muestran en tarjetas en la pantalla principal
- Toca cualquier poema para verlo en detalle
- Mantén presionado un poema para eliminarlo

### ✏️ Editar poemas
- En la pantalla de detalle, toca "Editar Poema"
- Modifica el título o contenido
- Toca "Actualizar Poema"

### 📊 Estadísticas
- Cada poema muestra estadísticas detalladas
- Versos, palabras, caracteres y párrafos
- Insights sobre el estilo de escritura

---

## 🛠️ Instalación local

1. **Clona el repositorio:**
```bash
git clone https://github.com/Yocapo1977/App-Vuelo-de-palabras.git
cd App-Vuelo-de-palabras
```

2. **Instala las dependencias:**
```bash
npm install --legacy-peer-deps
```

3. **Inicia la aplicación:**
```bash
npm start
```

4. **Abre en el navegador:**
La aplicación se abrirá automáticamente en `http://localhost:19006`

---

## 📦 Build para producción

Para generar la versión final:

```bash
npm run build
```

---

## 🏗️ Estructura del proyecto

```
vuelo-de-palabras/
├── screens/
│   ├── HomeScreen.js          # Pantalla principal
│   ├── EditorScreen.js        # Editor de poemas
│   └── PoemDetailScreen.js    # Detalle del poema
├── components/
│   ├── ConfirmDialog.js       # Diálogos de confirmación
│   └── PoemStats.js          # Estadísticas del poema
├── styles/
│   └── global.js             # Estilos globales
├── App.js                    # Componente principal
├── package.json              # Dependencias
└── README.md                 # Documentación
```

---

## 🎨 Características técnicas

- **React Native + Expo** para compatibilidad multiplataforma
- **React Navigation** para navegación entre pantallas
- **LocalStorage** para persistencia de datos
- **Diseño responsivo** que funciona en móvil y web
- **Tema púrpura** (#6c5ce7) con diseño moderno
- **Componentes reutilizables** para mejor mantenimiento

---

## 📜 Autor

Desarrollado por **Adrian Vázquez**  
Apasionado por la programación, el deporte y la poesía.  
🕊️ *"Tecnología con alma de verso."*

---

## 🚀 Próximas características

- [ ] Exportar poemas como PDF
- [ ] Temas de escritura diarios
- [ ] Comunidad de poetas
- [ ] Sincronización en la nube
- [ ] Modo oscuro
- [ ] Búsqueda de poemas

---

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.
