import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const categories = [
  { id: 'plomeria', name: 'Plomería', icon: 'water' },
  { id: 'electricidad', name: 'Electricidad', icon: 'flash' },
  { id: 'cerrajeria', name: 'Cerrajería', icon: 'lock-closed' },
  { id: 'gas', name: 'Gas', icon: 'flame' },
  { id: 'pintura', name: 'Pintura', icon: 'brush' },
  { id: 'carpinteria', name: 'Carpintería', icon: 'hammer' },
  { id: 'mantenimiento', name: 'Mantenimiento', icon: 'build' },
  { id: 'otros', name: 'Otros', icon: 'ellipsis-horizontal' },
];

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.services || []);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('ServiceRequest', { category: item.id })}
    >
      <Ionicons name={item.icon} size={32} color="#4CAF50" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderService = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigation.navigate('ServiceDetail', { serviceId: item._id })}
    >
      {item.images && item.images.length > 0 && (
        <Image
          source={{ uri: `http://localhost:5000${item.images[0].url}` }}
          style={styles.serviceImage}
        />
      )}
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.serviceCategory}>{item.category}</Text>
        <View style={styles.serviceStatus}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FF9800',
      quoted: '#2196F3',
      accepted: '#4CAF50',
      in_progress: '#9C27B0',
      completed: '#4CAF50',
      cancelled: '#F44336'
    };
    return colors[status] || '#999';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pendiente',
      quoted: 'Cotizado',
      accepted: 'Aceptado',
      in_progress: 'En progreso',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };
    return texts[status] || status;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ServiHome</Text>
        <Text style={styles.headerSubtitle}>Hola, {user?.name}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías de Servicios</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
          />
        </View>

        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => navigation.navigate('ServiceRequest')}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.requestButtonText}>Solicitar Servicio</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Servicios</Text>
          {loading ? (
            <Text>Cargando...</Text>
          ) : services.length === 0 ? (
            <Text style={styles.emptyText}>No tienes servicios aún</Text>
          ) : (
            <FlatList
              data={services}
              renderItem={renderService}
              keyExtractor={(item) => item._id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  requestButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    elevation: 3,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  serviceImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  serviceInfo: {
    padding: 15,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  serviceCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  serviceStatus: {
    marginTop: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});


