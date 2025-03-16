import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Text,
  Switch,
} from "react-native";
// import { useUser } from "context/UserContext";
import { useUser } from "context/UserContext"
import { ThemedText } from "../components/ThemedText";


const Settings = () => {
  const { currentUser, login } = useUser();

  const [section, setSection] = useState<"profile" | "language" | "theme" | null>(null);
  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false);

  const handleProfileUpdate = () => {
    console.log("Updating profile...", { firstName, lastName, email, password });
    // Implement backend API call to update user profile
    const updatedUser = { ...currentUser, firstName, lastName, email };
    login(updatedUser); // Update user in context
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.title}>Settings</ThemedText>

      {/* ✅ Settings Menu */}
      {!section && (
        <>
          <Pressable style={styles.menuItem} onPress={() => setSection("profile")}>
            <ThemedText>📝 Edit Profile</ThemedText>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => setSection("language")}>
            <ThemedText>🌍 Language</ThemedText>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => setSection("theme")}>
            <ThemedText>🎨 Theme</ThemedText>
          </Pressable>
        </>
      )}

      {/* ✅ Profile Settings */}
      {section === "profile" && (
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Pressable style={styles.button} onPress={handleProfileUpdate}>
            <ThemedText style={styles.buttonText}>Save Changes</ThemedText>
          </Pressable>
          <Pressable style={styles.backButton} onPress={() => setSection(null)}>
            <ThemedText style={styles.backButtonText}>Back</ThemedText>
          </Pressable>
        </View>
      )}

      {/* ✅ Language Settings */}
      {section === "language" && (
        <View style={styles.section}>
          {["English", "Portuguese", "Spanish"].map((lang) => (
            <Pressable
              key={lang}
              style={[
                styles.languageOption,
                selectedLanguage === lang && styles.selectedOption,
              ]}
              onPress={() => setSelectedLanguage(lang)}
            >
              <ThemedText>{lang}</ThemedText>
            </Pressable>
          ))}
          <Pressable style={styles.backButton} onPress={() => setSection(null)}>
            <ThemedText style={styles.backButtonText}>Back</ThemedText>
          </Pressable>
        </View>
      )}

      {/* ✅ Theme Settings */}
      {section === "theme" && (
        <View style={styles.section}>
          <View style={styles.themeToggle}>
            <ThemedText>🌞 Light Mode</ThemedText>
            <Switch value={darkMode} onValueChange={setDarkMode} />
            <ThemedText>🌙 Dark Mode</ThemedText>
          </View>
          <Pressable style={styles.backButton} onPress={() => setSection(null)}>
            <ThemedText style={styles.backButtonText}>Back</ThemedText>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

// ✅ **Styles**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  section: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  languageOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    width: "90%",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#007AFF",
    color: "#FFF",
  },
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
});

export default Settings;
