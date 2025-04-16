import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getBaseApi } from "utils/getBaseApi";
import InteractionBox from "../../components/components/InteractionBox";
import { useUser } from "context/UserContext";

const ProfileScreen = () => {
  const params = useLocalSearchParams();
  const id = typeof params.id === "string" ? params.id : null;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<any[]>([]);
  const [isFriend, setIsFriend] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const api = getBaseApi();
  const { currentUser } = useUser();

  console.log("current user in user's profile page:", currentUser);

  console.log("user who's profile is being visited:", user);

  // console.log("🧾 Comentários do primeiro listing:", JSON.stringify(listings[0].commentedBy, null, 2));

  // com base nesse log, como faco para ter acesso aos Objeto commentedBy quero logar eles?

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${api}/api/users/getUser/${id}`);
        const data = await res.json();
        setUser(data);

        // Simulação de verificação de amizade/seguimento
        setIsFriend(data.friends?.includes("CURRENT_USER_ID")); // ajuste depois
        setIsFollowing(data.followers?.includes("CURRENT_USER_ID"));
      } catch (error) {
        console.error("❌ Erro ao carregar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchListings = async () => {
      try {
        const res = await fetch(`${api}/api/listings/getByUser/${id}`);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("❌ Erro ao buscar listings do usuário:", error);
      }
    };

    if (id) {
      fetchUser();
      fetchListings();
    }
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (!user)
    return (
      <Text style={{ textAlign: "center", marginTop: 40 }}>
        Usuário não encontrado.
      </Text>
    );

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={{
            uri: user.profileImage || "https://placehold.co/100x100?text=User",
          }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
          {user.firstName}
        </Text>
        <Text style={{ color: "#888" }}>@{user.username}</Text>
      </View>

      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
        {user.bio || "Este usuário ainda não escreveu uma bio."}
      </Text>

      {/* Botões sociais */}
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={() => setIsFriend(!isFriend)}>
          <Text style={styles.buttonText}>
            {isFriend ? "Unfriend" : "Add Friend"}
          </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setIsFollowing(!isFollowing)}
        >
          <Text style={styles.buttonText}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => alert("DM feature coming soon!")}
        >
          <Text style={styles.buttonText}>DM</Text>
        </Pressable>
      </View>

      {/* Listings */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
          Publicações de {user.firstName}:
        </Text>
        {listings.length === 0 ? (
          <Text>Este usuário ainda não postou nada.</Text>
        ) : (
          listings.map((listing, index) => (
            <View key={index} style={styles.listing}>
              {listing.createdAt && <Text>{listing.createdAt}</Text>}
              {listing.title && (
                <Text style={styles.listingTitle}>{listing.title}</Text>
              )}
              {listing.content && <Text>{listing.content}</Text>}
              {listing.image && (
                <Image
                  source={{ uri: listing.image }}
                  style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                />
              )}
              {/* COMPONENTE DE INTERAÇAO */}
              <InteractionBox
                liked={listing.likedBy?.includes(currentUser._id)}
                commented={!!listing.commentedBy?.length}
                saved={listing.savedBy?.includes(currentUser._id)}
                commentsCount={listing.commentedBy?.length || 0}
                listingId={listing._id}
                userId={currentUser._id} // substituir depois com seu contexto real
                setListings={setListings}
                commentedBy={
                  Array.isArray(listing.commentedBy)
                    ? listing.commentedBy.map((comment: any) => ({
                        ...comment,
                        commentText: comment.commentText || comment.comment,
                      }))
                    : []
                }
              
              />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#539DF3",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  listing: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
  },
  listingTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
});

export default ProfileScreen;
