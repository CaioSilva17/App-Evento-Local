import { Tabs } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import LoadingScreen from "../../components/loadingscreen"; 

export default function TabLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#333",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          paddingBottom: 10,
          paddingTop: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Evento Local",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <MaterialIcons name="event" size={26} color={focused ? "#fff" : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Mapa de Eventos",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <MaterialIcons name="place" size={26} color={focused ? "#fff" : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "Câmera",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <MaterialIcons name="photo-camera" size={26} color={focused ? "#fff" : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil do Usuário",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <MaterialIcons name="person" size={26} color={focused ? "#fff" : color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  activeIcon: {
    backgroundColor: "#222",
  },
});