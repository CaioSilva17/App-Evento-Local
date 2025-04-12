import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const events = [
  { id: 1, title: "Festival de Música", date: "Hoje", time: "20:00", location: "Parque Central", icon: "music-note" },
  { id: 2, title: "Feira Gastronômica", date: "Amanhã", time: "10:00", location: "Praça das Artes", icon: "local-dining" },
  { id: 3, title: "Exposição de Arte", date: "Sexta", time: "14:00", location: "Museu Municipal", icon: "person-outline" },
];

const featuredEvent = {
  title: "Evento em Destaque",
  subtitle: "Festival de Cultura Local - Este final de semana",
  description: "Venha participar do maior evento cultural da cidade, com apresentações de música, dança, gastronomia e muito mais!",
};

const TABS = ["Destaques", "Categorias", "Próximos"];

const EventCard = ({ event }) => (
  <View style={styles.card}>
    <Text style={styles.eventTitle}>{event.title}</Text>
    <View style={styles.eventDetails}>
      <Text style={styles.eventDate}>{event.date}</Text>
      {event.icon && <MaterialIcons name={event.icon} size={18} color="gray" />}
    </View>
    <Text style={styles.eventTime}>{event.time} - {event.location}</Text>
    <TouchableOpacity style={styles.button} onPress={() => alert("Detalhes do evento")}>
      <Text style={styles.buttonText}>Ver Detalhes</Text>
    </TouchableOpacity>
  </View>
);

const FeaturedEventCard = ({ customDescription }) => (
  <View style={styles.card}>
    <Text style={styles.featuredTitle}>{featuredEvent.title}</Text>
    <Text style={styles.featuredSubtitle}>{featuredEvent.subtitle}</Text>
    <View style={styles.featuredImagePlaceholder}>
      <MaterialIcons name="confirmation-number" size={40} color="gray" />
    </View>
    <Text style={styles.featuredDescription}>
      {customDescription || featuredEvent.description}
    </Text>
    <View style={styles.featuredButtons}>
      <TouchableOpacity style={styles.mapButton}>
        <MaterialIcons name="place" size={18} color="black" />
        <Text style={styles.mapButtonText}>Ver no mapa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.participateButton}>
        <Text style={styles.participateButtonText}>Participar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState("Destaques");
  const [descricao, setDescricao] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/images/megafone.png")} style={styles.logo} />
      </View>
      <Text style={styles.subtitle}>Descubra os melhores eventos próximos a você</Text>

      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.tabActive]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Formulário de descrição */}
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Adicione uma descrição personalizada:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui..."
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => alert("Descrição adicionada: " + descricao)}
        >
          <Text style={styles.submitButtonText}>Salvar Descrição</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[{ id: "featured", isFeatured: true }, ...events]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          item.isFeatured ? <FeaturedEventCard customDescription={descricao} /> : <EventCard event={item} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  logoContainer: { alignItems: "center", marginBottom: 10 },
  logo: { width: 120, height: 50, resizeMode: "contain" },
  subtitle: { fontSize: 16, color: "gray", textAlign: "center", marginBottom: 15 },
  tabContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 15 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10 },
  tabActive: { backgroundColor: "#E8F0FE" },
  tabText: { fontSize: 16, color: "gray" },
  tabTextActive: { color: "black", fontWeight: "bold" },
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
  button: {
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 5,
  },
  buttonText: { color: "white", fontSize: 14 },
  featuredTitle: { fontSize: 20, fontWeight: "bold" },
  featuredSubtitle: { fontSize: 14, color: "gray", marginBottom: 10 },
  featuredImagePlaceholder: {
    backgroundColor: "#F0F0F0",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  featuredDescription: { fontSize: 14, color: "gray", marginBottom: 10 },
  featuredButtons: { flexDirection: "row", justifyContent: "space-between" },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAECEF",
    padding: 10,
    borderRadius: 5,
  },
  mapButtonText: { marginLeft: 5 },
  participateButton: { backgroundColor: "#000", padding: 10, borderRadius: 5 },
  participateButtonText: { color: "white" },

  // estilos do formulário
  formContainer: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    minHeight: 60,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
