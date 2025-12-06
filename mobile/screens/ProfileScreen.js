import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setProfile(response.data.user);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={64} color="#fff" />
        </View>
        <Text style={styles.name}>{user?.name || 'Usuario'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
        {user?.role === 'technician' && (
          <View style={styles.technicianBadge}>
            <Text style={styles.technicianText}>Técnico Verificado</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          <View style={styles.infoRow}>
            <Ionicons name="call" size={20} color="#4CAF50" />
            <Text style={styles.infoText}>{user?.phone || 'No disponible'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail" size={20} color="#4CAF50" />
            <Text style={styles.infoText}>{user?.email || ''}</Text>
          </View>
        </View>

        {user?.role === 'technician' && profile?.technicianProfile && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil de Técnico</Text>
            <View style={styles.infoRow}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={styles.infoText}>
                Calificación: {profile.technicianProfile.rating?.toFixed(1) || '0.0'} / 5.0
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="document-text" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>
                Reseñas: {profile.technicianProfile.totalReviews || 0}
              </Text>
            </View>
            {profile.technicianProfile.specialties && profile.technicianProfile.specialties.length > 0 && (
              <View style={styles.specialtiesContainer}>
                <Text style={styles.specialtiesLabel}>Especialidades:</Text>
                <View style={styles.specialtiesList}>
                  {profile.technicianProfile.specialties.map((spec, index) => (
                    <View key={index} style={styles.specialtyTag}>
                      <Text style={styles.specialtyText}>{spec}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings" size={24} color="#4CAF50" />
            <Text style={styles.menuText}>Configuración</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle" size={24} color="#4CAF50" />
            <Text style={styles.menuText}>Ayuda y Soporte</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="document-text" size={24} color="#4CAF50" />
            <Text style={styles.menuText}>Términos y Condiciones</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#F44336" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  technicianBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  technicianText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  specialtiesContainer: {
    marginTop: 10,
  },
  specialtiesLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
    marginLeft: 10,
  },
});


