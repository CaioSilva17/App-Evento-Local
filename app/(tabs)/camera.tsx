import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const CameraScreen = () => {
  const navigation = useNavigation();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const cameraRef = useRef(null);

  if (!cameraPermission || !mediaPermission) return <ActivityIndicator />;

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text>Permissão da câmera não concedida</Text>
        <TouchableOpacity onPress={requestCameraPermission}>
          <Text>Permitir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text>Permissão de mídia não concedida</Text>
        <TouchableOpacity onPress={requestMediaPermission}>
          <Text>Permitir acesso à galeria</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhotoAsync({ skipMetadata: true });
      setPhotoUri(photo.uri);
      setCapturedPhotos((prev) => [photo.uri, ...prev]);
      setShowGallery(true);
  
      try {
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        console.log('Foto salva na galeria:', asset.uri);
        Alert.alert('Sucesso', 'Foto salva na galeria!');
      } catch (error) {
        console.error('Erro ao salvar a foto:', error);
        Alert.alert('Erro', 'Não foi possível salvar a foto.');
      }
    }
  };

  const toggleGallery = () => {
    setShowGallery((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Câmera</Text>

      <CameraView
        ref={cameraRef}
        style={styles.cameraPreview}
        facing={facing}
        enableTorch={false}
        photo
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
        >
          <Ionicons name="refresh" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={handleTakePicture} />

        <TouchableOpacity style={styles.controlButton} onPress={toggleGallery}>
          <Ionicons name="images" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      {showGallery && (
        <View style={styles.galleryContainer}>
          <Text style={styles.galleryTitle}>Minhas Fotos</Text>
          <FlatList
            data={capturedPhotos}
            keyExtractor={(item, index) => `${item}-${index}`}
            horizontal
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.galleryImage} />
            )}
          />
        </View>
      )}

      <Text style={styles.footerText}>Capture fotos dos eventos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold' },
  cameraPreview: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#333',
    borderWidth: 4,
    borderColor: '#fff',
  },
  galleryContainer: {
    paddingVertical: 10,
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  galleryImage: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  footerText: {
    textAlign: 'center',
    padding: 16,
    color: '#888',
  },
});

export default CameraScreen;