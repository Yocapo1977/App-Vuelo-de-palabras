import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    loadPoems();
  }, []);

  const loadPoems = () => {
    try {
      const savedPoems = localStorage.getItem('poems');
      if (savedPoems) {
        setPoems(JSON.parse(savedPoems));
      }
    } catch (error) {
      console.log('Error loading poems:', error);
    }
  };

  const deletePoem = (id) => {
    Alert.alert(
      'Eliminar poema',
      '¿Estás seguro de que quieres eliminar este poema?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updatedPoems = poems.filter(poem => poem.id !== id);
            setPoems(updatedPoems);
            localStorage.setItem('poems', JSON.stringify(updatedPoems));
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>✈️ Vuelo de Palabras</Text>
        <Text style={styles.subtitle}>Donde los versos cobran vida</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {poems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>No hay poemas aún</Text>
            <Text style={styles.emptyText}>
              Comienza a escribir tu primer poema tocando el botón de abajo
            </Text>
          </View>
        ) : (
          <View style={styles.poemsList}>
            {poems.map((poem) => (
              <TouchableOpacity
                key={poem.id}
                style={styles.poemCard}
                onPress={() => navigation.navigate('Detalle', { poem })}
                onLongPress={() => deletePoem(poem.id)}
              >
                <Text style={styles.poemTitle} numberOfLines={1}>
                  {poem.title}
                </Text>
                <Text style={styles.poemPreview} numberOfLines={2}>
                  {poem.content}
                </Text>
                <Text style={styles.poemDate}>
                  {formatDate(poem.createdAt)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Editar')}
      >
        <Text style={styles.fabText}>✍️</Text>
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
    backgroundColor: '#6c5ce7',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#e8e8e8',
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  poemsList: {
    gap: 15,
  },
  poemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
  },
  poemPreview: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
    marginBottom: 10,
  },
  poemDate: {
    fontSize: 12,
    color: '#b2bec3',
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
  },
});