import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useUser } from 'context/UserContext';
import Header from '../../components/components/Header';
import Rooms from '../../components/components/Rooms';
import { ThemedText } from '../../components/ThemedText';

export default function HomeScreen() {
  const user = useUser();

  console.log("User in the home page:", user);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✅ Wrap everything in ScrollView */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true} // ✅ Show scroll for debugging
      >
        <Header />
        <Rooms />
        <ThemedText>Cristãos</ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // ✅ Allows screen to expand properly
  },
  scrollContainer: {
    flexGrow: 1, // ✅ Ensures ScrollView expands beyond screen
    paddingBottom: 50, // ✅ Prevents bottom cut-off issue
  }
});
