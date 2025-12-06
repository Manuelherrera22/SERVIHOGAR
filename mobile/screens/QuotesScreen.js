import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import api from '../services/api';

export default function QuotesScreen({ navigation, route }) {
  const { serviceId } = route.params;
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const response = await api.get('/quotes', {
        params: { service: serviceId }
      });
      setQuotes(response.data.quotes || []);
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderQuote = ({ item }) => (
    <View style={styles.quoteCard}>
      <Text style={styles.quoteAmount}>${item.amount.toFixed(2)}</Text>
      <Text style={styles.quoteDescription}>{item.description}</Text>
      <Text style={styles.quoteTechnician}>
        Por: {item.technician?.name || 'Técnico'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cotizaciones</Text>
      {loading ? (
        <Text>Cargando...</Text>
      ) : quotes.length === 0 ? (
        <Text style={styles.emptyText}>No hay cotizaciones</Text>
      ) : (
        <FlatList
          data={quotes}
          renderItem={renderQuote}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quoteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  quoteAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  quoteDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  quoteTechnician: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
});


