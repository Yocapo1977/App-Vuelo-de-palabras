import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#6c5ce7',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#2d3436',
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    color: '#636e72',
  },
  textSmall: {
    fontSize: 12,
    color: '#b2bec3',
  },
});

export const colors = {
  primary: '#6c5ce7',
  secondary: '#a29bfe',
  success: '#00b894',
  warning: '#fdcb6e',
  danger: '#e74c3c',
  dark: '#2d3436',
  light: '#f8f9fa',
  white: '#ffffff',
  gray: '#636e72',
  lightGray: '#b2bec3',
};