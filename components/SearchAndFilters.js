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

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar en tus poemas..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6c757d"
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
          style={[styles.filterButton, getActiveFiltersCount() > 0 && styles.filterButtonActive]}
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
        <Text style={styles.resultsText}>
          {searchQuery ? `${totalPoems} resultados` : `${totalPoemas} poemas`}
        </Text>
        {getActiveFiltersCount() > 0 && (
          <TouchableOpacity onPress={clearFilters} style={styles.clearFiltersButton}>
            <Text style={styles.clearFiltersText}>Limpiar filtros</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Panel de filtros */}
      <Animated.View style={[styles.filtersPanel, { height: animatedHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Ordenar por */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Ordenar por</Text>
            <View style={styles.filterOptions}>
              {[
                { key: 'date', label: '📅 Fecha' },
                { key: 'title', label: '📝 Título' },
                { key: 'wordCount', label: '📊 Palabras' },
              ].map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.filterOption,
                    filters.sortBy === option.key && styles.filterOptionActive
                  ]}
                  onPress={() => updateFilter('sortBy', option.key)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.sortBy === option.key && styles.filterOptionTextActive
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Orden */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Orden</Text>
            <View style={styles.filterOptions}>
              {[
                { key: 'desc', label: '⬇️ Descendente' },
                { key: 'asc', label: '⬆️ Ascendente' },
              ].map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.filterOption,
                    filters.sortOrder === option.key && styles.filterOptionActive
                  ]}
                  onPress={() => updateFilter('sortOrder', option.key)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.sortOrder === option.key && styles.filterOptionTextActive
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Fecha */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Fecha de creación</Text>
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
                    styles.filterOption,
                    filters.dateRange === option.key && styles.filterOptionActive
                  ]}
                  onPress={() => updateFilter('dateRange', option.key)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.dateRange === option.key && styles.filterOptionTextActive
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
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    color: '#6c757d',
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
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
  resultsText: {
    fontSize: 14,
    color: '#6c757d',
  },
  clearFiltersButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearFiltersText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: '600',
  },
  filtersPanel: {
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 16,
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterOptionActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#6c757d',
  },
  filterOptionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});