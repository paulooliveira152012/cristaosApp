import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const NewRoom = () => {
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const placeholderImage = "https://via.placeholder.com/300x150.png?text=Room+Cover";

  const handleCreateRoom = () => {
    if (!title.trim()) {
      return Alert.alert("Título obrigatório", "Por favor, insira o nome da sala.");
    }

    const newRoom = {
      title,
      coverImage: coverUrl || placeholderImage,
      createdAt: new Date().toISOString(),
      createdBy: "Paulinho", // Você pode trocar isso pelo ID do usuário logado
    };

    console.log("✅ Nova sala criada:", newRoom);
    Alert.alert("Sala criada com sucesso!", `Nome: ${title}`);
    setTitle("");
    setCoverUrl("");
  };

  const isValidImageUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Criar Nova Sala</Text>

        <Text style={styles.label}>Título da Sala</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Estudo de Romanos"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>URL da Imagem de Capa (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="https://exemplo.com/imagem.jpg"
          value={coverUrl}
          onChangeText={setCoverUrl}
        />

        <Text style={styles.previewLabel}>Pré-visualização da Capa:</Text>
        <Image
          source={{ uri: isValidImageUrl(coverUrl) ? coverUrl : placeholderImage }}
          style={styles.imagePreview}
        />

        <Pressable style={styles.button} onPress={handleCreateRoom}>
          <Text style={styles.buttonText}>Criar Sala</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewRoom;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  previewLabel: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  imagePreview: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
