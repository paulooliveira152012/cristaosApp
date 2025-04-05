import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import InteractionBox from "../components/components/InteractionBox";

/* 
    Listing Details Page
*/

// ✅ Define TypeScript interface for listings
interface ListingItemType {
  _id: string;
  type: "Blog" | "Image" | "Video" | "Poll" | "String";
  title: string;
  image?: any;
  content?: string;
  videoUrl?: string;
  options?: string[];
  liked?: boolean;
  commented?: boolean;
  saved?: boolean;
}

// ✅ Define navigation type
type RootStackParamList = {
  Listings: undefined;
  ListingDetails: { item: ListingItemType };
};

const ListingDetails: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ListingDetails">>();
  const { item } = route.params;

  // 🔐 Simular usuário
  const userId = "user123"; // Substitua com ID real depois
  const fakeSetListings = () => {}; // placeholder pra tipagem

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>

      {item.type === "String" && (
        <>
          <Text style={styles.content}>{item.content}</Text>
          <InteractionBox
            liked={item.liked ?? false}
            commented={item.commented ?? false}
            saved={item.saved ?? false}
            listingId={item._id}
            userId={userId}
            setListings={fakeSetListings}
          />
        </>
      )}

      {item.type === "Blog" && item.image && (
        <>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.content}>{item.content}</Text>
          <InteractionBox
            liked={item.liked ?? false}
            commented={item.commented ?? false}
            saved={item.saved ?? false}
            listingId={item._id}
            userId={userId}
            setListings={fakeSetListings}
          />
        </>
      )}

      {item.type === "Image" && item.image && (
        <>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.content}>{item.content}</Text>
          <InteractionBox
            liked={item.liked ?? false}
            commented={item.commented ?? false}
            saved={item.saved ?? false}
            listingId={item._id}
            userId={userId}
            setListings={fakeSetListings}
          />
        </>
      )}

      {item.type === "Video" && item.videoUrl && (
        <>
          <Text style={styles.content}>🎥 Video: {item.videoUrl}</Text>
          <InteractionBox
            liked={item.liked ?? false}
            commented={item.commented ?? false}
            saved={item.saved ?? false}
            listingId={item._id}
            userId={userId}
            setListings={fakeSetListings}
          />
        </>
      )}

      {item.type === "Poll" && item.options && (
        <View>
          {item.options.map((option, index) => (
            <Text key={index} style={styles.pollOption}>
              🔹 {option}
            </Text>
          ))}
          <InteractionBox
            liked={item.liked ?? false}
            commented={item.commented ?? false}
            saved={item.saved ?? false}
            listingId={item._id}
            userId={userId}
            setListings={fakeSetListings}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
  pollOption: {
    fontSize: 18,
    marginVertical: 5,
    color: "#007bff",
  },
});

export default ListingDetails;
