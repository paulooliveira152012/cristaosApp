import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React from 'react';

const rooms = [
  { title: "Estudo de Romanos", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Outro Estudo", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Mais um Estudo", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Estudo de Romanos", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Outro Estudo", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Mais um Estudo", coverImage: require("../../assets/placeholder.jpg") }
];


const Rooms = () => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} // ✅ Show scrollbar for debugging
        contentContainerStyle={[styles.scrollContainer, { minWidth: rooms.length * 200 }]} // ✅ Forces scrolling

      >
        {rooms.map((room, index) => (
          <View key={index} style={styles.roomContainer}> 
            <Image source={room.coverImage} style={styles.roomImage} />
            <Text style={styles.roomTitle}>{room.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
        width: "100%", 
        height: 150,
        paddingVertical: 10,
    },
    scrollContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    roomContainer: {
      width: 200, // ✅ Ensures items overflow horizontally
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "black",
      marginRight: 10, 
    },
    roomImage: {
      width: "100%",
      height: "100%",
      position: "absolute",
      resizeMode: "cover",
      opacity: 0.7,
    },
    roomTitle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      zIndex: 2, 
    }
});

export default Rooms;
