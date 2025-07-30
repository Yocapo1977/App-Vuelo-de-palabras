import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../utils/authService';
import { FirestoreService } from '../utils/firestoreService';
import { StorageService } from '../utils/storage';
import { Alert } from 'react-native';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(async (authUser) => {
      try {
        if (authUser) {
          setUser(authUser);
          
          // Migrar poemas locales a Firestore si es la primera vez
          await migrateLocalPoemsIfNeeded(authUser.uid);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error en onAuthStateChanged:', error);
      } finally {
        setLoading(false);
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, []);

  const migrateLocalPoemsIfNeeded = async (userId) => {
    try {
      // Verificar si el usuario ya tiene poemas en Firestore
      const hasFirestorePoems = await FirestoreService.hasUserPoems(userId);
      
      if (!hasFirestorePoems) {
        // Obtener poemas del almacenamiento local
        const localPoems = await StorageService.getPoems();
        
        if (localPoems.length > 0) {
          Alert.alert(
            'Migración de datos',
            `Se encontraron ${localPoems.length} poema(s) en tu dispositivo. ¿Quieres sincronizarlos con tu cuenta?`,
            [
              {
                text: 'No',
                style: 'cancel'
              },
              {
                text: 'Sí, sincronizar',
                onPress: async () => {
                  try {
                    await FirestoreService.migrateLocalPoems(userId, localPoems);
                    Alert.alert(
                      'Sincronización completa',
                      'Tus poemas han sido sincronizados exitosamente con tu cuenta.'
                    );
                    
                    // Limpiar el almacenamiento local después de la migración
                    // Esto es opcional, podrías mantenerlos como respaldo
                    // await AsyncStorage.removeItem('vuelo_de_palabras_poems');
                  } catch (error) {
                    Alert.alert(
                      'Error de sincronización',
                      'No se pudieron sincronizar todos los poemas. Puedes intentarlo más tarde.'
                    );
                  }
                }
              }
            ]
          );
        }
      }
    } catch (error) {
      console.error('Error en migración:', error);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await AuthService.login(email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, displayName) => {
    setLoading(true);
    try {
      const result = await AuthService.register(email, password, displayName);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const result = await AuthService.logout();
      return result;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    return await AuthService.resetPassword(email);
  };

  const value = {
    user,
    loading,
    initializing,
    login,
    register,
    logout,
    resetPassword,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};