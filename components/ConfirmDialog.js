import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  type = 'default', // 'default', 'danger', 'warning'
}) {
  const getButtonStyle = () => {
    switch (type) {
      case 'danger':
        return styles.dangerButton;
      case 'warning':
        return styles.warningButton;
      default:
        return styles.confirmButton;
    }
  };

  const getButtonTextStyle = () => {
    switch (type) {
      case 'danger':
        return styles.dangerButtonText;
      case 'warning':
        return styles.warningButtonText;
      default:
        return styles.confirmButtonText;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={getButtonStyle()}
              onPress={onConfirm}
            >
              <Text style={getButtonTextStyle()}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialog: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#636e72',
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  cancelButtonText: {
    color: '#636e72',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#6c5ce7',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dangerButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningButton: {
    flex: 1,
    backgroundColor: '#fdcb6e',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  warningButtonText: {
    color: '#2d3436',
    fontSize: 16,
    fontWeight: 'bold',
  },
});