import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function ServiceDetailScreen({ navigation, route }) {
  const { serviceId } = route.params;
  const [service, setService] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    try {
      const response = await api.get(`/services/${serviceId}`);
      setService(response.data.service);
      setQuotes(response.data.quotes || []);
    } catch (error) {
      Alert.alert('Error', 'Error al cargar el servicio');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptQuote = async (quoteId) => {
    Alert.alert(
      'Aceptar Cotización',
      '¿Estás seguro de que deseas aceptar esta cotización?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aceptar',
          onPress: async () => {
            try {
              await api.put(`/quotes/${quoteId}/accept`);
              Alert.alert('Éxito', 'Cotización aceptada', [
                { text: 'OK', onPress: () => navigation.navigate('Quotes', { serviceId }) }
              ]);
              loadService();
            } catch (error) {
              Alert.alert('Error', error.response?.data?.message || 'Error al aceptar cotización');
            }
          }
        }
      ]
    );
  };

  const handleRejectQuote = async (quoteId) => {
    try {
      await api.put(`/quotes/${quoteId}/reject`);
      loadService();
    } catch (error) {
      Alert.alert('Error', 'Error al rechazar cotización');
    }
  };

  const handlePay = (quote) => {
    navigation.navigate('Payment', { quoteId: quote._id, serviceId });
  };

  if (loading || !service) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Servicio</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.category}>{service.category}</Text>
        <Text style={styles.description}>{service.description}</Text>

        {service.images && service.images.length > 0 && (
          <View style={styles.imagesContainer}>
            <FlatList
              horizontal
              data={service.images}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: `http://localhost:5000${item.url}` }}
                  style={styles.image}
                />
              )}
            />
          </View>
        )}

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Estado:</Text>
          <Text style={[styles.status, { color: getStatusColor(service.status) }]}>
            {getStatusText(service.status)}
          </Text>
        </View>

        {service.assignedTechnician && (
          <View style={styles.technicianContainer}>
            <Text style={styles.sectionTitle}>Técnico Asignado</Text>
            <Text style={styles.technicianName}>{service.assignedTechnician.name}</Text>
            <Text style={styles.technicianPhone}>{service.assignedTechnician.phone}</Text>
          </View>
        )}

        <View style={styles.quotesSection}>
          <Text style={styles.sectionTitle}>Cotizaciones ({quotes.length})</Text>
          {quotes.length === 0 ? (
            <Text style={styles.emptyText}>Aún no hay cotizaciones</Text>
          ) : (
            quotes.map((quote) => (
              <View key={quote._id} style={styles.quoteCard}>
                <View style={styles.quoteHeader}>
                  <Text style={styles.quoteAmount}>${quote.amount.toFixed(2)}</Text>
                  {quote.status === 'accepted' && (
                    <Text style={styles.acceptedBadge}>Aceptada</Text>
                  )}
                </View>
                <Text style={styles.quoteDescription}>{quote.description}</Text>
                <Text style={styles.quoteTechnician}>
                  Por: {quote.technician?.name || 'Técnico'}
                </Text>
                {quote.status === 'pending' && (
                  <View style={styles.quoteActions}>
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => handleAcceptQuote(quote._id)}
                    >
                      <Text style={styles.acceptButtonText}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => handleRejectQuote(quote._id)}
                    >
                      <Text style={styles.rejectButtonText}>Rechazar</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {quote.status === 'accepted' && (
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => handlePay(quote)}
                  >
                    <Text style={styles.payButtonText}>Pagar Ahora</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  imagesContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  technicianContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  technicianName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  technicianPhone: {
    fontSize: 16,
    color: '#666',
  },
  quotesSection: {
    marginTop: 20,
  },
  quoteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  quoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  quoteAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  acceptedBadge: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: '600',
  },
  quoteDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  quoteTechnician: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  quoteActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});


