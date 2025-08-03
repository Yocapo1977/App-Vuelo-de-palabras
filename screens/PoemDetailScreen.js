import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
  Dimensions,
} from 'react-native';
import PoemStats from '../components/PoemStats';

const { width } = Dimensions.get('window');

export default function PoemDetailScreen({ navigation, route }) {
  const { poem } = route.params;
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sharePoem = async () => {
    try {
      const shareContent = `${poem.title}\n\n${poem.content}\n\n---\nCompartido desde Vuelo de Palabras`;
      
      await Share.share({
        message: shareContent,
        title: poem.title,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el poema');
    }
  };

  const deletePoem = () => {
    Alert.alert(
      'Eliminar poema',
      '¿Estás seguro de que quieres eliminar este poema? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            try {
              const savedPoems = localStorage.getItem('poems') || '[]';
              const poems = JSON.parse(savedPoems);
              const updatedPoems = poems.filter(p => p.id !== poem.id);
              localStorage.setItem('poems', JSON.stringify(updatedPoems));
              
              Alert.alert('Éxito', 'Poema eliminado correctamente', [
                { text: 'OK', onPress: () => navigation.goBack() }
              ]);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el poema');
            }
          },
        },
      ]
    );
  };

  const editPoem = () => {
    navigation.navigate('Editar', { poem });
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // Aquí podrías implementar la funcionalidad de likes
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={toggleLike}
          >
            <Text style={[styles.actionIcon, isLiked && styles.likedIcon]}>
              {isLiked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={sharePoem}
          >
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.poemContainer}>
          <Text style={styles.poemTitle}>{poem.title}</Text>
          
          <View style={styles.poemContent}>
            <Text style={styles.poemText}>{poem.content}</Text>
          </View>

          <View style={styles.poemMetadata}>
            <Text style={styles.metadataText}>
              Creado: {formatDate(poem.createdAt)}
            </Text>
            {poem.updatedAt && poem.updatedAt !== poem.createdAt && (
              <Text style={styles.metadataText}>
                Actualizado: {formatDate(poem.updatedAt)}
              </Text>
            )}
          </View>
        </View>

        <PoemStats poem={poem} />

        <View style={styles.inspirationContainer}>
          <Text style={styles.inspirationTitle}>💭 Reflexión</Text>
          <Text style={styles.inspirationText}>
            "Cada poema es un viaje del corazón al papel, donde las emociones encuentran su voz y los sentimientos cobran vida a través de las palabras."
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={editPoem}
        >
          <Text style={styles.editButtonText}>✏️ Editar Poema</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deletePoem}
        >
          <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    padding: 5,
  },
  actionIcon: {
    fontSize: 20,
  },
  likedIcon: {
    color: '#e74c3c',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  poemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  poemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 20,
    textAlign: 'center',
  },
  poemContent: {
    marginBottom: 20,
  },
  poemText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#2d3436',
    textAlign: 'left',
  },
  poemMetadata: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingTop: 15,
  },
  metadataText: {
    fontSize: 12,
    color: '#b2bec3',
    fontStyle: 'italic',
    marginBottom: 2,
  },

  inspirationContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inspirationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
  },
  inspirationText: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    gap: 15,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#6c5ce7',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    minWidth: 100,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});