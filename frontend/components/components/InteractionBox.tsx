import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ListingItemType } from "./Types/ListingTypes";
import { handleComment, handleLike, handleSave } from "./functions/functions";

type InteractionBoxProps = {
  liked: boolean;
  commented: boolean;
  saved: boolean;
  likesCount?: number;
  commentsCount?: number;
  listingId: string;
  userId: string;
  setListings: React.Dispatch<React.SetStateAction<ListingItemType[]>>;
};

const InteractionBox = ({
  liked,
  commented,
  saved,
  likesCount = 0,
  commentsCount = 0,
  listingId,
  userId,
  setListings,
}: InteractionBoxProps) => {
  const [showCommentingBox, setShowCommentingBox] = useState(false);
  const [commentText, setCommentText] = useState("");

  const submitComment = async () => {
    if (commentText.trim() === "") return;

    // ✍️ Aqui você vai implementar a lógica real depois
    console.log("📝 Enviando comentário:", commentText);
    handleComment( commentText, listingId, userId)
    setCommentText("");
    setShowCommentingBox(false);
  };

  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.container}>
        {/* ❤️ Like */}
        <View style={styles.iconGroup}>
          <Pressable onPress={() => handleLike(listingId, userId, setListings)}>
            <MaterialCommunityIcons
              name={liked ? "heart" : "heart-outline"}
              size={23}
              color={liked ? "red" : "gray"}
            />
          </Pressable>
          {likesCount > 0 && <Text>{likesCount}</Text>}
        </View>

        {/* 💬 Comment */}
        <View style={styles.iconGroup}>
          <Pressable onPress={() => setShowCommentingBox(!showCommentingBox)}>
            <MaterialCommunityIcons
              name="comment-processing"
              size={23}
              color={"gray"}
            />
          </Pressable>
          {commentsCount > 0 && <Text>{commentsCount}</Text>}
        </View>

        {/* 📌 Save */}
        <View style={styles.bookmark}>
          <Pressable onPress={handleSave}>
            <MaterialCommunityIcons
              name="bookmark"
              size={23}
              color={saved ? "#539DF3" : "gray"}
            />
          </Pressable>
        </View>
      </View>

      {/* ✍️ Comment Box */}
      {showCommentingBox && (
        <View style={styles.commentingBoxContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escreva um comentário..."
            value={commentText}
            onChangeText={setCommentText}
          />
          <Pressable onPress={submitComment} style={styles.submitButton}>
            <Text style={styles.submitText}>Enviar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  bookmark: {
    position: "absolute",
    right: 0,
  },
  commentingBoxContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#539DF3",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default InteractionBox;
