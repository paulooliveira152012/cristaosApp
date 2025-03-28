// 📄 login.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  Pressable,
  TextInput,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { handleLogin } from "../functions/menu";
import { useUser } from "context/UserContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const { login } = useUser();

  const loginCall = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await handleLogin(email, password, login);

      if (response?.success) {
        setEmail("");
        setPassword("");
        router.push("/(tabs)");
      } else {
        setError(response?.message || "Login failed.");
        setModal(true);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", error);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={loginCall}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/signup")}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </Pressable>

      {modal && (
        <View>
          <Text>Please verify your account through your email.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  linkText: { marginTop: 15, color: "#007AFF", textAlign: "center" },
});