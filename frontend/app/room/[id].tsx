import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";

export default function RoomScreen() {
  const { id } = useLocalSearchParams();
  const [room, setRoom] = useState<any>(null);

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

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{room.title}</Text>
      <Text style={{ color: "#888" }}>{room.createdAt}</Text>
    </View>
  );
}
