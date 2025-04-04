import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from 'expo-local-authentication';

export default function Perfil() {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(true);

  const handleBiometricLogin = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentique-se com biometria',
      });

      if (result.success) {
        Alert.alert('Sucesso', 'Autenticação biométrica bem-sucedida.');
      } else {
        Alert.alert('Falha', 'Autenticação biométrica falhou.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao autenticar com biometria.');
      console.error('Erro de biometria:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Login</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, isLogin && styles.activeTab]}
          onPress={() => setIsLogin(true)}
        >
          <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, !isLogin && styles.activeTab]}
          onPress={() => setIsLogin(false)}
        >
          <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Cadastro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        {isLogin ? (
          <>
            <Text style={styles.sectionTitle}>Faça login</Text>
            <Text style={styles.subtitle}>Entre com sua conta para acesso completo.</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="seu.email@exemplo.com" keyboardType="email-address" />

            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.input} secureTextEntry />

            <TouchableOpacity style={styles.button}>
              <Ionicons name="mail" size={20} color="white" />
              <Text style={styles.buttonText}>Entrar com Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricLogin}>
              <Ionicons name="finger-print" size={20} color="black" />
              <Text style={styles.biometricText}>Entrar com Biometria</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Criar uma conta</Text>
            <Text style={styles.subtitle}>Registre-se para explorar todos os eventos.</Text>

            <Text style={styles.label}>Nome Completo</Text>
            <TextInput style={styles.input} placeholder="Seu nome completo" />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="seu.email@exemplo.com" keyboardType="email-address" />

            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.input} secureTextEntry />

            <Text style={styles.label}>Confirme a Senha</Text>
            <TextInput style={styles.input} secureTextEntry />

            <TouchableOpacity style={styles.button}>
              <Ionicons name="person-add" size={20} color="white" />
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

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
  tabContainer: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#EAECEF",
    borderRadius: 10,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#000",
  },
  formContainer: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  biometricButton: {
    flexDirection: "row",
    backgroundColor: "#EAECEF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  biometricText: {
    fontSize: 16,
    marginLeft: 8,
  },
});