import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { AuthService } from '../utils/authService';
import { useTheme } from '../contexts/ThemeContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const result = await AuthService.login(email.trim().toLowerCase(), password);
      
      if (result.success) {
        // La navegación se manejará automáticamente por el AuthContext
      } else {
        Alert.alert('Error de inicio de sesión', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Email requerido', 'Ingresa tu email para restablecer la contraseña');
      return;
    }

    try {
      const result = await AuthService.resetPassword(email.trim().toLowerCase());
      if (result.success) {
        Alert.alert('Email enviado', result.message);
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el email de restablecimiento');
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: theme.surface,
      color: theme.text,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={dynamicStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={dynamicStyles.title}>✨ Vuelo de Palabras</Text>
          <Text style={dynamicStyles.subtitle}>Inicia sesión para sincronizar tus poemas</Text>
        </View>

                  <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={dynamicStyles.label}>Email</Text>
              <TextInput
                style={dynamicStyles.input}
                placeholder="tu@email.com"
                placeholderTextColor={theme.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={dynamicStyles.label}>Contraseña</Text>
              <TextInput
                style={dynamicStyles.input}
                placeholder="Tu contraseña"
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                editable={!loading}
              />
            </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={handleForgotPassword}
            disabled={loading}
          >
            <Text style={styles.forgotButtonText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            disabled={loading}
          >
            <Text style={styles.registerLink}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  loginButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  footerText: {
    color: '#6c757d',
    fontSize: 14,
    marginRight: 4,
  },
  registerLink: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
  },
});