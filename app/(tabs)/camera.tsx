import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const CameraScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Câmera</Text>

      <View style={styles.cameraPreview}>
        <Image
          source={require('../../assets/images/megafone.png')}
          style={styles.cameraIcon}
        />
        <Text style={styles.previewText}>Integração com câmera em desenvolvimento</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="refresh" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} />
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="image" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Capture fotos dos eventos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  cameraPreview: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  previewText: {
    color: '#fff',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 20,
  },
  controlButton: {
    width: 60, // Ajuste o tamanho conforme necessário
    height: 60, // Ajuste o tamanho conforme necessário
    borderRadius: 30, // Metade da largura/altura para torná-lo circular
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
  },
  footerText: {
    textAlign: 'center',
    padding: 16,
    color: '#888',
  },
});

export default CameraScreen;