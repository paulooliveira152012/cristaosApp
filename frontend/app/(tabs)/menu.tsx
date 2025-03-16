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
import { useRouter } from "expo-router";

import { useUser } from "context/UserContext";



// User can choose to sign in
export default function Menu() {
  const [selectedPage, setSelectedPage] = useState<"login" | "signup" | null>(
    null
  );
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false)
  const [verificationNotificationModal, setVerificationNotificationModal] = useState(false)
  const router = useRouter();
  const { login, currentUser, logout} = useUser()
  const [showSettings, setShowSettings] = useState(false); // ✅ Controls settings menu visibility

  console.log("✅", currentUser)

  console.log("Selected Page:", selectedPage);

  const loginCall = async () => {
    setLoading(true);
    setError("");

    try {
        console.log("Calling handleLogin from a local function...");
        const response = await handleLogin(email, password, login); // ✅ Await API call

        if (response?.success) {
            console.log("Login successful:", response.message);
            setEmail("");
            setPassword("");
            setModal(false)
            setSelectedPage(null); // ✅ Navigate back or move to a dashboard
            router.push("/(tabs)");

        } else {
            setError(response?.message || "Login failed.");
            console.log("invalid login")
            setModal(true)
        }
    } catch (error) {
        setError("Something went wrong. Please try again.");
        console.error("Login error:", error);
    }

    setLoading(false);
};

const signupCall = async () => {
  setLoading(true);
  setError("");

  try {
      console.log("Calling handleSignup from a local function...");
      const response = await handleSignup(email, password, username);

      if (response?.success) {
          console.log("Signup successful:", response.message);

          setVerificationNotificationModal(true)

          // ✅ Clear fields before navigating
          setEmail("");
          setPassword("");
          setUsername("");

          console.log("✅ fields have been cleared!")

          // ✅ Ensure state updates apply first
          // setTimeout(() => setSelectedPage(null), 100); 
      } else {
          setError(response?.message || "Signup failed.");
      }
  } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Signup error:", error);
  }

  setLoading(false);
};



return (
  <SafeAreaView style={styles.container}>
    {/* ✅ Show user info if logged in */}
    {currentUser ? (
  <View style={styles.settingsContainer}>
    <ThemedText style={styles.welcomeText}>
      Welcome, {currentUser.username}!
    </ThemedText>

    {/* Settings Button */}
    <Pressable
      style={styles.settingsButton}
      onPress={() => setShowSettings(!showSettings)}
    >
      <ThemedText style={styles.settingsButtonText}>
        {showSettings ? "Close Settings" : "Open Settings"}
      </ThemedText>
    </Pressable>

    {/* Settings Menu */}
    {showSettings && (
      <View style={styles.settingsMenu}>
        <Pressable style={styles.settingsItem}>
          <ThemedText>🔧 Profile Settings</ThemedText>
        </Pressable>

        <Pressable style={styles.settingsItem}>
          <ThemedText>🔔 Notifications</ThemedText>
        </Pressable>

        <Pressable style={styles.settingsItem}>
          <ThemedText>🔒 Account Security</ThemedText>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={logout}>
          <ThemedText style={styles.logoutButtonText}>🚪 Logout</ThemedText>
        </Pressable>
      </View>
    )}
  </View>
) : (

      <>
        {/* ✅ Show login/signup buttons if no user is logged in */}
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
              onPress={loginCall}
            >
              <ThemedText style={styles.buttonText}>Login</ThemedText>
            </Pressable>

            <Pressable
              onPress={() => setSelectedPage(null)}
              style={styles.backButton}
            >
              <ThemedText style={styles.backButtonText}>Back</ThemedText>
            </Pressable>

            {/* Modal */}
            {modal && (
              <View>
                <ThemedText>
                  Please verify your account through the email we've sent you before proceeding!
                </ThemedText>
              </View>
            )}
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

            <Pressable
              style={styles.button}
              onPress={signupCall}
            >
              <ThemedText style={styles.buttonText}>Create Account</ThemedText>
            </Pressable>

            <Pressable
              onPress={() => setSelectedPage(null)}
              style={styles.backButton}
            >
              <ThemedText style={styles.backButtonText}>Back</ThemedText>
            </Pressable>

            {verificationNotificationModal && (
              <View style={styles.verificationNotificationModalContainer}>
                <ThemedText>
                  A verification link has been sent to your email. Please verify it in order to log in.
                </ThemedText>
                <Pressable 
                  onPress={() => {
                    setSelectedPage("login");
                    setVerificationNotificationModal(false);
                  }}
                  style={styles.okButton}
                >
                  <ThemedText>Ok</ThemedText>
                </Pressable>
              </View>
            )}
          </View>
        )}
      </>
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

  verificationNotificationModalContainer: {
    flex: 1,
    height: "100%",
    position: "absolute",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },

  okButton: {
    backgroundColor: "white",
    width: "50%",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    borderColor: "lightgray",
    borderWidth: 1,

    // ✅ iOS Shadow
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // ✅ Android Shadow
    elevation: 5, 
},
settingsContainer: {
  width: "90%",
  alignItems: "center",
},
welcomeText: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
},
settingsButton: {
  backgroundColor: "#007AFF",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
  width: "100%",
  marginVertical: 10,
},
settingsButtonText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "700",
},
settingsMenu: {
  backgroundColor: "#F0F0F0",
  padding: 10,
  borderRadius: 10,
  width: "100%",
  marginTop: 10,
},
settingsItem: {
  backgroundColor: "#FFF",
  padding: 12,
  borderRadius: 8,
  marginBottom: 5,
  alignItems: "center",
},
logoutButton: {
  backgroundColor: "red",
  padding: 12,
  borderRadius: 8,
  marginTop: 10,
  alignItems: "center",
},
logoutButtonText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "700",
},

});
