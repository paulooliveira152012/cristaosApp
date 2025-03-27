import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const tabs = ["Post", "Imagem", "Enquete", "Link", "Chat", "Grupo"];

const NewListing = () => {
  const [activeTab, setActiveTab] = useState("Post");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 16 }}>
      {/* Tabs */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 20,
              backgroundColor: activeTab === tab ? "#539DF3" : "#f0f0f0",
            }}
          >
            <Text style={{ color: activeTab === tab ? "#fff" : "#444", fontWeight: "500" }}>{tab}</Text>
          </Pressable>
        ))}
      </View>

      {/* Post */}
      {activeTab === "Post" && (
        <View>
          <TextInput
            placeholder="Título"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            style={{ fontSize: 18, marginBottom: 12 }}
          />
          <TextInput
            placeholder="Escreva suas ideias"
            placeholderTextColor="#aaa"
            value={content}
            onChangeText={setContent}
            multiline
            style={{ minHeight: 100, textAlignVertical: "top", fontSize: 16 }}
          />
        </View>
      )}

      {/* Imagem */}
      {activeTab === "Imagem" && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: "#f2f2f2",
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="image" size={48} color="#ccc" />
          </View>
          <TextInput
            placeholder="Insira uma legenda"
            placeholderTextColor="#aaa"
            style={{
              marginTop: 12,
              fontSize: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
              width: "100%",
              textAlign: "center",
            }}
          />
        </View>
      )}

      {/* Enquete */}
      {activeTab === "Enquete" && (
        <View>
          <TextInput
            placeholder="Pergunta da Enquete"
            placeholderTextColor="#aaa"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginBottom: 20,
              fontSize: 16,
            }}
          />
          {[1, 2].map((opt, i) => (
            <TextInput
              key={i}
              placeholder={`Opção ${opt}`}
              placeholderTextColor="#aaa"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
                marginBottom: 16,
                fontSize: 16,
              }}
            />
          ))}
        </View>
      )}

      {/* Link */}
      {activeTab === "Link" && (
        <View>
          <TextInput
            placeholder="Cole o link aqui"
            placeholderTextColor="#aaa"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              fontSize: 16,
              marginBottom: 12,
            }}
          />
          <TextInput
            placeholder="Comentário opcional"
            placeholderTextColor="#aaa"
            multiline
            style={{
              minHeight: 80,
              textAlignVertical: "top",
              fontSize: 16,
            }}
          />
        </View>
      )}

      {/* Chat */}
      {activeTab === "Chat" && (
        <View>
          <TextInput
            placeholder="Nome do Chat"
            placeholderTextColor="#aaa"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              fontSize: 16,
              marginBottom: 16,
            }}
          />
          <TextInput
            placeholder="Descrição (opcional)"
            placeholderTextColor="#aaa"
            multiline
            style={{
              minHeight: 60,
              textAlignVertical: "top",
              fontSize: 16,
              marginBottom: 16,
            }}
          />
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}>
              <Text>📝 Texto</Text>
            </Pressable>
            <Pressable style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}>
              <Text>🎤 Áudio</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Grupo */}
      {activeTab === "Grupo" && (
        <View>
          <TextInput
            placeholder="Nome do Grupo"
            placeholderTextColor="#aaa"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              fontSize: 16,
              marginBottom: 16,
            }}
          />
          <TextInput
            placeholder="Descrição do grupo"
            placeholderTextColor="#aaa"
            multiline
            style={{
              minHeight: 80,
              textAlignVertical: "top",
              fontSize: 16,
              marginBottom: 16,
            }}
          />
          <Text style={{ marginBottom: 8, fontWeight: "500" }}>Chat interno:</Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}>
              <Text>📝 Texto</Text>
            </Pressable>
            <Pressable style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}>
              <Text>🎤 Áudio</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default NewListing;
