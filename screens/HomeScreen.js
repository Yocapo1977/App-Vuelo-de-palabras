import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions
} from 'react-native';
import { StorageService } from '../utils/storage';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPoems();
    
    // Recargar poemas cuando regrese a esta pantalla
    const unsubscribe = navigation.addListener('focus', () => {
      loadPoems();
    });

    return unsubscribe;
  }, [navigation]);

  const loadPoems = async () => {
    try {
      setLoading(true);
      const savedPoems = await StorageService.getPoems();
      setPoems(savedPoems.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los poemas');
    } finally {
      setLoading(false);
    }
  };

  const deletePoem = async (poemId) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar este poema?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.deletePoem(poemId);
              loadPoems();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el poema');
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderPoemItem = ({ item }) => (
    <TouchableOpacity
      style={styles.poemCard}
      onPress={() => navigation.navigate('Detalle', { poem: item })}
      onLongPress={() => deletePoem(item.id)}
    >
      <Text style={styles.poemTitle}>{item.title}</Text>
      <Text style={styles.poemPreview} numberOfLines={3}>
        {item.content}
      </Text>
      <Text style={styles.poemDate}>{formatDate(item.updatedAt)}</Text>
    </TouchableOpacity>
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>✨ Vuelo de Palabras ✨</Text>
      <Text style={styles.emptySubtitle}>
        "La sonrisa es el perfecto abrazo del alma..."
      </Text>
      <Text style={styles.emptyText}>
        Aún no tienes poemas guardados.{'\n'}
        ¡Toca el botón + para crear tu primer verso!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Poemas</Text>
        <Text style={styles.headerSubtitle}>
          {poems.length} {poems.length === 1 ? 'poema' : 'poemas'}
        </Text>
      </View>

      <FlatList
        data={poems}
        renderItem={renderPoemItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyComponent}
        contentContainerStyle={poems.length === 0 ? styles.emptyList : styles.list}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Editar')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  list: {
    padding: 16,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 32,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6c757d',
    fontStyle: 'italic',
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
  },
  poemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  poemPreview: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 12,
  },
  poemDate: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});