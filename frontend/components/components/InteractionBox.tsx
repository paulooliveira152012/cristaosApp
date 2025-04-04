import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ListingItemType } from "./Types/ListingTypes";
import { handleComment, handleReply, handleLike, handleSave } from "./functions/functions";
import ListingDetails from "@/ListingDetails";

type InteractionBoxProps = {
  liked: boolean;
  commented: boolean;
  saved: boolean;
  likesCount?: number;
  commentsCount?: number;
  listingId: string;
  userId: string;
  commentedBy?: {
    _id: string;
    user: string | { _id: string; username: string; profileImage?: string };
    commentText: string;
    createdAt?: string;
    likedBy?: string[]; // ← Add this
  }[];
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
  commentedBy, // 👈 ADICIONA ISSO AQUI
}: InteractionBoxProps) => {
  const [showCommentingBox, setShowCommentingBox] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  // commenting on comments
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(
    null
  );
  const [replyText, setReplyText] = useState(""); // texto da resposta

  const submitComment = async () => {
    if (commentText.trim() === "") return;

    // ✍️ Aqui você vai implementar a lógica real depois
    console.log("📝 Enviando comentário:", commentText);
    await handleComment(commentText, listingId, userId, setListings);
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
          <Pressable
            onPress={() => {
              setShowCommentingBox(!showCommentingBox);
            }}
          >
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

          <View>
            {commentedBy && commentedBy.length > 0 ? (
              commentedBy.map((comment, index) => {
                const isCommentLiked =
                  Array.isArray((comment as any).likedBy) &&
                  (comment as any).likedBy.includes(userId);

                return (
                  <View key={index}>
                    <View style={styles.innerCommentingContainer}>
                      <View style={styles.innerCommentingContainerTop}>
                        {/* Profile Image */}
                        {typeof comment.user === "object" &&
                        "profileImage" in comment.user &&
                        comment.user.profileImage ? (
                          <Image
                            source={{ uri: comment.user.profileImage }}
                            style={{ width: 30, height: 30, borderRadius: 15 }}
                          />
                        ) : (
                          <View
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 15,
                              backgroundColor: "#ccc",
                            }}
                          />
                        )}

                        <View>
                          {/* Username */}
                          <Text style={{ fontWeight: "600" }}>
                            {typeof comment.user === "object" &&
                            "username" in comment.user
                              ? comment.user.username
                              : comment.user}
                          </Text>

                          {/* Date */}
                          {comment.createdAt && (
                            <Text style={{ fontSize: 12, color: "gray" }}>
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </Text>
                          )}
                        </View>
                      </View>

                      {/* Comment Content + Like */}
                      <View>
                        <Text>{comment.commentText}</Text>

                        {replyingToCommentId === comment._id && (
                          <View style={{ marginTop: 8 }}>
                            <TextInput
                              style={styles.input}
                              placeholder="Responder..."
                              value={replyText}
                              onChangeText={setReplyText}
                            />
                            <Pressable
                              style={styles.submitButton}
                              onPress={async() => {
                                // Aqui você pode chamar uma função handleReply
                                console.log(
                                  "📩 Enviando resposta para o comentário:",
                                  comment._id
                                );
                                // TODO: implementar handleReply()
                                setReplyText("");
                                setReplyingToCommentId(null);
                                await handleReply(
                                  replyText,
                                  comment._id,
                                  listingId,
                                  userId,
                                  setListings
                                );
                                
                              }}
                            >
                              <Text style={styles.submitText}>
                                Enviar resposta
                              </Text>
                            </Pressable>
                          </View>
                        )}

                        <View style={styles.commentInteractionButtons}>
                          {/* ❤️ Like */}
                          <View style={styles.iconGroup}>
                            <Pressable
                              onPress={() =>
                                handleLike(
                                  listingId,
                                  userId,
                                  setListings,
                                  comment._id
                                )
                              }
                            >
                              <MaterialCommunityIcons
                                name={
                                  isCommentLiked ? "heart" : "heart-outline"
                                }
                                size={23}
                                color={isCommentLiked ? "red" : "gray"}
                              />
                            </Pressable>
                            {/* Optional: Count of likes for the comment */}
                            {/* You might want to store likesCount in comment */}
                          </View>

                          {/* 💬 (Re)Comment */}
                          <View style={styles.iconGroup}>
                            <Pressable
                              onPress={() => {
                                setReplyingToCommentId(comment._id);
                              }}
                            >
                              <MaterialCommunityIcons
                                name="comment-processing"
                                size={23}
                                color={"gray"}
                              />
                            </Pressable>

                            {commentsCount > 0 && <Text>{commentsCount}</Text>}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={{ color: "gray" }}>Nenhum comentário ainda.</Text>
            )}
          </View>
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

  commentInteractionButtons: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
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

  innerCommentingContainer: {
    flexDirection: "column",
    // alignItems: "center",
    gap: 10,
    marginBottom: 10,
    // backgroundColor: "red",
    marginTop: 10,
  },

  innerCommentingContainerTop: {
    // backgroundColor: "green",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
