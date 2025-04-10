import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getBaseApi } from "utils/getBaseApi";

const ProfileScreen = () => {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const api = getBaseApi()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${api}/api/users/getUser/${id}`
        );
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("❌ Erro ao carregar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (!user) {
    return <Text style={{ textAlign: "center", marginTop: 40 }}>Usuário não encontrado.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={{ uri: user.profileImage }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
          {user.name}
        </Text>
        <Text style={{ color: "#888" }}>@{user.username}</Text>
      </View>

      <Text style={{ fontSize: 16, textAlign: "center" }}>
        {user.bio || "Este usuário ainda não escreveu uma bio."}
      </Text>

      {/* outros campos como email, telefone, redes sociais etc */}
    </ScrollView>
  );
};

export default ProfileScreen;
