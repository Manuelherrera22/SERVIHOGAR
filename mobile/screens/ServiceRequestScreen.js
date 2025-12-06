import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// Using TextInput for category selection - can be replaced with Picker component
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function ServiceRequestScreen({ navigation, route }) {
  const [formData, setFormData] = useState({
    category: route.params?.category || 'plomeria',
    title: '',
    description: '',
    urgency: 'medium',
    preferredDate: '',
    preferredTime: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Se necesitan permisos para acceder a las fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      maxImages: 5 - images.length
    });

    if (!result.canceled && result.assets) {
      setImages([...images, ...result.assets]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Se necesitan permisos para acceder a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true
    });

    if (!result.canceled && result.assets && images.length < 5) {
      setImages([...images, result.assets[0]]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    if (images.length === 0) {
      Alert.alert('Error', 'Por favor agrega al menos una foto del daño');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('category', formData.category);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('urgency', formData.urgency);
      if (formData.preferredDate) {
        formDataToSend.append('preferredDate', formData.preferredDate);
      }
      if (formData.preferredTime) {
        formDataToSend.append('preferredTime', formData.preferredTime);
      }

      images.forEach((image, index) => {
        formDataToSend.append('images', {
          uri: image.uri,
          type: 'image/jpeg',
          name: `image_${index}.jpg`
        });
      });

      const response = await api.post('/services', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Alert.alert('Éxito', 'Servicio solicitado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Error al crear servicio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Solicitar Servicio</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Categoría *</Text>
          <View style={styles.categoryGrid}>
            {['plomeria', 'electricidad', 'cerrajeria', 'gas', 'pintura', 'carpinteria', 'mantenimiento', 'otros'].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  formData.category === cat && styles.categoryButtonActive
                ]}
                onPress={() => setFormData({ ...formData, category: cat })}
              >
                <Text style={[
                  styles.categoryButtonText,
                  formData.category === cat && styles.categoryButtonTextActive
                ]}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Fuga de agua en el baño"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Descripción *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe el problema en detalle..."
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Urgencia</Text>
          <View style={styles.urgencyButtons}>
            {[
              { label: 'Baja', value: 'low' },
              { label: 'Media', value: 'medium' },
              { label: 'Alta', value: 'high' },
              { label: 'Urgente', value: 'urgent' }
            ].map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.urgencyButton,
                  formData.urgency === item.value && styles.urgencyButtonActive
                ]}
                onPress={() => setFormData({ ...formData, urgency: item.value })}
              >
                <Text style={[
                  styles.urgencyButtonText,
                  formData.urgency === item.value && styles.urgencyButtonTextActive
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Fotos del daño *</Text>
          <View style={styles.imageContainer}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: image.uri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <Ionicons name="close-circle" size={24} color="#F44336" />
                </TouchableOpacity>
              </View>
            ))}
            {images.length < 5 && (
              <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
                <Ionicons name="camera" size={32} color="#4CAF50" />
                <Text style={styles.addImageText}>Agregar foto</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.imageButtons}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Ionicons name="images" size={20} color="#4CAF50" />
              <Text style={styles.imageButtonText}>Galería</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Ionicons name="camera" size={20} color="#4CAF50" />
              <Text style={styles.imageButtonText}>Cámara</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Enviando...' : 'Solicitar Servicio'}
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  categoryButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 100,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  urgencyButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  urgencyButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 80,
    alignItems: 'center',
  },
  urgencyButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  urgencyButtonText: {
    fontSize: 14,
    color: '#333',
  },
  urgencyButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    margin: 5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  addImageText: {
    marginTop: 5,
    fontSize: 12,
    color: '#4CAF50',
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  imageButtonText: {
    marginLeft: 5,
    color: '#4CAF50',
    fontWeight: '600',
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

