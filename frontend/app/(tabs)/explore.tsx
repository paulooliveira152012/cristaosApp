import {
  // SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import React, {useEffect, useState} from "react";
import { Feather } from "@expo/vector-icons"; // para o ícone de lupa
import { SafeAreaView } from "react-native-safe-area-context";

// ✅ Define TypeScript interface for listings
interface ListingItemType {
  type: "Blog" | "Image" | "Video" | "Poll" | "String";
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

// ✅ Define listing data
const ListingsList: ListingItemType[] = [
  {
    type: "String",
    content: "Bom dia!!!!",
    name: "gabi",
    username: "gabi",
    createdAt: "1/21/20",
    likes: 2,
    comments: [
      {
        user: "paulinho",
        comment: "bom dia!",
        commentLikes: 3,
        likedBy: {
          username: "pedro",
        },
      },
    ],
  },

  {
    type: "Blog",
    title: "My Photo",
    image: require("../../assets/profile.jpg"),
    content:
      "My name is Paulo Oliveira. I am a programmer and entrepreneur based in Linden, NJ. I run Nova, a digital agency creating high-quality websites. I also work on a delivery app, explore APIs, and trade. My girlfriend, Gabriella, is a designer, and we are in the K1 visa process. We share a love for tech, business, and our dog Lua.",
    name: "gabi",
    username: "gabi",
    createdAt: "1/21/20",
    likes: 2,
    comments: [
      {
        user: "paulinho",
        comment: "bom dia!",
        commentLikes: 3,
        likedBy: {
          username: "pedro",
        },
      },
    ],
  },
  {
    type: "Image",
    title: "Beautiful Sunset",
    image: require("../../assets/sunset.jpg"),
    content: "Captured this amazing sunset in São Paulo! 🌅",
  },
  {
    type: "Video",
    title: "React Native Tips",
    videoUrl: "https://www.example.com/video.mp4",
    content: "Check out my latest tips on React Native development! 🚀",
  },
  {
    type: "Poll",
    title: "What's your favorite programming language?",
    options: ["JavaScript", "Python", "C++", "Go"],
  },
];

const ExploreScreen = () => {
  // useState for writting in the search
  const [search, setSearched] = useState("")

  useEffect(() => {
    console.log(search)
  })

  // funcao para buscar items que contenham o valor da busca, 

    // Função de busca
    const searchListings = (query: string) => {
      const lower = query.toLowerCase();
      return ListingsList.filter(item => {
        return (
          item.title?.toLowerCase().includes(lower) ||
          item.content?.toLowerCase().includes(lower) ||
          item.name?.toLowerCase().includes(lower) ||
          item.username?.toLowerCase().includes(lower)
        );
      });
    };

    // Se tiver algo no search, aplica filtro, senão mostra tudo
  const itemsToDisplay = search ? searchListings(search) : ListingsList;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {/* Search Bar */}
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
          onChangeText={setSearched}
        />
      </View>

      {/* items */}
      <View>
        {itemsToDisplay.map((item, index) => (
          <View key={index} style={{ marginBottom: 24 }}>
            {item.type === "String" && (
              <Text style={{ fontSize: 16 }}>{item.content}</Text>
            )}

            {item.type === "Blog" && (
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
                {item.content && (
                  <Text style={{ color: "#444" }}>{item.content}</Text>
                )}
              </>
            )}

            {item.type === "Image" && (
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
                {item.content && (
                  <Text style={{ color: "#444" }}>{item.content}</Text>
                )}
              </>
            )}

            {item.type === "Video" && (
              <>
                {item.title && (
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item.title}
                  </Text>
                )}
                <Text style={{ color: "#539DF3", marginTop: 8 }}>
                  🎥 Watch: {item.videoUrl}
                </Text>
                {item.content && (
                  <Text style={{ color: "#444", marginTop: 6 }}>
                    {item.content}
                  </Text>
                )}
              </>
            )}

            {item.type === "Poll" && (
              <>
                {item.title && (
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item.title}
                  </Text>
                )}
                {item.options?.map((option, idx) => (
                  <Text key={idx} style={{ fontSize: 16, marginTop: 6 }}>
                    🔘 {option}
                  </Text>
                ))}
              </>
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
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  // buttonList: {
  //   gap: 15,
  // },
  // optionButton: {
  //   borderWidth: 1,
  //   borderColor: "#539DF3",
  //   borderRadius: 16,
  //   paddingVertical: 16,
  //   alignItems: "center",
  // },
  // optionText: {
  //   color: "#539DF3",
  //   fontSize: 18,
  //   fontWeight: "600",
  // },
});
