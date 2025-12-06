import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function AvailableServicesScreen({ navigation }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await api.get('/technicians/available-services');
      setServices(response.data.services || []);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadServices();
  };

  const renderService = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigation.navigate('ServiceDetail', { serviceId: item._id })}
    >
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(item.urgency) }]}>
          <Text style={styles.urgencyText}>{getUrgencyText(item.urgency)}</Text>
        </View>
      </View>
      <Text style={styles.serviceCategory}>{item.category}</Text>
      <Text style={styles.serviceDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.serviceFooter}>
        <View style={styles.userInfo}>
          <Ionicons name="person" size={16} color="#666" />
          <Text style={styles.userName}>{item.user?.name || 'Usuario'}</Text>
        </View>
        <TouchableOpacity
          style={styles.quoteButton}
          onPress={() => navigation.navigate('CreateQuote', { serviceId: item._id })}
        >
          <Text style={styles.quoteButtonText}>Cotizar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const getUrgencyColor = (urgency) => {
    const colors = {
      low: '#4CAF50',
      medium: '#FF9800',
      high: '#F44336',
      urgent: '#9C27B0'
    };
    return colors[urgency] || '#999';
  };

  const getUrgencyText = (urgency) => {
    const texts = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta',
      urgent: 'Urgente'
    };
    return texts[urgency] || urgency;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Servicios Disponibles</Text>
      </View>

      {services.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="briefcase-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No hay servicios disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={services}
          renderItem={renderService}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    padding: 15,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  urgencyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  urgencyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  serviceCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  quoteButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quoteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
  },
});


