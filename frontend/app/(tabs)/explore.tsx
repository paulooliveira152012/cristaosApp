import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  StyleSheet
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface ListingItemType {
  category: "Post" | "Room" | "Group" | "User";
  type:
    | "Blog"
    | "Image"
    | "Video"
    | "Poll"
    | "String"
    | "User"
    | "Room"
    | "Group";
  title?: string;
  image?: any;
  content?: string;
  videoUrl?: string;
  options?: string[];
  name?: string;
  username?: string;
  createdAt?: string;
  likes?: number;
  comments?: any[];
}

const ListingsList: ListingItemType[] = [
  { category: "User", type: "User", name: "Paulo", image: require("../../assets/profile.jpg") },
  { category: "User", type: "User", name: "Gabi", image: require("../../assets/Gabi.jpg") },
  { category: "User", type: "User", name: "Lulu Xibiu", image: require("../../assets/Lulu.jpg") },
  { category: "Room", title: "Estudo de Romanos", image: require("../../assets/placeholder.jpg"), type: "Room" },
  { category: "Room", title: "Outro Estudo Muito Muito Longo Que Precisa Rolar Automaticamente", image: require("../../assets/placeholder.jpg"), type: "Room" },
  { category: "Room", title: "Mais um Estudo", image: require("../../assets/placeholder.jpg"), type: "Room" },
  { category: "Group", title: "Grupo de Meninas Cristas", image: require("../../assets/placeholder.jpg"), type: "Group" },
  { category: "Group", title: "Grupo de Meninos Cristaos", image: require("../../assets/placeholder.jpg"), type: "Group" },
  { category: "Group", title: "Grupo de Menines Cristes", image: require("../../assets/placeholder.jpg"), type: "Group" },
  {
    category: "Post",
    type: "String",
    content: "Bom dia!!!!",
    name: "gabi",
    username: "gabi",
    createdAt: "1/21/20",
    likes: 2,
    comments: [{ user: "paulinho", comment: "bom dia!", commentLikes: 3, likedBy: { username: "pedro" } }],
  },
  {
    category: "Post",
    type: "Blog",
    title: "My Photo",
    image: require("../../assets/profile.jpg"),
    content: "My name is Paulo Oliveira...",
    name: "gabi",
    username: "gabi",
    createdAt: "1/21/20",
    likes: 2,
    comments: [{ user: "paulinho", comment: "bom dia!", commentLikes: 3, likedBy: { username: "pedro" } }],
  },
  {
    category: "Post",
    type: "Image",
    title: "Beautiful Sunset",
    image: require("../../assets/sunset.jpg"),
    content: "Captured this amazing sunset in São Paulo! 🌅",
  },
  {
    category: "Post",
    type: "Video",
    title: "React Native Tips",
    videoUrl: "https://www.example.com/video.mp4",
    content: "Check out my latest tips on React Native development! 🚀",
  },
  {
    category: "Post",
    type: "Poll",
    title: "What's your favorite programming language?",
    options: ["JavaScript", "Python", "C++", "Go"],
  },
];

const categoryMap: { [key: string]: ListingItemType["category"] } = {
  Users: "User",
  Posts: "Post",
  Groups: "Group",
  Rooms: "Room",
};

const ExploreScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Users", "Rooms", "Groups", "Posts"];

  const filteredList = ListingsList.filter((item) => {
    const matchCategory =
      selectedCategory === "All" ||
      item.category === categoryMap[selectedCategory];

    const matchSearch =
      search.trim() === "" ||
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.content?.toLowerCase().includes(search.toLowerCase()) ||
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.username?.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            style={styles.searchInput}
            onChangeText={setSearch}
            value={search}
          />
        </View>

        <View style={styles.searchCategoriesContainer}>
          {categories.map((cat) => (
            <Pressable
              key={cat}
              style={selectedCategory === cat ? styles.selected : styles.categoryButtonContainer}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={selectedCategory === cat ? styles.buttonTextSelected : styles.buttonText}>
                {cat === "All" ? "Todos" : cat}
              </Text>
            </Pressable>
          ))}
        </View>

        <View>
          {filteredList.length === 0 && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Nenhum resultado encontrado.
            </Text>
          )}

          {filteredList.map((item, index) => (
            <View key={index} style={{ marginBottom: 24 }}>
              {item.type === "User" && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 50, marginVertical: 10 }} />
                  <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                </View>
              )}

              {item.type === "Room" || item.type === "Group" ? (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <View style={{ height: 100, width: item.type === "Room" ? "100%" : "60%", backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", zIndex: 100 }} />
                  <Image source={item.image} style={{ height: 100, width: item.type === "Room" ? "100%" : "60%" }} />
                  <Text style={{ position: "absolute", color: "white", fontWeight: "600", zIndex: 300 }}>{item.title}</Text>
                </View>
              ) : null}

              {item.type === "Blog" || item.type === "Image" || item.type === "Video" || item.type === "Poll" ? (
                <>
                  {item.title && <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.title}</Text>}
                  {item.image && (
                    <Image source={item.image} style={{ width: "100%", height: 200, borderRadius: 12, marginVertical: 10 }} resizeMode="cover" />
                  )}
                  {item.videoUrl && (
                    <Text style={{ color: "#539DF3", marginTop: 8 }}>
                      🎥 Watch: {item.videoUrl}
                    </Text>
                  )}
                  {item.content && <Text style={{ color: "#444" }}>{item.content}</Text>}
                  {item.options?.map((option, idx) => (
                    <Text key={idx} style={{ fontSize: 16, marginTop: 6 }}>
                      🔘 {option}
                    </Text>
                  ))}
                </>
              ) : null}

              {item.type === "String" && (
                <Text style={{ fontSize: 16 }}>{item.content}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  searchIcon: {
    position: "absolute",
    right: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  searchCategoriesContainer: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "red",
    minHeight: 30,
    marginBottom: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },

  categoryButtonContainer: {
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    padding: 5,
    width: "20%",
  },

  buttonText: {
    textAlign: "center",
    // backgroundColor: "green"
  },

  selected: {
    backgroundColor: "#539DF3",
    borderRadius: 20,
    padding: 5,
    width: "20%",
  },

  buttonTextSelected: {
    color: "white",
    textAlign: "center"
  }
});
