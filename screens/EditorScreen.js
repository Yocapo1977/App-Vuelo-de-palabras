import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { FirestoreService } from '../utils/firestoreService';
import { useAuth } from '../contexts/AuthContext';

export default function EditorScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  
  const isEditing = route?.params?.poem;
  const existingPoem = route?.params?.poem;

  useEffect(() => {
    if (isEditing && existingPoem) {
      setTitle(existingPoem.title);
      setContent(existingPoem.content);
    }

    // Configurar el header
    navigation.setOptions({
      title: isEditing ? 'Editar Poema' : 'Nuevo Poema',
      headerRight: () => (
        <TouchableOpacity
          onPress={savePoem}
          style={styles.saveButton}
          disabled={saving || !content.trim()}
        >
          <Text style={[
            styles.saveButtonText,
            (!content.trim() || saving) && styles.saveButtonDisabled
          ]}>
            {saving ? 'Guardando...' : 'Guardar'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, title, content, saving, isEditing]);

  const savePoem = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'El poema no puede estar vacío');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para guardar poemas');
      return;
    }

    try {
      setSaving(true);
      
      const poemData = {
        title: title.trim() || 'Sin título',
        content: content.trim()
      };

      if (isEditing) {
        await FirestoreService.updatePoem(existingPoem.id, poemData);
        Alert.alert('Éxito', 'Poema actualizado correctamente');
      } else {
        await FirestoreService.savePoem(user.uid, poemData);
        Alert.alert('Éxito', 'Poema guardado correctamente');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el poema');
    } finally {
      setSaving(false);
    }
  };

  const handleBackPress = () => {
    if (title.trim() || content.trim()) {
      Alert.alert(
        'Cambios sin guardar',
        '¿Quieres salir sin guardar los cambios?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Salir', style: 'destructive', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!(title.trim() || content.trim())) {
        return;
      }

      e.preventDefault();
      handleBackPress();
    });

    return unsubscribe;
  }, [navigation, title, content]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Título del poema (opcional)"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
          
          <View style={styles.divider} />
          
          <TextInput
            style={styles.contentInput}
            placeholder="Escribe tu poema aquí...

Deja que las palabras fluyan
como versos al viento,
cada línea un susurro
del alma en movimiento..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.wordCount}>
          {content.length} caracteres
        </Text>
        <TouchableOpacity
          style={[styles.quickSaveButton, !content.trim() && styles.quickSaveDisabled]}
          onPress={savePoem}
          disabled={!content.trim() || saving}
        >
          <Text style={styles.quickSaveText}>💾 Guardar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    padding: 20,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingVertical: 12,
    borderWidth: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 16,
  },
  contentInput: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    minHeight: 400,
    textAlignVertical: 'top',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  saveButton: {
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonDisabled: {
    color: '#6c757d',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
  },
  wordCount: {
    fontSize: 14,
    color: '#6c757d',
  },
  quickSaveButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quickSaveDisabled: {
    backgroundColor: '#6c757d',
  },
  quickSaveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});