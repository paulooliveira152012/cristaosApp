import {
  // SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons"; // para o ícone de lupa
import { SafeAreaView } from "react-native-safe-area-context";

// ✅ Define TypeScript interface for listings
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

// ✅ Define listing data
const ListingsList: ListingItemType[] = [
  // USER 3
  {
    category: "User",
    type: "User",
    name: "Paulo",
    image: require("../../assets/profile.jpg"),
  },

  {
    category: "User",
    type: "User",
    name: "Gabi",
    image: require("../../assets/Gabi.jpg"),
  },

  {
    category: "User",
    type: "User",
    name: "Lulu Xibiu",
    image: require("../../assets/Lulu.jpg"),
  },

  // Salas 3
  {
    category: "Room",
    title: "Estudo de Romanos",
    image: require("../../assets/placeholder.jpg"),
    type: "Room",
  },
  {
    category: "Room",
    title: "Outro Estudo Muito Muito Longo Que Precisa Rolar Automaticamente",
    image: require("../../assets/placeholder.jpg"),
    type: "Room",
  },
  {
    category: "Room",
    title: "Mais um Estudo",
    image: require("../../assets/placeholder.jpg"),
    type: "Room",
  },

  // Group 3
  {
    category: "Group",
    title: "Grupo de Meninas Cristas",
    image: require("../../assets/placeholder.jpg"),
    type: "Group",
  },

  {
    category: "Group",
    title: "Grupo de Meninos Cristaos",
    image: require("../../assets/placeholder.jpg"),
    type: "Group",
  },

  {
    category: "Group",
    title: "Grupo de Menines Cristes",
    image: require("../../assets/placeholder.jpg"),
    type: "Group",
  },

  // Post 5
  {
    category: "Post",
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
    category: "Post",
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

const ExploreScreen = () => {
  // useState for writting in the search
  const [search, setSearched] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    console.log(search);
    console.log(selectedCategory)
  });

  // funcao para buscar items que contenham o valor da busca,

  // Função de busca
  const searchListings = (query: string) => {
    const lower = query.toLowerCase();
    return ListingsList.filter((item) => {
      return (
        item.title?.toLowerCase().includes(lower) ||
        item.content?.toLowerCase().includes(lower) ||
        item.name?.toLowerCase().includes(lower) ||
        item.username?.toLowerCase().includes(lower)
      );
    });
  };

  const categoryMap: { [key: string]: ListingItemType["category"] } = {
    Users: "User",
    Posts: "Post",
    Groups: "Group",
    Rooms: "Room",
  };

  let filteredList = ListingsList;

  // Aplica filtro de categoria primeiro (se houver)
  if (selectedCategory && selectedCategory !== "All") {
    filteredList = filteredList.filter(
      (item) => item.category === categoryMap[selectedCategory]
    );
  }
  


// Aplica filtro de busca depois (se houver)
if (search.trim() !== "") {
  const lower = search.toLowerCase();
  filteredList = filteredList.filter((item) => {
    return (
      item.title?.toLowerCase().includes(lower) ||
      item.content?.toLowerCase().includes(lower) ||
      item.name?.toLowerCase().includes(lower) ||
      item.username?.toLowerCase().includes(lower)
    );
  });
}
  

  // Se tiver algo no search, aplica filtro, senão mostra tudo
  const itemsToDisplay = filteredList;




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

        <View style={styles.searchCategoriesContainer}>
        <Pressable 
            style={ selectedCategory === "All" ? styles.selected : styles.categoryButtonContainer}
            onPress={() => setSelectedCategory("All")}
          >
            <Text style={selectedCategory === "All" ? styles.buttonTextSelected : styles.buttonText }>All</Text>
          </Pressable>

          <Pressable 
            style={ selectedCategory === "Users" ? styles.selected : styles.categoryButtonContainer}
            onPress={() => setSelectedCategory("Users")}
          >
            <Text style={selectedCategory === "Users" ? styles.buttonTextSelected : styles.buttonText }>Pessoas</Text>
          </Pressable>

          <Pressable 
            style={ selectedCategory === "Rooms" ? styles.selected : styles.categoryButtonContainer}
            onPress={() => setSelectedCategory("Rooms")}
          >
            <Text style={ selectedCategory === "Rooms" ?  styles.buttonTextSelected : styles.buttonText}>Salas</Text>
          </Pressable>

          <Pressable 
            style={ selectedCategory === "Groups" ? styles.selected : styles.categoryButtonContainer}
            onPress={() => setSelectedCategory("Groups")}
          >
            <Text style={ selectedCategory === "Groups" ? styles.buttonTextSelected : styles.buttonText}>Grupos</Text>
          </Pressable>
          <Pressable 
            style={ selectedCategory === "Posts" ? styles.selected : styles.categoryButtonContainer}
            onPress={() => setSelectedCategory("Posts")}
          >
            <Text style={ selectedCategory === "Posts" ? styles.buttonTextSelected : styles.buttonText}>Posts</Text>
          </Pressable>
        </View>

        {/* items */}
        <View>
          {itemsToDisplay.map((item, index) => (
            <View key={index} style={{ marginBottom: 24 }}>
              {item.type === "String" && (
                <Text style={{ fontSize: 16 }}>{item.content}</Text>
              )}

              {/* se for USER */}
              {item.type === "User" && (
                <>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        marginVertical: 10,
                      }}
                      resizeMode="cover"
                    />
                    <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                  </View>
                </>
              )}

              {/* SE FOR SALAS */}
              {item.type === "Room" && (
                <>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 100,
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.453)",
                        position: "absolute",
                        zIndex: 100,
                      }}
                    />

                    <Image
                      source={item.image}
                      style={{
                        height: 100,
                        width: "100%",
                      }}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        textAlign: "center",
                        color: "white",
                        fontWeight: "600",
                        zIndex: 300,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </>
              )}

              {/* se for Grupos */}
              {item.type === "Group" && (
                   <>
                   <View
                     style={{
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                     }}
                   >
                     <View
                       style={{
                         height: 100,
                         width: "60%",
                         backgroundColor: "rgba(0, 0, 0, 0.453)",
                         position: "absolute",
                         zIndex: 100,
                       }}
                     />
 
                     <Image
                       source={item.image}
                       style={{
                         height: 100,
                         width: "60%",
                       }}
                     />
                     <Text
                       style={{
                         position: "absolute",
                         textAlign: "center",
                         color: "white",
                         fontWeight: "600",
                         zIndex: 300,
                       }}
                     >
                       {item.title}
                     </Text>
                   </View>
                 </>
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
