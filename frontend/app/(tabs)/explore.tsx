import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants  from "expo-constants";


interface ListingItemType {
  category: "Post" | "Room" | "Group" | "User";
  type:
    | "Blog"
    | "Thought"
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

const categoryMap: { [key: string]: ListingItemType["category"] } = {
  Users: "User",
  Posts: "Post",
  Groups: "Group",
  Rooms: "Room",
};

const ExploreScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState<ListingItemType[]>([]);

  const categories = ["All", "Users", "Rooms", "Groups", "Posts"];

  
  // buscar tudo
  useEffect(() => {

  const baseApi =
  Constants.expoConfig?.extra?.apiUrl ??
  "https://2cd4-2601-8c-4c80-5f70-207d-abab-7889-aaa8.ngrok-free.app";


    const fetchExploreData = async () => {
      try {
        const urls = [
          `${baseApi}/api/listings/getListings`,
          `${baseApi}/api/users/getAllUsers`,
          `${baseApi}/api/rooms/getRooms`,
          `${baseApi}/api/groups/getGroups`,
        ];

        const responses = await Promise.all(urls.map((url) => fetch(url)));

        console.log("todos os items vindo para a pagina de busca:", responses);

        // Verifica se todas as respostas deram certo
        for (const res of responses) {
          if (!res.ok) {
            throw new Error(
              `❌ Falha ao buscar: ${res.url} | Status: ${res.status}`
            );
          }
        }

        const [listings, users, rooms, groups] = await Promise.all(
          responses.map((res) => res.json().catch(() => []))
        );

        const normalized: ListingItemType[] = [
          ...listings.map((item: any) => ({
            ...item,
            category: "Post",
            type: item.type || "String",
            image: item.image ? { uri: item.image } : undefined, // 👈 isso aqui é chave
            title: item.title || item.caption || item.content || "Sem título",
            content: item.content,
          })),
          ...users.map((user: any) => ({
            category: "User",
            type: "User",
            name: user.name || user.username,
            username: user.username,
            image: { uri: user.profileImage },
          })),
          ...groups.map((group: any) => ({
            category: "Group",
            type: "Group",
            title: group.name,
            image: require("../../assets/placeholder.jpg"),
          })),
          ...rooms.map((room: any) => ({
            category: "Room",
            type: "Room",
            title: room.title,
            image: require("../../assets/placeholder.jpg"),
          })),
        ];

        setLoading(false);
        setAllItems(normalized);
      } catch (error) {
        console.error("❌ Error loading explore data:", error);
      }
    };

    fetchExploreData();
  }, []);

  const filteredList = allItems.filter((item) => {
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
          <Feather
            name="search"
            size={18}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            style={styles.searchInput}
            onChangeText={setSearch}
            value={search}
          />
        </View>

        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Carregando...
          </Text>
        ) : (
          <>
            <View style={styles.searchCategoriesContainer}>
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  style={
                    selectedCategory === cat
                      ? styles.selected
                      : styles.categoryButtonContainer
                  }
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={
                      selectedCategory === cat
                        ? styles.buttonTextSelected
                        : styles.buttonText
                    }
                  >
                    {cat === "All" ? "Todos" : cat}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={{ flex: 1, paddingBottom: 100 }}>
              {Array.isArray(filteredList) && filteredList.length === 0 && (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  Nenhum resultado encontrado.
                </Text>
              )}

              {filteredList.map((item, index) => (
                <View key={index} style={{ marginBottom: 24 }}>
                  {item.type === "User" && (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={item.image}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          marginVertical: 10,
                        }}
                      />
                      <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                    </View>
                  )}

                  {item.type === "Room" || item.type === "Group" ? (
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <View
                        style={{
                          height: 100,
                          width: item.type === "Room" ? "100%" : "60%",
                          backgroundColor: "rgba(0,0,0,0.5)",
                          position: "absolute",
                          zIndex: 100,
                        }}
                      />
                      <Image
                        source={item.image}
                        style={{
                          height: 100,
                          width: item.type === "Room" ? "100%" : "60%",
                        }}
                      />
                      <Text
                        style={{
                          position: "absolute",
                          color: "white",
                          fontWeight: "600",
                          zIndex: 300,
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  ) : null}

                  {item.type === "Blog" ||
                  item.type === "Thought" ||
                  item.type === "Image" ||
                  item.type === "Video" ||
                  item.type === "Poll" ? (
                    <>
                      {item.title && (
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          {item.title}
                        </Text>
                      )}
                      {item.image && (
                        <Image
                          source={item.image}
                          style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 12,
                            marginVertical: 10,
                          }}
                          resizeMode="cover"
                        />
                      )}
                      {item.videoUrl && (
                        <Text style={{ color: "#539DF3", marginTop: 8 }}>
                          🎥 Watch: {item.videoUrl}
                        </Text>
                      )}
                      {item.content && (
                        <Text style={{ color: "#444" }}>{item.content}</Text>
                      )}
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
          </>
        )}
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
    textAlign: "center",
  },
});
