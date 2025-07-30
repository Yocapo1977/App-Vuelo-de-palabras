import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { FirestoreService } from '../utils/firestoreService';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import AnimatedBackground from '../components/AnimatedBackground';
import PoemCard from '../components/PoemCard';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDarkMode } = useTheme();

  useEffect(() => {
    if (!user) return;

    // Suscribirse a cambios en tiempo real
    const unsubscribe = FirestoreService.subscribeToUserPoems(user.uid, (updatedPoems) => {
      setPoems(updatedPoems);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (!result.success) {
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          }
        }
      ]
    );
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
              await FirestoreService.deletePoem(poemId);
              // No necesitamos recargar manualmente, el listener se encarga
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

  const renderPoemItem = ({ item, index }) => (
    <PoemCard
      poem={item}
      index={index}
      onPress={() => navigation.navigate('Detalle', { poem: item })}
      onLongPress={() => deletePoem(item.id)}
    />
  );

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={dynamicStyles.emptyTitle}>✨ Vuelo de Palabras ✨</Text>
      <Text style={dynamicStyles.emptySubtitle}>
        "La sonrisa es el perfecto abrazo del alma..."
      </Text>
      <Text style={dynamicStyles.emptyText}>
        Aún no tienes poemas guardados.{'\n'}
        ¡Toca el botón + para crear tu primer verso!
      </Text>
    </View>
  );

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 20,
      paddingTop: 40,
      backgroundColor: theme.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 16,
      color: theme.textSecondary,
    },
    poemCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    poemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    poemPreview: {
      fontSize: 14,
      color: theme.textSecondary,
      lineHeight: 20,
      marginBottom: 12,
    },
    poemDate: {
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: 'right',
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 6,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      fontStyle: 'italic',
      marginBottom: 24,
      textAlign: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: theme.textSecondary,
    },
  });

  return (
    <AnimatedBackground>
      <View style={dynamicStyles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={dynamicStyles.headerTitle}>Mis Poemas</Text>
            <Text style={dynamicStyles.headerSubtitle}>
              {poems.length} {poems.length === 1 ? 'poema' : 'poemas'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>
              Hola, {user?.displayName || 'Usuario'}
            </Text>
            <View style={styles.userActions}>
              <TouchableOpacity onPress={toggleTheme} style={[styles.themeButton, { backgroundColor: theme.surface }]}>
                <Text style={styles.themeButtonText}>{isDarkMode ? '☀️' : '🌙'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <FlatList
        data={poems}
        renderItem={renderPoemItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={loading ? () => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={dynamicStyles.loadingText}>Cargando tus poemas...</Text>
          </View>
        ) : EmptyComponent}
        contentContainerStyle={poems.length === 0 ? styles.emptyList : styles.list}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={dynamicStyles.fab}
        onPress={() => navigation.navigate('Editar')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </AnimatedBackground>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userInfo: {
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: 4,
  },
  logoutButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  logoutText: {
    fontSize: 12,
    color: '#dc3545',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  themeButtonText: {
    fontSize: 16,
  },
});