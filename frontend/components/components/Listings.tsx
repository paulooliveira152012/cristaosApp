import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import React, {useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import InteractionBox from "./InteractionBox";
import ListingHeader from "./ListingHeader";

import { getListings } from "./functions/functions";
import { useSafeAreaFrame } from "react-native-safe-area-context";

/* 
    Type of listings:
    - Blog
    - Image
    - Video
    - Poll
*/

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

// ✅ Define navigation type
type RootStackParamList = {
  Listings: undefined;
  ListingDetails: { item: ListingItemType };
};

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



// ✅ Define ListingItem component
const ListingItem: React.FC<{ item: ListingItemType }> = ({ item }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [listings, setListings] = useState([])

  useEffect(() => {
    getListings(setListings)
    console.log("Listings ready to display:", listings)
  }, [])

  return (
    <Pressable
      onPress={() => navigation.navigate("ListingDetails", { item })}
      style={styles.listingContainer}
    >
      {/* {item.title && <Text style={styles.title}>{item.title}</Text>} */}

      {item.type === "String" && (
        <>
          {/* listing header */}
         <ListingHeader 
           name={item.name}
           username={item.username}
           createdAt={item.createdAt}
         />
          {/* listing content */}
          <Text style={styles.content}>{item.content}</Text>
        </>
      )}

      {item.type === "Blog" && item.image && (
        <>
          {/* listing header */}
       {/* listing header */}
       <ListingHeader 
           name={item.name}
           username={item.username}
           createdAt={item.createdAt}
         />
          <Image source={item.image} style={styles.image} />
          <Text style={styles.content}>{item.content}</Text>
        </>
      )}

      {item.type === "Image" && item.image && (
        <>
          {/* listing header */}
       {/* listing header */}
       <ListingHeader 
           name={item.name}
           username={item.username}
           createdAt={item.createdAt}
         />
          <Image source={item.image} style={styles.image} />
          <Text style={styles.content}>{item.content}</Text>
        </>
      )}

      {item.type === "Video" && item.videoUrl && (
        <>
       {/* listing header */}
       <ListingHeader 
           name={item.name}
           username={item.username}
           createdAt={item.createdAt}
         />
          <Text style={styles.content}>🎥 Video: {item.videoUrl}</Text>
        </>
      )}

      {item.type === "Poll" && item.options && (
        <View>
          {/* listing header */}
        {/* listing header */}
        <ListingHeader 
           name={item.name}
           username={item.username}
           createdAt={item.createdAt}
         />
          {item.options.map((option: string, index: number) => (
            <Text key={index} style={styles.pollOption}>
              🔹 {option}
            </Text>
          ))}
        </View>
      )}
      <InteractionBox
        liked={!!item.likes && item.likes > 0}
        commented={!!item.comments && item.comments.length > 0}
        saved={true}
        likesCount={item.likes || 0}
        commentsCount={item.comments?.length || 0}
      />
    </Pressable>
  );
};

// ✅ Main Listings Component
const Listings: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={ListingsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ListingItem item={item} />}
      />
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#f5f5f5",
    backgroundColor: "white",
  },

  listingContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  listingHeader: {
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },

  listedByName: {
    fontWeight: "500",
  },

  listedByLinkDate: {
    color: "#687684",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  pollOption: {
    fontSize: 16,
    marginVertical: 2,
    color: "#007bff",
  },
});

export default Listings;
