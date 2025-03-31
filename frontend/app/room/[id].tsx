import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MicOff, Send, Image as ImageIcon, X } from "lucide-react-native";

export default function RoomScreen() {
  const { id } = useLocalSearchParams();
  const [room, setRoom] = useState<any>(null);
  const [showMembers, setShowMembers] = useState(true);

  const roomMock = {
    title: "Quem sofreu mais, Naruto ou Jó?",
    members: [
      {
        username: "Itachi",
        profileImage:
          "https://www.rover.com/blog/wp-content/uploads/2019/11/17944589803_b1cb7c120e_k-1024x683.jpg",
        isHost: true,
      },
      {
        username: "gabi",
        profileImage:
          "https://www.purina.co.uk/sites/default/files/styles/ttt_image_510/public/2021-01/Yorkie%20Poo1.jpg?itok=zEk0F9Ik",
        isHost: true,
      },
      {
        username: "sasa",
        profileImage:
          "https://www.alwayspets.com/wp-content/uploads/2024/11/03bf8b5c6f82410da51f1af9dd37964c.webp",
        isMuted: true,
      },
      {
        username: "Itachi",
        profileImage:
          "https://www.rover.com/blog/wp-content/uploads/2019/11/17944589803_b1cb7c120e_k-1024x683.jpg",
        isHost: true,
      },
      {
        username: "gabi",
        profileImage:
          "https://www.purina.co.uk/sites/default/files/styles/ttt_image_510/public/2021-01/Yorkie%20Poo1.jpg?itok=zEk0F9Ik",
        isHost: true,
      },
      {
        username: "sasa",
        profileImage:
          "https://www.alwayspets.com/wp-content/uploads/2024/11/03bf8b5c6f82410da51f1af9dd37964c.webp",
        isMuted: true,
      },
      {
        username: "Itachi",
        profileImage:
          "https://www.rover.com/blog/wp-content/uploads/2019/11/17944589803_b1cb7c120e_k-1024x683.jpg",
        isHost: true,
      },
      {
        username: "gabi",
        profileImage:
          "https://www.purina.co.uk/sites/default/files/styles/ttt_image_510/public/2021-01/Yorkie%20Poo1.jpg?itok=zEk0F9Ik",
        isHost: true,
      },
      {
        username: "sasa",
        profileImage:
          "https://www.alwayspets.com/wp-content/uploads/2024/11/03bf8b5c6f82410da51f1af9dd37964c.webp",
        isMuted: true,
      },
      {
        username: "Itachi",
        profileImage:
          "https://www.rover.com/blog/wp-content/uploads/2019/11/17944589803_b1cb7c120e_k-1024x683.jpg",
        isHost: true,
      },
      {
        username: "gabi",
        profileImage:
          "https://www.purina.co.uk/sites/default/files/styles/ttt_image_510/public/2021-01/Yorkie%20Poo1.jpg?itok=zEk0F9Ik",
        isHost: true,
      },
      {
        username: "sasa",
        profileImage:
          "https://www.alwayspets.com/wp-content/uploads/2024/11/03bf8b5c6f82410da51f1af9dd37964c.webp",
        isMuted: true,
      },
      {
        username: "Itachi",
        profileImage:
          "https://www.rover.com/blog/wp-content/uploads/2019/11/17944589803_b1cb7c120e_k-1024x683.jpg",
        isHost: true,
      },
      {
        username: "gabi",
        profileImage:
          "https://www.purina.co.uk/sites/default/files/styles/ttt_image_510/public/2021-01/Yorkie%20Poo1.jpg?itok=zEk0F9Ik",
        isHost: true,
      },
      {
        username: "sasa",
        profileImage:
          "https://www.alwayspets.com/wp-content/uploads/2024/11/03bf8b5c6f82410da51f1af9dd37964c.webp",
        isMuted: true,
      },
      {
        username: "Itachi",
        profileImage:
          "https://www.rover.com/blog/wp-content/uploads/2019/11/17944589803_b1cb7c120e_k-1024x683.jpg",
        isHost: true,
      },
      {
        username: "gabi",
        profileImage:
          "https://www.purina.co.uk/sites/default/files/styles/ttt_image_510/public/2021-01/Yorkie%20Poo1.jpg?itok=zEk0F9Ik",
        isHost: true,
      },
      {
        username: "sasa",
        profileImage:
          "https://www.alwayspets.com/wp-content/uploads/2024/11/03bf8b5c6f82410da51f1af9dd37964c.webp",
        isMuted: true,
      },
      {
        username: "Itachi",
        profileImage:
          "https://www.rover.com/blog/wp-content/uploads/2019/11/17944589803_b1cb7c120e_k-1024x683.jpg",
        isHost: true,
      },
      {
        username: "gabi",
        profileImage:
          "https://www.purina.co.uk/sites/default/files/styles/ttt_image_510/public/2021-01/Yorkie%20Poo1.jpg?itok=zEk0F9Ik",
        isHost: true,
      },
      {
        username: "sasa",
        profileImage:
          "https://www.alwayspets.com/wp-content/uploads/2024/11/03bf8b5c6f82410da51f1af9dd37964c.webp",
        isMuted: true,
      },
      {
        username: "Itachi",
        profileImage:
          "https://www.rover.com/blog/wp-content/uploads/2019/11/17944589803_b1cb7c120e_k-1024x683.jpg",
        isHost: true,
      },
      {
        username: "gabi",
        profileImage:
          "https://www.purina.co.uk/sites/default/files/styles/ttt_image_510/public/2021-01/Yorkie%20Poo1.jpg?itok=zEk0F9Ik",
        isHost: true,
      },
      {
        username: "sasa",
        profileImage:
          "https://www.alwayspets.com/wp-content/uploads/2024/11/03bf8b5c6f82410da51f1af9dd37964c.webp",
        isMuted: true,
      },
      {
        username: "Itachi",
        profileImage:
          "https://www.rover.com/blog/wp-content/uploads/2019/11/17944589803_b1cb7c120e_k-1024x683.jpg",
        isHost: true,
      },
      {
        username: "gabi",
        profileImage:
          "https://www.purina.co.uk/sites/default/files/styles/ttt_image_510/public/2021-01/Yorkie%20Poo1.jpg?itok=zEk0F9Ik",
        isHost: true,
      },
      {
        username: "sasa",
        profileImage:
          "https://www.alwayspets.com/wp-content/uploads/2024/11/03bf8b5c6f82410da51f1af9dd37964c.webp",
        isMuted: true,
      },
    ],
    chat: [
      {
        username: "gabi",
        profileImage:
          "https://wallpapers.com/images/hd/funny-sloth-pictures-92oyrxqcr7o3e433.jpg",
        message: "não estou conseguindo falar, mas estou ouvindo",
        time: "13:30",
      },
      {
        username: "itachi",
        profileImage:
          "https://i.pinimg.com/474x/49/12/7c/49127c33554385ad48d996a4b067d08f.jpg",
        message: "sara toque nabaut",
        time: "13:32",
      },
      {
        username: "gabi",
        profileImage:
          "https://wallpapers.com/images/hd/funny-sloth-pictures-92oyrxqcr7o3e433.jpg",
        message: "não estou conseguindo falar, mas estou ouvindo",
        time: "13:30",
      },
      {
        username: "itachi",
        profileImage:
          "https://i.pinimg.com/474x/49/12/7c/49127c33554385ad48d996a4b067d08f.jpg",
        message: "sara toque nabaut",
        time: "13:32",
      },
      {
        username: "gabi",
        profileImage:
          "https://wallpapers.com/images/hd/funny-sloth-pictures-92oyrxqcr7o3e433.jpg",
        message: "não estou conseguindo falar, mas estou ouvindo",
        time: "13:30",
      },
      {
        username: "itachi",
        profileImage:
          "https://i.pinimg.com/474x/49/12/7c/49127c33554385ad48d996a4b067d08f.jpg",
        message: "sara toque nabaut",
        time: "13:32",
      },
      {
        username: "gabi",
        profileImage:
          "https://wallpapers.com/images/hd/funny-sloth-pictures-92oyrxqcr7o3e433.jpg",
        message: "não estou conseguindo falar, mas estou ouvindo",
        time: "13:30",
      },
      {
        username: "itachi",
        profileImage:
          "https://i.pinimg.com/474x/49/12/7c/49127c33554385ad48d996a4b067d08f.jpg",
        message: "sara toque nabaut",
        time: "13:32",
      },
      {
        username: "gabi",
        profileImage:
          "https://wallpapers.com/images/hd/funny-sloth-pictures-92oyrxqcr7o3e433.jpg",
        message: "não estou conseguindo falar, mas estou ouvindo",
        time: "13:30",
      },
      {
        username: "itachi",
        profileImage:
          "https://i.pinimg.com/474x/49/12/7c/49127c33554385ad48d996a4b067d08f.jpg",
        message: "sara toque nabaut",
        time: "13:32",
      },
    ],
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/rooms/${id}`);
        const data = await res.json();
        setRoom(data);
      } catch (error) {
        console.error("❌ Erro ao buscar sala:", error);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  if (!room) {
    return <Text>Carregando sala...</Text>;
  }

  interface Member {
    username: string;
    profileImage: string;
    isHost?: boolean;
    isMuted?: boolean;
  }

  interface ChatMessage {
    username: string;
    profileImage: string;
    message: string;
    time: string;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{roomMock.title}</Text>
        <Pressable onPress={() => setShowMembers(!showMembers)}>
          {showMembers ? (
            <MaterialIcons name="arrow-upward" size={28} color={"#539DF3"} />
          ) : (
            <MaterialIcons name="arrow-downward" size={28} color={"#539DF3"} />
          )}
        </Pressable>
      </View>

      {/* Members */}
      {showMembers && (
        <View style={{ maxHeight: 250 }}>
          <ScrollView contentContainerStyle={styles.members}>
            {roomMock.members?.map((member: Member, i: number) => (
              <View key={i} style={styles.avatarContainer}>
                <Image
                  source={{ uri: member.profileImage }}
                  style={styles.avatar}
                />
                <Text style={styles.username}>{member.username}</Text>

                {member.isMuted && (
                  <MicOff color="crimson" size={12} style={styles.mutedIcon} />
                )}

                {member.isHost && <Text style={styles.hostLabel}>Host</Text>}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Voice Button */}
      <Pressable style={styles.voiceButton}>
        <Text style={{ color: "#539DF3", fontWeight: "bold" }}>
          Entrar no Chat de voz
        </Text>
      </Pressable>

      {/* Chat */}
      <ScrollView style={styles.chatBox}>
        {roomMock.chat?.map((msg: ChatMessage, i: number) => (
          <View key={i} style={styles.chatMsg}>
            <Image
              source={{ uri: msg.profileImage }}
              style={styles.chatAvatar}
            />
            <View>
              <Text style={styles.chatUsername}>{msg.username}:</Text>
              <Text>{msg.message}</Text>
              <Text style={styles.chatTime}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputBox}>
        <TextInput placeholder="Escreva uma mensagem" style={styles.input} />
        <Pressable>
          <ImageIcon color="black" />
        </Pressable>
        <Pressable>
          <Send color="black" />
        </Pressable>
        <Pressable style={styles.micButton}>
          <MicOff color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },

  buttonContainer: {
    backgroundColor: "red",
    position: "absolute",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  members: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingVertical: 10,
  },

  avatarContainer: {
    alignItems: "center",
    width: 60,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  username: {
    fontSize: 12,
    textAlign: "center",
  },
  hostLabel: {
    color: "#539DF3",
    fontSize: 10,
    textAlign: "center",
  },
  mutedIcon: {
    position: "absolute",
    bottom: 10,
    right: 5,
  },
  voiceButton: {
    borderColor: "#539DF3",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    padding: 8,
    marginBottom: 10,
  },
  chatBox: {
    flex: 1,
    marginVertical: 10,
  },
  chatMsg: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 10,
  },
  chatAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  chatUsername: {
    fontWeight: "bold",
  },
  chatTime: {
    fontSize: 10,
    color: "#888",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 20,
  },
  input: {
    flex: 1,
  },
  micButton: {
    backgroundColor: "#C00",
    padding: 8,
    borderRadius: 50,
  },
});
