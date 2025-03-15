import React, { useState } from "react";
import {
  SafeAreaView,
  Pressable,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { ThemedText } from "../../components/ThemedText";

// import functions
import { handleLogin, handleSignup } from "../../functions/menu";

// User can choose to sign in
export default function Menu() {
  const [selectedPage, setSelectedPage] = useState<"login" | "signup" | null>(
    null
  );
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log("Selected Page:", selectedPage);


  const loginCall = () => {
    handleLogin()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Selection Menu */}
      {selectedPage === null && (
        <>
          <Pressable
            onPress={() => setSelectedPage("login")}
            style={styles.button}
          >
            <ThemedText style={styles.buttonText}>Login</ThemedText>
          </Pressable>

          <Pressable
            onPress={() => setSelectedPage("signup")}
            style={styles.button}
          >
            <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
          </Pressable>
        </>
      )}

      {/* Login Form */}
      {selectedPage === "login" && (
        <View style={styles.formContainer}>
          <ThemedText style={styles.title}>Login</ThemedText>

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

          <Pressable
            style={styles.button}
            onPress={() => handleLogin(email, password)}
          >
            <ThemedText style={styles.buttonText}>Login</ThemedText>
          </Pressable>

          <Pressable
            onPress={() => setSelectedPage(null)}
            style={styles.backButton}
          >
            <ThemedText style={styles.backButtonText}>Back</ThemedText>
          </Pressable>
        </View>
      )}

      {/* Signup Form */}
      {selectedPage === "signup" && (
        <View style={styles.formContainer}>
          <ThemedText style={styles.title}>Sign Up</ThemedText>

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

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          {/* <Pressable style={styles.button} onPress={() => handleLogin(email, password)}> */}
          <Pressable
            style={styles.button}
            onPress={() => handleSignup(email, password, username)}
          >
            <ThemedText style={styles.buttonText}>Create Account</ThemedText>
          </Pressable>

          <Pressable
            onPress={() => setSelectedPage(null)}
            style={styles.backButton}
          >
            <ThemedText style={styles.backButtonText}>Back</ThemedText>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

// ✅ Fixed & Improved Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center" as const, // ✅ Fixed Type
    width: 200,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700", // ✅ Fixed fontWeight
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  formContainer: {
    width: "100%",
    alignItems: "center" as const, // ✅ Fixed Type
  },
  title: {
    fontSize: 24,
    fontWeight: "700", // ✅ Fixed fontWeight
    marginBottom: 20,
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
  },
});
