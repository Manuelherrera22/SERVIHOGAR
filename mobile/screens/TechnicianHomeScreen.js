import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function TechnicianHomeScreen({ navigation }) {
  const [stats, setStats] = useState({
    totalServices: 0,
    activeServices: 0,
    completedServices: 0,
    totalEarnings: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const servicesResponse = await api.get('/technicians/my-services');
      const services = servicesResponse.data.services || [];
      
      const paymentsResponse = await api.get('/payments');
      const payments = paymentsResponse.data.payments || [];
      
      const completed = payments.filter(p => p.status === 'completed');
      const totalEarnings = completed.reduce((sum, p) => sum + p.amount, 0);

      setStats({
        totalServices: services.length,
        activeServices: services.filter(s => s.status === 'in_progress').length,
        completedServices: services.filter(s => s.status === 'completed').length,
        totalEarnings
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Panel de Técnico</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="briefcase" size={32} color="#4CAF50" />
            <Text style={styles.statNumber}>{stats.totalServices}</Text>
            <Text style={styles.statLabel}>Servicios Totales</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={32} color="#FF9800" />
            <Text style={styles.statNumber}>{stats.activeServices}</Text>
            <Text style={styles.statLabel}>En Progreso</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={32} color="#2196F3" />
            <Text style={styles.statNumber}>{stats.completedServices}</Text>
            <Text style={styles.statLabel}>Completados</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="cash" size={32} color="#9C27B0" />
            <Text style={styles.statNumber}>${stats.totalEarnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Ganancias Totales</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigation.navigate('AvailableServices')}
        >
          <Ionicons name="search" size={24} color="#4CAF50" />
          <Text style={styles.quickActionText}>Ver Servicios Disponibles</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  content: {
    padding: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  quickAction: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    elevation: 2,
  },
  quickActionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 15,
  },
});


