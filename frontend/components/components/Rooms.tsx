import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const rooms = [
  { title: "Estudo de Romanos", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Outro Estudo Muito Muito Longo Que Precisa Rolar Automaticamente", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Mais um Estudo", coverImage: require("../../assets/placeholder.jpg") }
];

const roomMembers = [
  { username: "Paulo", profileImage: require("../../assets/profile.jpg") },
  { username: "Lulu", profileImage: require("../../assets/profile2.jpg") }
];

const Rooms = () => {
  const [roomMembersCount, setRoomMembersCount] = useState("");
  const [showRooms, setShowRooms] = useState(true);

  useEffect(() => {
    setRoomMembersCount(roomMembers.length > 13 ? "+13" : roomMembers.length.toString());
  }, []);

  const toggleShowRooms = () => {
    setShowRooms((prev) => !prev);
  };

  return (
    <>
      {/* ✅ Only Show This When Rooms Are Hidden */}
      {!showRooms && (
        <Pressable style={styles.toggleButtonHidden} onPress={toggleShowRooms}>
          <MaterialIcons name="arrow-downward" size={28} color={"blue"} />
        </Pressable>
      )}

      {/* ✅ Hide Entirely When showRooms is false */}
      {showRooms && (
        <View style={styles.container}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={[styles.scrollContainer, { minWidth: rooms.length * 200 }]}
          >
            {rooms.map((room, index) => (
              <View key={index} style={styles.roomContainer}> 
                <Image source={room.coverImage} style={styles.roomImage} />
                <View style={styles.usersPreview}>
                  <View style={styles.roomMembersContainer}>
                    <Image source={roomMembers[0].profileImage} style={styles.userImageOverlapping} />
                    <Image source={roomMembers[1].profileImage} style={styles.userImage} />
                    <Text style={styles.roomCount}>{roomMembersCount}</Text>
                  </View>
                </View>
                <Text style={styles.roomTitle}>{room.title}</Text>
              </View>
            ))}
          </ScrollView>

          {/* ✅ Button Inside Container When Rooms Are Shown */}
          <View style={styles.toggleButtonContainer}>
            <Pressable onPress={toggleShowRooms}>
              <MaterialIcons name="arrow-upward" size={28} color={"blue"} />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%", 
    maxHeight: 170,
    paddingVertical: 10,
    backgroundColor: "white"
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  roomContainer: {
    width: 150,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
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
  },
  usersPreview: {
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 5,
  },
  userImage: {
    width: 30,
    aspectRatio: 1.1,
    borderRadius: 20,
  },
  userImageOverlapping: {
    width: 30,
    aspectRatio: 1.1,
    borderRadius: 10,
    left: 10,
    zIndex: 2
  },
  roomCount: {
    color: "white",
    fontSize: 14,
    marginLeft: 10
  },
  roomMembersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  toggleButtonHidden: {
    position: "absolute",
    top: 100, // Overlapping at the top

    left: "90%",
    transform: [{ translateX: -14 }],
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
    elevation: 3, // Shadow for better visibility
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 200
  }
});

export default Rooms;
