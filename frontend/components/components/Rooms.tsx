import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import { MaterialIcons } from '@expo/vector-icons';


const rooms = [
  { title: "Estudo de Romanos", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Outro Estudo", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Mais um Estudo", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Estudo de Romanos", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Outro Estudo", coverImage: require("../../assets/placeholder.jpg") },
  { title: "Mais um Estudo", coverImage: require("../../assets/placeholder.jpg") }
];

const roomMembers = [
  { username: "Paulo", profileImage: require("../../assets/profile.jpg") },
  { username: "Lulu", profileImage: require("../../assets/profile2.jpg") },
  { username: "Paulo", profileImage: require("../../assets/profile.jpg") },
  { username: "Lulu", profileImage: require("../../assets/profile2.jpg") },
  { username: "Paulo", profileImage: require("../../assets/profile.jpg") },
  { username: "Lulu", profileImage: require("../../assets/profile2.jpg") },
  { username: "Paulo", profileImage: require("../../assets/profile.jpg") },
  { username: "Lulu", profileImage: require("../../assets/profile2.jpg") },
  { username: "Paulo", profileImage: require("../../assets/profile.jpg") },
  { username: "Lulu", profileImage: require("../../assets/profile2.jpg") },
  { username: "Paulo", profileImage: require("../../assets/profile.jpg") },
  { username: "Lulu", profileImage: require("../../assets/profile2.jpg") },
];



const Rooms = () => {

  const [roomMembersCount, setRoomMembersCount] = useState("")
  const [showRooms, setShowRooms] = useState(true)
  

  const checkMembersCount = () => {
    console.log("Room members count is:", roomMembers.length)
    if(roomMembers.length > 13) {
      setRoomMembersCount("+13")
    }
  }

  useEffect(() => {
    checkMembersCount()
  })

  const toggleShowRooms = () => {
    setShowRooms((prev) => (!prev))
  }

  return (
    <View style={styles.container}>
      <Text>Salas de conversa</Text>
      {showRooms && (

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={[styles.scrollContainer, { minWidth: rooms.length * 200 }]}
      >
        {rooms.map((room, index) => (
          <View key={index} style={styles.roomContainer}> 
            <Image source={room.coverImage} style={styles.roomImage} />
            <View style={styles.usersPreview}>
              {roomMembers.length > 0 && (
                <View style={styles.roomMembersContainer}>
                <Image source={roomMembers[0].profileImage} style={styles.userImageOverlaping} />
                <Image source={roomMembers[1].profileImage} style={styles.userImage} />
                <Text style={styles.roomCount}>{ roomMembersCount || roomMembers.length}</Text>
                </View>
              )}
            </View>
              <Text style={styles.roomTitle}>{room.title}</Text>
          </View>
        ))}
      </ScrollView>
      )}
      <View style={styles.toggleButtonContainer}>
        <Pressable onPress={toggleShowRooms}>
          <MaterialIcons name= {showRooms ? "arrow-upward" : "arrow-downward" } size={28} color={"blue"} />
        </Pressable>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
        // backgroundColor: "green",
        width: "100%", 
        // height: 150,
        maxHeight: 170,
        paddingVertical: 10,
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
      // backgroundColor: "red",
      width: "60%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      marginTop: 5,
    },
    userImage: {
      width: 30,
      // height: 50,
      aspectRatio: 1.1,
      borderRadius: 20,
    },

    userImageOverlaping: {
      width: 30,
      // height: 50,
      aspectRatio: 1.1,
      borderRadius: 10,
      // position: "absolute",
      left: 10,
      zIndex: 2
    },

    roomCount: {
      color: "white",
      margin: "auto",
      marginLeft: 10

    },

    roomMembersContainer: {
      display: "flex",
      flexDirection: "row",
    },

    toggleButtonContainer: {
      alignItems: "center",
      marginTop: 10,
    }
});

export default Rooms;
