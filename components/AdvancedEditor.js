import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Modal,
  Alert,
} from 'react-native';

export default function AdvancedEditor({ 
  content, 
  onContentChange, 
  placeholder = "Escribe tu poema aquí..." 
}) {
  const [showTools, setShowTools] = useState(false);
  const [showWordSuggestions, setShowWordSuggestions] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [wordSuggestions, setWordSuggestions] = useState([]);
  const textInputRef = useRef(null);
  const toolsAnimation = useRef(new Animated.Value(0)).current;

  // Sugerencias poéticas por categoría
  const poeticSuggestions = {
    emotions: [
      'melancólico', 'eufórico', 'nostálgico', 'sereno', 'apasionado',
      'contemplativo', 'extático', 'vulnerable', 'radiante', 'introspectivo'
    ],
    nature: [
      'susurrante', 'cristalino', 'etéreo', 'fragante', 'silvestre',
      'luminoso', 'brumoso', 'ondulante', 'centelleante', 'aromático'
    ],
    time: [
      'efímero', 'perpetuo', 'fugaz', 'ancestral', 'inmortal',
      'instantáneo', 'eterno', 'temporal', 'cíclico', 'transitorio'
    ],
    beauty: [
      'sublime', 'delicado', 'majestuoso', 'grácil', 'exquisito',
      'elegante', 'armonioso', 'refinado', 'cautivador', 'deslumbrante'
    ]
  };

  // Métricas poéticas
  const poemMetrics = {
    syllables: countSyllables(content),
    words: countWords(content),
    lines: countLines(content),
    verses: countVerses(content),
    rhymeScheme: detectRhymeScheme(content),
  };

  useEffect(() => {
    Animated.timing(toolsAnimation, {
      toValue: showTools ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showTools]);

  function countSyllables(text) {
    // Aproximación simple para contar sílabas en español
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    return words.reduce((total, word) => {
      const vowels = word.match(/[aeiouáéíóúü]/g) || [];
      const diphthongs = word.match(/[aeiouáéíóúü]{2}/g) || [];
      return total + vowels.length - diphthongs.length;
    }, 0);
  }

  function countWords(text) {
    return (text.match(/\b\w+\b/g) || []).length;
  }

  function countLines(text) {
    return text.split('\n').filter(line => line.trim()).length;
  }

  function countVerses(text) {
    return text.split(/\n\s*\n/).filter(verse => verse.trim()).length;
  }

  function detectRhymeScheme(text) {
    // Detección básica de esquemas de rima
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return 'N/A';
    
    // Simplificado: detectar si las últimas palabras terminan igual
    const endings = lines.map(line => {
      const words = line.trim().match(/\b\w+\b/g) || [];
      return words[words.length - 1]?.slice(-2).toLowerCase() || '';
    });
    
    const uniqueEndings = [...new Set(endings)];
    return uniqueEndings.length < lines.length ? 'Rima detectada' : 'Verso libre';
  }

  const insertAtCursor = (text) => {
    const beforeCursor = content.substring(0, cursorPosition);
    const afterCursor = content.substring(cursorPosition);
    const newContent = beforeCursor + text + afterCursor;
    onContentChange(newContent);
    
    // Actualizar posición del cursor
    setTimeout(() => {
      setCursorPosition(cursorPosition + text.length);
    }, 100);
  };

  const formatText = (type) => {
    switch (type) {
      case 'verse':
        insertAtCursor('\n\n');
        break;
      case 'indent':
        insertAtCursor('    ');
        break;
      case 'emphasis':
        if (selectedText) {
          const emphasized = `*${selectedText}*`;
          insertAtCursor(emphasized);
        }
        break;
      case 'quote':
        insertAtCursor('"');
        break;
    }
  };

  const getSuggestions = (category) => {
    setWordSuggestions(poeticSuggestions[category] || []);
    setShowWordSuggestions(true);
  };

  const insertSuggestion = (word) => {
    insertAtCursor(word + ' ');
    setShowWordSuggestions(false);
  };

  const analyzeRhyme = () => {
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      Alert.alert('Análisis de Rima', 'Escribe al menos 2 líneas para analizar la rima.');
      return;
    }

    const analysis = `
Análisis Métrico:
• ${poemMetrics.lines} líneas
• ${poemMetrics.verses} estrofas
• ${poemMetrics.words} palabras
• ${poemMetrics.syllables} sílabas aprox.
• Esquema: ${poemMetrics.rhymeScheme}

Sugerencias:
${poemMetrics.lines % 4 === 0 ? '✓ Estructura clásica de cuartetos' : '• Considera agrupar en estrofas de 4 líneas'}
${poemMetrics.syllables / poemMetrics.lines > 8 ? '• Versos largos, considera el endecasílabo' : '• Versos cortos, ideal para poesía moderna'}
    `;

    Alert.alert('Análisis Poético', analysis);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.editorContainer}>
        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          multiline
          value={content}
          onChangeText={onContentChange}
          placeholder={placeholder}
          placeholderTextColor="#6c757d"
          textAlignVertical="top"
          onSelectionChange={(event) => {
            setCursorPosition(event.nativeEvent.selection.start);
            const { start, end } = event.nativeEvent.selection;
            if (start !== end) {
              setSelectedText(content.substring(start, end));
            } else {
              setSelectedText('');
            }
          }}
        />
      </ScrollView>

      {/* Barra de herramientas flotante */}
      <TouchableOpacity
        style={styles.toolsToggle}
        onPress={() => setShowTools(!showTools)}
      >
        <Text style={styles.toolsToggleText}>🛠️</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.toolsContainer,
          {
            opacity: toolsAnimation,
            transform: [{
              translateY: toolsAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0]
              })
            }]
          }
        ]}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Herramientas de formato */}
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => formatText('verse')}
          >
            <Text style={styles.toolButtonText}>📝 Nueva Estrofa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => formatText('indent')}
          >
            <Text style={styles.toolButtonText}>➡️ Sangría</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => formatText('quote')}
          >
            <Text style={styles.toolButtonText}>💬 Cita</Text>
          </TouchableOpacity>

          {/* Sugerencias por categoría */}
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => getSuggestions('emotions')}
          >
            <Text style={styles.toolButtonText}>💭 Emociones</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => getSuggestions('nature')}
          >
            <Text style={styles.toolButtonText}>🌿 Naturaleza</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => getSuggestions('beauty')}
          >
            <Text style={styles.toolButtonText}>✨ Belleza</Text>
          </TouchableOpacity>

          {/* Análisis métrico */}
          <TouchableOpacity
            style={styles.toolButton}
            onPress={analyzeRhyme}
          >
            <Text style={styles.toolButtonText}>📊 Análisis</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      {/* Panel de métricas en tiempo real */}
      <View style={styles.metricsPanel}>
        <Text style={styles.metricText}>{poemMetrics.words} palabras</Text>
        <Text style={styles.metricText}>{poemMetrics.lines} líneas</Text>
        <Text style={styles.metricText}>{poemMetrics.syllables} sílabas</Text>
      </View>

      {/* Modal de sugerencias */}
      <Modal
        visible={showWordSuggestions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowWordSuggestions(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowWordSuggestions(false)}
        >
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Sugerencias Poéticas</Text>
            <ScrollView>
              {wordSuggestions.map((word, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => insertSuggestion(word)}
                >
                  <Text style={styles.suggestionText}>{word}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  editorContainer: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    minHeight: 400,
    fontFamily: 'serif',
    textAlignVertical: 'top',
  },
  toolsToggle: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  toolsToggleText: {
    fontSize: 20,
  },
  toolsContainer: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  toolButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  toolButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  metricsPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  metricText: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    maxHeight: 400,
    minWidth: 250,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  suggestionText: {
    fontSize: 16,
    color: '#495057',
  },
});