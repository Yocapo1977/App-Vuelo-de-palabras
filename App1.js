vuelo-de-palabras/
├── App.js
├── package.json
└── README.md
Javascript 

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [poema, setPoema] = useState('');
  const [poemas, setPoemas] = useState([]);

  useEffect(() => {
    cargarPoemas();
  }, []);

  const guardarPoema = async () => {
    if (poema.trim() === '') {
      Alert.alert('Error', 'El poema no puede estar vacío');
      return;
    }

    const nuevoPoema = {
      id: Date.now().toString(),
      texto: poema.trim(),
    };

    const actualizados = [nuevoPoema, ...poemas];
    setPoemas(actualizados);
    setPoema('');

    await AsyncStorage.setItem('poemas', JSON.stringify(actualizados));
  };

  const cargarPoemas = async () => {
    const guardados = await AsyncStorage.getItem('poemas');
    if (guardados) {
      setPoemas(JSON.parse(guardados));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Vuelo de Palabras 🕊️</Text>

      <TextInput
        style={styles.entrada}
        placeholder="Escribí tu poema..."
        multiline
        value={poema}
        onChangeText={setPoema}
      />

      <Button title="Guardar poema" onPress={guardarPoema} />

      <Text style={styles.subtitulo}>Mis Poemas:</Text>
      <FlatList
        data={poemas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.poema}>{item.texto}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef9f4',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  subtitulo: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
  },
  poema: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
