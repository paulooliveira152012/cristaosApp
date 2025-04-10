import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  handleSubmitNewListing,
  handleSelectImage,
} from "../../functions/functions";
import { useUser } from "context/UserContext";
import { router } from "expo-router";

const tabs = ["Post", "Imagem", "Enquete", "Link", "Chat", "Grupo"];

const NewListing = () => {
  const [activeTab, setActiveTab] = useState("Post");
  // Post
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // Image
  const [image, setImage] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  // enquete
  const [question, setPoolQuestion] = useState("");
  const [poolOptions, setPoolOptions] = useState(["", ""]); // começa com 2 opções vazias

  // link
  const [link, setLink] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  // chat
  const [chatTitle, setChatTitle] = useState("");
  const [chatDescription, setChatDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const placeholderImage =
    "https://via.placeholder.com/300x150.png?text=Room+Cover";
  // group
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [group, setGroup] = useState([]);

  const tabToTypeMap: { [key: string]: string } = {
    Post: "Thought",
    Imagem: "Image",
    Enquete: "Poll",
    Link: "Link",
    Chat: "Chat",
    Grupo: "Group",
  };

  const user = useUser();

  const updateOption = (text: string, index: number) => {
    const newOptions = [...poolOptions];
    newOptions[index] = text;
    setPoolOptions(newOptions);
  };

  const addOption = () => {
    setPoolOptions([...poolOptions, ""]);
  };

  useEffect(() => {
    console.log("user in submit new listing:", user.currentUser._id);
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: 16,
      }}
    >
      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 16,
        }}
      >
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
            <Text
              style={{
                color: activeTab === tab ? "#fff" : "#444",
                fontWeight: "500",
              }}
            >
              {tab}
            </Text>
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
      {/* Imagem */}
      {activeTab === "Imagem" && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Pressable onPress={() => handleSelectImage(setImage)}>
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
                overflow: "hidden",
              }}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              ) : (
                <Feather name="image" size={48} color="#ccc" />
              )}
            </View>
          </Pressable>

          <TextInput
            placeholder="Insira uma legenda"
            placeholderTextColor="#aaa"
            value={imageDescription}
            onChangeText={setImageDescription}
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
            onChangeText={setPoolQuestion}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginBottom: 20,
              fontSize: 16,
            }}
          />
          {poolOptions.map((opt, index) => (
            <TextInput
              key={index}
              value={opt}
              onChangeText={(text) => updateOption(text, index)}
              placeholder={`Opção ${index + 1}`}
              placeholderTextColor="#aaa"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
                marginBottom: 12,
                fontSize: 16,
              }}
            />
          ))}

          <Pressable
            onPress={addOption}
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#f0f0f0",
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 8,
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#539DF3", fontWeight: "600" }}>
              + Adicionar opção
            </Text>
          </Pressable>
        </View>
      )}

      {/* Link */}
      {activeTab === "Link" && (
        <View>
          <TextInput
            placeholder="Cole o link aqui"
            placeholderTextColor="#aaa"
            onChangeText={setLink}
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
            onChangeText={setLinkDescription}
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
            onChangeText={setChatTitle}
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
            onChangeText={setChatDescription}
            multiline
            style={{
              minHeight: 60,
              textAlignVertical: "top",
              fontSize: 16,
              marginBottom: 16,
            }}
          />
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable
              style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}
            >
              <Text>📝 Texto</Text>
            </Pressable>
            <Pressable
              style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}
            >
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
            onChangeText={setGroupName}
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
            onChangeText={setGroupDescription}
            placeholderTextColor="#aaa"
            multiline
            style={{
              minHeight: 80,
              textAlignVertical: "top",
              fontSize: 16,
              marginBottom: 16,
            }}
          />
          <Text style={{ marginBottom: 8, fontWeight: "500" }}>
            Chat interno:
          </Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable
              style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}
            >
              <Text>📝 Texto</Text>
            </Pressable>
            <Pressable
              style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}
            >
              <Text>🎤 Áudio</Text>
            </Pressable>
          </View>
        </View>
      )}

      <Button
        title="submit"
        onPress={() => {
          const listingPayload = {
            type: tabToTypeMap[activeTab] || activeTab, // Mapeia o nome da aba para o tipo correspondente
            title,
            content,
            image,
            imageDescription,
            question,
            poolOptions: poolOptions.map((text) => ({ text })), // importante!
            link,
            linkDescription,
            chatTitle,
            chatDescription,
            groupTitle: groupName,
            groupDescription,
            createdBy: user?.currentUser?._id,
          };

          {
            handleSubmitNewListing(listingPayload),
            console.log("navegar para pagina principal apos criar novoa listagem");
            router.push("/");
          }
        }}
      />
    </View>
  );
};

export default NewListing;
