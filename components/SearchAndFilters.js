import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  ScrollView,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function SearchAndFilters({ 
  onSearch, 
  onFilter, 
  totalPoems = 0 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'date', // date, title, wordCount
    sortOrder: 'desc', // asc, desc
    dateRange: 'all', // today, week, month, year, all
    wordCount: 'all', // short, medium, long, all
  });
  const [animatedHeight] = useState(new Animated.Value(0));
  const { theme } = useTheme();

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(searchQuery, filters);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, filters]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    Animated.timing(animatedHeight, {
      toValue: showFilters ? 0 : 200,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      sortBy: 'date',
      sortOrder: 'desc',
      dateRange: 'all',
      wordCount: 'all',
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.sortBy !== 'date') count++;
    if (filters.sortOrder !== 'desc') count++;
    if (filters.dateRange !== 'all') count++;
    if (filters.wordCount !== 'all') count++;
    return count;
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.background,
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 44,
      borderWidth: 1,
      borderColor: theme.border,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
    },
    filterButton: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      position: 'relative',
    },
    filterButtonActive: {
      backgroundColor: theme.primary,
    },
    resultsText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    clearFiltersText: {
      color: theme.primary,
      fontSize: 12,
      fontWeight: '600',
    },
    filtersPanel: {
      overflow: 'hidden',
      backgroundColor: theme.background,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    filterTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    filterOption: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    filterOptionActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    filterOptionText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    filterOptionTextActive: {
      color: '#fff',
      fontWeight: '600',
    },
  });

  return (
    <View style={dynamicStyles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={dynamicStyles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={dynamicStyles.searchInput}
            placeholder="Buscar en tus poemas..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={[dynamicStyles.filterButton, getActiveFiltersCount() > 0 && dynamicStyles.filterButtonActive]}
          onPress={toggleFilters}
        >
          <Text style={styles.filterIcon}>⚙️</Text>
          {getActiveFiltersCount() > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{getActiveFiltersCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Resultados */}
      <View style={styles.resultsContainer}>
        <Text style={dynamicStyles.resultsText}>
          {searchQuery ? `${totalPoems} resultados` : `${totalPoems} poemas`}
        </Text>
        {getActiveFiltersCount() > 0 && (
          <TouchableOpacity onPress={clearFilters} style={styles.clearFiltersButton}>
            <Text style={dynamicStyles.clearFiltersText}>Limpiar filtros</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Panel de filtros */}
      <Animated.View style={[dynamicStyles.filtersPanel, { height: animatedHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Ordenar por */}
          <View style={styles.filterSection}>
            <Text style={dynamicStyles.filterTitle}>Ordenar por</Text>
            <View style={styles.filterOptions}>
              {[
                { key: 'date', label: '📅 Fecha' },
                { key: 'title', label: '📝 Título' },
                { key: 'wordCount', label: '📊 Palabras' },
              ].map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    dynamicStyles.filterOption,
                    filters.sortBy === option.key && dynamicStyles.filterOptionActive
                  ]}
                  onPress={() => updateFilter('sortBy', option.key)}
                >
                  <Text style={[
                    dynamicStyles.filterOptionText,
                    filters.sortBy === option.key && dynamicStyles.filterOptionTextActive
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Orden */}
          <View style={styles.filterSection}>
            <Text style={dynamicStyles.filterTitle}>Orden</Text>
            <View style={styles.filterOptions}>
              {[
                { key: 'desc', label: '⬇️ Descendente' },
                { key: 'asc', label: '⬆️ Ascendente' },
                              ].map(option => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      dynamicStyles.filterOption,
                      filters.sortOrder === option.key && dynamicStyles.filterOptionActive
                    ]}
                    onPress={() => updateFilter('sortOrder', option.key)}
                  >
                    <Text style={[
                      dynamicStyles.filterOptionText,
                      filters.sortOrder === option.key && dynamicStyles.filterOptionTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>

          {/* Fecha */}
          <View style={styles.filterSection}>
            <Text style={dynamicStyles.filterTitle}>Fecha de creación</Text>
            <View style={styles.filterOptions}>
              {[
                { key: 'all', label: '🗓️ Todos' },
                { key: 'today', label: '📅 Hoy' },
                { key: 'week', label: '📅 Esta semana' },
                { key: 'month', label: '📅 Este mes' },
                              ].map(option => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      dynamicStyles.filterOption,
                      filters.dateRange === option.key && dynamicStyles.filterOptionActive
                    ]}
                    onPress={() => updateFilter('dateRange', option.key)}
                  >
                    <Text style={[
                      dynamicStyles.filterOptionText,
                      filters.dateRange === option.key && dynamicStyles.filterOptionTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    color: '#6c757d',
    fontSize: 16,
  },
  filterIcon: {
    fontSize: 16,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#dc3545',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  clearFiltersButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});