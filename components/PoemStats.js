import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function PoemStats({ poem }) {
  const getStats = () => {
    const lines = poem.content.split('\n').filter(line => line.trim());
    const words = poem.content.split(' ').filter(word => word.trim());
    const characters = poem.content.length;
    const paragraphs = poem.content.split('\n\n').filter(para => para.trim());
    
    return {
      lines: lines.length,
      words: words.length,
      characters,
      paragraphs: paragraphs.length,
    };
  };

  const stats = getStats();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Estadísticas</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.lines}</Text>
          <Text style={styles.statLabel}>Versos</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.words}</Text>
          <Text style={styles.statLabel}>Palabras</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.characters}</Text>
          <Text style={styles.statLabel}>Caracteres</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.paragraphs}</Text>
          <Text style={styles.statLabel}>Párrafos</Text>
        </View>
      </View>

      <View style={styles.insights}>
        <Text style={styles.insightTitle}>💡 Insights</Text>
        <Text style={styles.insightText}>
          {stats.words > 0 && `Promedio de ${Math.round(stats.characters / stats.words)} caracteres por palabra`}
        </Text>
        {stats.lines > 0 && (
          <Text style={styles.insightText}>
            Promedio de {Math.round(stats.words / stats.lines)} palabras por verso
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6c5ce7',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#636e72',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  insights: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingTop: 15,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
  },
  insightText: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
    marginBottom: 5,
  },
});