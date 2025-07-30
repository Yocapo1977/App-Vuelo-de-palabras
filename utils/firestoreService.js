import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

const POEMS_COLLECTION = 'poems';

export const FirestoreService = {
  // Obtener poemas del usuario en tiempo real
  subscribeToUserPoems(userId, callback) {
    const q = query(
      collection(db, POEMS_COLLECTION),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const poems = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        poems.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate()?.toISOString(),
          updatedAt: data.updatedAt?.toDate()?.toISOString()
        });
      });
      callback(poems);
    });
  },

  // Obtener poemas del usuario (una sola vez)
  async getUserPoems(userId) {
    try {
      const q = query(
        collection(db, POEMS_COLLECTION),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const poems = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        poems.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate()?.toISOString(),
          updatedAt: data.updatedAt?.toDate()?.toISOString()
        });
      });
      
      return poems;
    } catch (error) {
      console.error('Error al obtener poemas:', error);
      throw error;
    }
  },

  // Guardar nuevo poema
  async savePoem(userId, poem) {
    try {
      const poemData = {
        userId,
        title: poem.title || 'Sin título',
        content: poem.content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, POEMS_COLLECTION), poemData);
      
      return {
        id: docRef.id,
        ...poemData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error al guardar poema:', error);
      throw error;
    }
  },

  // Actualizar poema existente
  async updatePoem(poemId, updatedData) {
    try {
      const poemRef = doc(db, POEMS_COLLECTION, poemId);
      
      const updateData = {
        ...updatedData,
        updatedAt: serverTimestamp()
      };

      await updateDoc(poemRef, updateData);
      
      return {
        id: poemId,
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error al actualizar poema:', error);
      throw error;
    }
  },

  // Eliminar poema
  async deletePoem(poemId) {
    try {
      const poemRef = doc(db, POEMS_COLLECTION, poemId);
      await deleteDoc(poemRef);
      return true;
    } catch (error) {
      console.error('Error al eliminar poema:', error);
      throw error;
    }
  },

  // Migrar poemas de AsyncStorage a Firestore
  async migrateLocalPoems(userId, localPoems) {
    try {
      const migrationPromises = localPoems.map(async (poem) => {
        const poemData = {
          userId,
          title: poem.title,
          content: poem.content,
          createdAt: poem.createdAt ? Timestamp.fromDate(new Date(poem.createdAt)) : serverTimestamp(),
          updatedAt: poem.updatedAt ? Timestamp.fromDate(new Date(poem.updatedAt)) : serverTimestamp()
        };

        return addDoc(collection(db, POEMS_COLLECTION), poemData);
      });

      await Promise.all(migrationPromises);
      return true;
    } catch (error) {
      console.error('Error al migrar poemas:', error);
      throw error;
    }
  },

  // Verificar si el usuario tiene poemas en Firestore
  async hasUserPoems(userId) {
    try {
      const q = query(
        collection(db, POEMS_COLLECTION),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error al verificar poemas:', error);
      return false;
    }
  }
};