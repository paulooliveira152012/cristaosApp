import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  Pressable,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { handleSignup } from "../functions/menu";

export default function SignupScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [church, setChurch] = useState("");
  const [ministry, setMinistry] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [error, setError] = useState("");
  const [verificationModal, setVerificationModal] = useState(false);
  const router = useRouter();

  const signupCall = async () => {
    try {
      const response = await handleSignup(
        email,
        password,
        username,
        firstName,
        lastName,
        phoneNumber,
        church,
        ministry,
        twitterHandle,
        instagramHandle
      );

      if (response?.success) {
        setVerificationModal(true);
        setEmail("");
        setPassword("");
        setUsername("");
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setChurch("");
        setMinistry("");
        setTwitterHandle("");
        setInstagramHandle("");
      } else {
        setError(response?.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Phone Number (Optional)" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
      <TextInput style={styles.input} placeholder="Church" value={church} onChangeText={setChurch} />
      <TextInput style={styles.input} placeholder="Ministry" value={ministry} onChangeText={setMinistry} />
      <TextInput style={styles.input} placeholder="Twitter Handle" value={twitterHandle} onChangeText={setTwitterHandle} />
      <TextInput style={styles.input} placeholder="Instagram Handle" value={instagramHandle} onChangeText={setInstagramHandle} />

      <Pressable style={styles.button} onPress={signupCall}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/login")}> 
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </Pressable>

      {verificationModal && (
        <View>
          <Text>Check your email to verify your account before logging in.</Text>
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