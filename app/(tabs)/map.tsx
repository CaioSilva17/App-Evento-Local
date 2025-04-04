import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);

  const events = [
    { id: 1, title: "Festival de Música", distance: "1.2km", latitude: -22.409158271438876, longitude: -43.66404071524166, date: "Hoje", time: "20:00", icon: "music-note" },
    { id: 2, title: "Feira Gastronômica", distance: "2.5km", latitude: -22.42049015913499, longitude: -43.681306845565906, date: "Amanhã", time: "10:00", icon: "local-dining" },
  ];
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Permissão de localização negada!");
        setLoading(false);
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setLoading(false);
    })();
  }, []);

  const EventCard = ({ event }) => (
    <View style={styles.card}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <View style={styles.eventDetails}>
        <Text style={styles.eventDate}>{event.date}</Text>
        {event.icon && <MaterialIcons name={event.icon} size={18} color="gray" />}
      </View>
      <Text style={styles.eventTime}>{event.time} - {event.distance} de distância</Text>
      <View style={styles.cardButtons}>
        <TouchableOpacity style={styles.detailsButton} onPress={() => Alert.alert("Detalhes", "Detalhes do evento")}>
          <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapButton} onPress={() => setRegion({ latitude: event.latitude, longitude: event.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 })}>
          <MaterialIcons name="place" size={18} color="black" />
          <Text style={styles.mapButtonText}>Ver no mapa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Mapa de Eventos</Text>

      <View style={styles.searchContainer}>
        <TextInput placeholder="Buscar eventos..." style={styles.searchInput} />
        <TouchableOpacity style={styles.searchButton}>
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : region ? (
          <MapView style={styles.map} initialRegion={region}>
            {location && (
              <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Você está aqui" />
            )}
            {events.map((event) => (
              <Marker key={event.id} coordinate={{ latitude: event.latitude, longitude: event.longitude }} title={event.title} />
            ))}
          </MapView>
        ) : (
          <Text style={styles.loadingText}>Não foi possível carregar o mapa</Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>Eventos Próximos</Text>
      <ScrollView>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  backButton: { marginBottom: 10 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  searchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  searchInput: { flex: 1, padding: 10, borderWidth: 1, borderRadius: 10, borderColor: "#ddd", marginRight: 10 },
  searchButton: { padding: 10, backgroundColor: "#f0f0f0", borderRadius: 10 },
  mapContainer: { height: 250, borderRadius: 10, overflow: "hidden", marginBottom: 20 },
  map: { width: "100%", height: "100%" },
  loadingText: { textAlign: "center", color: "gray", marginTop: 20 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: { 
    backgroundColor: "#F8F9FA", 
    padding: 20, 
    borderRadius: 10, 
    marginBottom: 15, 
    marginHorizontal: 10,
  },
  eventTitle: { fontSize: 18, fontWeight: "bold" },
  eventDetails: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 5 },
  eventDate: { fontSize: 16, fontWeight: "bold" },
  eventTime: { fontSize: 14, color: "gray" },
  cardButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  detailsButton: {
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsButtonText: { color: "white", fontSize: 14 },
  mapButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#EAECEF", padding: 8, borderRadius: 5 },
  mapButtonText: { marginLeft: 5 },
});