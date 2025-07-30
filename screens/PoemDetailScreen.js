import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Dimensions
} from 'react-native';
import { FirestoreService } from '../utils/firestoreService';

const { width } = Dimensions.get('window');

export default function PoemDetailScreen({ navigation, route }) {
  const { poem } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: poem.title,
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={sharePoem}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>📤</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={editPoem}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deletePoem}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, poem]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sharePoem = async () => {
    try {
      const shareContent = `📝 ${poem.title}\n\n${poem.content}\n\n✨ Creado con Vuelo de Palabras`;
      
      await Share.share({
        message: shareContent,
        title: poem.title,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el poema');
    }
  };

  const editPoem = () => {
    navigation.navigate('Editar', { poem });
  };

  const deletePoem = () => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que quieres eliminar "${poem.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await FirestoreService.deletePoem(poem.id);
              Alert.alert('Eliminado', 'El poema ha sido eliminado');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el poema');
            }
          }
        }
      ]
    );
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getLineCount = (text) => {
    return text.split('\n').length;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{poem.title}</Text>
            <View style={styles.metadata}>
              <Text style={styles.metadataText}>
                📅 {formatDate(poem.createdAt)}
              </Text>
              {poem.updatedAt !== poem.createdAt && (
                <Text style={styles.metadataText}>
                  ✏️ Editado: {formatDate(poem.updatedAt)}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.poemContainer}>
            <Text style={styles.poemContent}>{poem.content}</Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{getWordCount(poem.content)}</Text>
              <Text style={styles.statLabel}>Palabras</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{getLineCount(poem.content)}</Text>
              <Text style={styles.statLabel}>Líneas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{poem.content.length}</Text>
              <Text style={styles.statLabel}>Caracteres</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.shareButton]}
          onPress={sharePoem}
        >
          <Text style={styles.actionButtonText}>📤 Compartir</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={editPoem}
        >
          <Text style={styles.actionButtonText}>✏️ Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  content: {
    padding: 20,
    paddingBottom: 100, // Espacio para los botones flotantes
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  metadata: {
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  divider: {
    height: 2,
    backgroundColor: '#e9ecef',
    marginVertical: 20,
    borderRadius: 1,
  },
  poemContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  poemContent: {
    fontSize: 16,
    lineHeight: 26,
    color: '#2c3e50',
    fontFamily: 'serif',
    textAlign: 'left',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: 8,
  },
  headerButton: {
    marginLeft: 12,
    padding: 4,
  },
  headerButtonText: {
    fontSize: 18,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  shareButton: {
    backgroundColor: '#28a745',
  },
  editButton: {
    backgroundColor: '#007bff',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});