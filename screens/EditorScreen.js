import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function EditorScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [poemId, setPoemId] = useState(null);

  useEffect(() => {
    if (route.params?.poem) {
      const poem = route.params.poem;
      setTitle(poem.title);
      setContent(poem.content);
      setPoemId(poem.id);
      setIsEditing(true);
    }
  }, [route.params]);

  const savePoem = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Por favor completa el título y el contenido del poema');
      return;
    }

    try {
      const savedPoems = localStorage.getItem('poems') || '[]';
      const poems = JSON.parse(savedPoems);
      
      const newPoem = {
        id: poemId || Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        createdAt: isEditing ? poems.find(p => p.id === poemId)?.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      let updatedPoems;
      if (isEditing) {
        updatedPoems = poems.map(poem => 
          poem.id === poemId ? newPoem : poem
        );
      } else {
        updatedPoems = [...poems, newPoem];
      }

      localStorage.setItem('poems', JSON.stringify(updatedPoems));
      
      Alert.alert(
        'Éxito',
        isEditing ? 'Poema actualizado correctamente' : 'Poema guardado correctamente',
        [
          {
            text: 'Ver poema',
            onPress: () => navigation.navigate('Detalle', { poem: newPoem }),
          },
          {
            text: 'Nuevo poema',
            onPress: () => {
              setTitle('');
              setContent('');
              setIsEditing(false);
              setPoemId(null);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el poema');
      console.error('Error saving poem:', error);
    }
  };

  const clearForm = () => {
    Alert.alert(
      'Limpiar formulario',
      '¿Estás seguro de que quieres limpiar el formulario? Se perderán los cambios no guardados.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: () => {
            setTitle('');
            setContent('');
            setIsEditing(false);
            setPoemId(null);
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Editar Poema' : 'Nuevo Poema'}
        </Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearForm}
        >
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Título del poema</Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Escribe el título de tu poema..."
            placeholderTextColor="#b2bec3"
            maxLength={100}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contenido</Text>
          <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            placeholder="Escribe tu poema aquí...
            
Deja que las palabras fluyan libremente...
            
Cada línea puede ser un verso..."
            placeholderTextColor="#b2bec3"
            multiline
            textAlignVertical="top"
            maxLength={2000}
          />
          <Text style={styles.charCount}>
            {content.length}/2000 caracteres
          </Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Consejos para escribir</Text>
          <Text style={styles.tip}>• Escribe desde el corazón</Text>
          <Text style={styles.tip}>• No te preocupes por la perfección</Text>
          <Text style={styles.tip}>• Cada línea puede ser un verso</Text>
          <Text style={styles.tip}>• Deja que las emociones fluyan</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, (!title.trim() || !content.trim()) && styles.saveButtonDisabled]}
          onPress={savePoem}
          disabled={!title.trim() || !content.trim()}
        >
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Actualizar Poema' : 'Guardar Poema'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#6c5ce7',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  contentInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    minHeight: 200,
    lineHeight: 24,
  },
  charCount: {
    fontSize: 12,
    color: '#b2bec3',
    textAlign: 'right',
    marginTop: 5,
  },
  tipsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
  },
  tip: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 5,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  saveButton: {
    backgroundColor: '#6c5ce7',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#b2bec3',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});