import { SafeAreaView, StyleSheet, Platform } from 'react-native';

// import { HelloWave } from 'components/HelloWave';
import { HelloWave } from '../../components/HelloWave';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useUser } from 'context/UserContext';
import Header from '../../components/components/Header';

export default function HomeScreen() {

  const user = useUser()

  console.log("user in the home page is:", user)
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header/>
      <ThemedText>
        Cristãos
      </ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  safeArea: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});
