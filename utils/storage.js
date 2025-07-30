import AsyncStorage from '@react-native-async-storage/async-storage';

const POEMS_KEY = 'vuelo_de_palabras_poems';

export const StorageService = {
  // Obtener todos los poemas
  async getPoems() {
    try {
      const poemsJson = await AsyncStorage.getItem(POEMS_KEY);
      return poemsJson ? JSON.parse(poemsJson) : [];
    } catch (error) {
      console.error('Error al obtener poemas:', error);
      return [];
    }
  },

  // Guardar un nuevo poema
  async savePoem(poem) {
    try {
      const poems = await this.getPoems();
      const newPoem = {
        id: Date.now().toString(),
        title: poem.title || 'Sin título',
        content: poem.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      poems.push(newPoem);
      await AsyncStorage.setItem(POEMS_KEY, JSON.stringify(poems));
      return newPoem;
    } catch (error) {
      console.error('Error al guardar poema:', error);
      throw error;
    }
  },

  // Actualizar un poema existente
  async updatePoem(poemId, updatedPoem) {
    try {
      const poems = await this.getPoems();
      const index = poems.findIndex(p => p.id === poemId);
      if (index !== -1) {
        poems[index] = {
          ...poems[index],
          ...updatedPoem,
          updatedAt: new Date().toISOString()
        };
        await AsyncStorage.setItem(POEMS_KEY, JSON.stringify(poems));
        return poems[index];
      }
      throw new Error('Poema no encontrado');
    } catch (error) {
      console.error('Error al actualizar poema:', error);
      throw error;
    }
  },

  // Eliminar un poema
  async deletePoem(poemId) {
    try {
      const poems = await this.getPoems();
      const filteredPoems = poems.filter(p => p.id !== poemId);
      await AsyncStorage.setItem(POEMS_KEY, JSON.stringify(filteredPoems));
      return true;
    } catch (error) {
      console.error('Error al eliminar poema:', error);
      throw error;
    }
  }
};