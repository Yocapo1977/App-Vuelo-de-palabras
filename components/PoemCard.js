import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function PoemCard({ 
  poem, 
  onPress, 
  onLongPress, 
  index = 0 
}) {
  const [scaleValue] = useState(new Animated.Value(1));
  const { theme } = useTheme();

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
    });
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getPreviewLines = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.slice(0, 3);
  };

  // Colores dinámicos basados en el índice y tema
  const cardColors = [
    { primary: theme.primary, secondary: theme.primary + '20' },
    { primary: theme.success, secondary: theme.success + '20' },
    { primary: theme.error, secondary: theme.error + '20' },
    { primary: theme.accent, secondary: theme.accent + '20' },
    { primary: theme.warning, secondary: theme.warning + '20' },
  ];

  const colorScheme = cardColors[index % cardColors.length];

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        { transform: [{ scale: scaleValue }] }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.card, 
          { 
            borderLeftColor: colorScheme.primary,
            backgroundColor: theme.card,
            shadowColor: theme.text,
          }
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {/* Header con título y estadísticas */}
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
              {poem.title}
            </Text>
            <View style={styles.statsContainer}>
              <View style={[styles.statBadge, { backgroundColor: colorScheme.secondary }]}>
                <Text style={[styles.statText, { color: colorScheme.primary }]}>
                  {getWordCount(poem.content)} palabras
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Text style={[styles.date, { color: theme.textSecondary }]}>{formatDate(poem.updatedAt)}</Text>
          </View>
        </View>

        {/* Contenido del poema */}
        <View style={styles.contentContainer}>
          {getPreviewLines(poem.content).map((line, index) => (
            <Text 
              key={index} 
              style={[styles.previewLine, { color: theme.textSecondary }]}
              numberOfLines={1}
            >
              {line.trim()}
            </Text>
          ))}
          {poem.content.split('\n').length > 3 && (
            <Text style={[styles.moreText, { color: theme.textSecondary }]}>
              +{poem.content.split('\n').length - 3} líneas más...
            </Text>
          )}
        </View>

        {/* Footer con acciones rápidas */}
        <View style={[styles.cardFooter, { backgroundColor: theme.surface }]}>
          <View style={styles.tagsContainer}>
            <View style={[styles.tag, { backgroundColor: colorScheme.primary }]}>
              <Text style={styles.tagText}>✨ Poesía</Text>
            </View>
          </View>
          
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: colorScheme.secondary }]}
              onPress={() => {/* Compartir rápido */}}
            >
              <Text style={[styles.quickActionText, { color: colorScheme.primary }]}>
                📤
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: colorScheme.secondary }]}
              onPress={() => {/* Favoritos */}}
            >
              <Text style={[styles.quickActionText, { color: colorScheme.primary }]}>
                ❤️
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  previewLine: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  moreText: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  quickAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 14,
  },
});