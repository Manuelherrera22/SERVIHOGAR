import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import api from '../services/api';

export default function CreateQuoteScreen({ navigation, route }) {
  const { serviceId } = route.params;
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    estimatedHours: '1',
    laborCost: '',
    materialsCost: '0'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.amount || !formData.description || !formData.laborCost) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    const amount = parseFloat(formData.amount);
    const laborCost = parseFloat(formData.laborCost);
    const materialsCost = parseFloat(formData.materialsCost || '0');

    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'El monto debe ser un número positivo');
      return;
    }

    setLoading(true);

    try {
      await api.post('/quotes', {
        service: serviceId,
        amount,
        description: formData.description,
        estimatedHours: parseInt(formData.estimatedHours),
        laborCost,
        materialsCost
      });

      Alert.alert('Éxito', 'Cotización enviada correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Error al crear cotización');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crear Cotización</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Monto Total (USD) *</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            value={formData.amount}
            onChangeText={(text) => setFormData({ ...formData, amount: text })}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Descripción del Trabajo *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe el trabajo a realizar..."
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Horas Estimadas</Text>
          <TextInput
            style={styles.input}
            placeholder="1"
            value={formData.estimatedHours}
            onChangeText={(text) => setFormData({ ...formData, estimatedHours: text })}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Costo de Mano de Obra (USD) *</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            value={formData.laborCost}
            onChangeText={(text) => setFormData({ ...formData, laborCost: text })}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Costo de Materiales (USD)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            value={formData.materialsCost}
            onChangeText={(text) => setFormData({ ...formData, materialsCost: text })}
            keyboardType="decimal-pad"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Enviando...' : 'Enviar Cotización'}
          </Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


