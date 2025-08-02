#!/bin/bash

echo "🚀 Iniciando Vuelo de Palabras..."
echo "📱 Aplicación React Native + Expo"
echo ""

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install --legacy-peer-deps
fi

# Verificar si Expo CLI está disponible
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx no está disponible"
    exit 1
fi

echo "✅ Dependencias verificadas"
echo "🌐 Iniciando servidor de desarrollo..."
echo "📱 La aplicación estará disponible en: http://localhost:19006"
echo ""

# Iniciar la aplicación
npx expo start --web --port 19006