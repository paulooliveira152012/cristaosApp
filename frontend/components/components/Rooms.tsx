import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import TextTicker from "react-native-text-ticker";

const rooms = [
  {
    title: "Estudo de Romanos",
    coverImage: require("../../assets/placeholder.jpg"),
  },
  {
    title: "Outro Estudo Muito Muito Longo Que Precisa Rolar Automaticamente",
    coverImage: require("../../assets/placeholder.jpg"),
  },
  {
    title: "Mais um Estudo",
    coverImage: require("../../assets/placeholder.jpg"),
  },
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
  { username: "Paulo", profileImage: require("../../assets/profile.jpg") },
  { username: "Lulu", profileImage: require("../../assets/profile2.jpg") },
];

const Rooms = () => {
  const [roomMembersCount, setRoomMembersCount] = useState("");
  const [showRooms, setShowRooms] = useState(true);
  const router = useRouter()

  useEffect(() => {
    setRoomMembersCount(
      roomMembers.length > 13 ? "+13" : roomMembers.length.toString()
    );
  }, []);

  const toggleShowRooms = () => {
    setShowRooms((prev) => !prev);
  };

  const scrollAnimRefs = useRef<Animated.Value[]>([]);
  const textWidths = useRef<number[]>([]);
  const containerWidths = useRef<number[]>([]);

  const animateScroll = (index: number) => {
    const scrollX = scrollAnimRefs.current[index] || new Animated.Value(0);
    scrollAnimRefs.current[index] = scrollX;

    const textW = textWidths.current[index];
    const containerW = containerWidths.current[index];

    if (textW && containerW && textW > containerW) {
      const distance = textW - containerW;

      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollX, {
            toValue: -distance,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.delay(1000),
          Animated.timing(scrollX, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.delay(1000),
        ])
      ).start();
    }
  };

  return (
    <>
      {/* ✅ Only Show This When Rooms Are Hidden */}
      {!showRooms && (
        <Pressable style={styles.toggleButtonHidden} onPress={toggleShowRooms}>
          <MaterialIcons name="arrow-downward" size={23} color={"#539DF3"} />
        </Pressable>
      )}

      {/* ✅ Hide Entirely When showRooms is false */}
      {showRooms && (
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContainer,
              { minWidth: rooms.length * 200 },
            ]}
          >
            {rooms.map((room, index) => (
              <View key={index} style={styles.roomContainer}>
                <Image source={room.coverImage} style={styles.roomImage} />
                <View style={styles.usersPreview}>
                  <View style={styles.roomMembersContainer}>
                    <Image
                      source={roomMembers[0].profileImage}
                      style={styles.userImageOverlapping}
                    />
                    <Image
                      source={roomMembers[1].profileImage}
                      style={styles.userImage}
                    />
                    <Text style={styles.roomCount}>{roomMembersCount}</Text>
                  </View>
                </View>
                <Text 
                  style={styles.roomTitle}
                  numberOfLines={1}
                >
                  {room.title}
                </Text>

                {/* <View style={{ width: 120, overflow: "hidden" }}>
                  <TextTicker
                    style={styles.roomTitle}
                    duration={5000}
                    loop
                    bounce={false}
                    repeatSpacer={50}
                    marqueeDelay={1000}
                  >
                    {room.title}
                  </TextTicker>
                </View> */}

              </View>
            ))}
          </ScrollView>

          

          {/* ✅ Button Inside Container When Rooms Are Shown */}
          <View style={styles.toggleButtonContainer}>
            <Pressable onPress={toggleShowRooms}>
              <MaterialIcons name="arrow-upward" size={28} color={"#539DF3"} />
            </Pressable>

            <Pressable onPress={() => router.push("/RoomsScreen")}>
              <Text>Ver todas</Text>
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
    backgroundColor: "white",
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  roomContainer: {
    width: 150,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 35.32,
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
    marginBottom: 30,
    padding: 2
  },
  usersPreview: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    // marginTop: 5,
    // backgroundColor: "green"
  },
  roomMembersContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    top: 0
  },

  userImage: {
    width: 30,
    aspectRatio: 1.1,
    borderRadius: 20,
    marginRight: -5
  },
  userImageOverlapping: {
    width: 30,
    aspectRatio: 1.1,
    borderRadius: 10,
    left: 10,
    zIndex: 2,
  },
  roomCount: {
    color: "white",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 600
  },
  
  toggleButtonContainer: {
    alignItems: "center",
    marginTop: 10,
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10
  },

  toggleButtonHidden: {
    position: "absolute",
    top: 0, // Overlapping at the top

    right: 20,
    // transform: [{ translateX: -14 }],
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
    elevation: 3, // Shadow for better visibility
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 200,
  },
});

export default Rooms;
