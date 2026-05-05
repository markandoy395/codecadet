import React, { useEffect, useRef } from 'react'
import { Animated, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat'
import { useAppFonts } from '../src/constants/fonts'

export default function LandingPage() {
  const loaded = useAppFonts()
  const yellowTop = useRef(new Animated.Value(-170)).current
  const blueTop = useRef(new Animated.Value(-230)).current
  const yellowBottom = useRef(new Animated.Value(-180)).current
  const blueBottom = useRef(new Animated.Value(-230)).current
  const router = useRouter()
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  })
  useEffect(() => {
    // Top swap (Yellow ↔ Blue)
    const animateTop = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(yellowTop, {
              toValue: -230,
              duration: 3500,
              useNativeDriver: false,
            }),
            Animated.timing(blueTop, {
              toValue: -170,
              duration: 3500,
              useNativeDriver: false,
            }),
          ]),
          Animated.parallel([
            Animated.timing(yellowTop, {
              toValue: -170,
              duration: 3500,
              useNativeDriver: false,
            }),
            Animated.timing(blueTop, {
              toValue: -230,
              duration: 3500,
              useNativeDriver: false,
            }),
          ]),
        ]),
      ).start()
    }

    // Bottom swap (Yellow ↔ Blue) — runs at different speed
    const animateBottom = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(yellowBottom, {
              toValue: -230,
              duration: 3500,
              useNativeDriver: false,
            }),
            Animated.timing(blueBottom, {
              toValue: -180,
              duration: 3500,
              useNativeDriver: false,
            }),
          ]),
          Animated.parallel([
            Animated.timing(yellowBottom, {
              toValue: -180,
              duration: 3500,
              useNativeDriver: false,
            }),
            Animated.timing(blueBottom, {
              toValue: -230,
              duration: 3500,
              useNativeDriver: false,
            }),
          ]),
        ]),
      ).start()
    }

    animateTop()
    animateBottom()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Yellow Circle */}
      <Animated.View style={[styles.circle, styles.yellowCircle, { top: yellowTop }]} />

      {/* Top Blue Circle */}
      <Animated.View style={[styles.circle, styles.blueCircle, { top: blueTop }]} />

      {/* Bottom Yellow Circle */}
      <Animated.View style={[styles.circle, styles.bottomYellowCircle, { bottom: yellowBottom }]} />

      {/* Bottom Blue Circle */}
      <Animated.View style={[styles.circle, styles.bottomBlueCircle, { bottom: blueBottom }]} />

      {/* Center Image */}
      <Image
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../assets/images/codeCadetLogo.png')}
      />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/LoginScreen')}>
        <Text style={{ color: 'white' }}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0D133D',
    padding: 18,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
  circle: {
    position: 'absolute',
    width: 359,
    height: 359,
    borderRadius: 359 / 2,
  },
  yellowCircle: {
    backgroundColor: '#F5B700',
    left: -170,
  },
  blueCircle: {
    backgroundColor: '#0D133D',
    right: -170,
  },
  bottomYellowCircle: {
    backgroundColor: '#F5B700',
    right: -180,
  },
  bottomBlueCircle: {
    backgroundColor: '#0D133D',
    left: -130,
  },
})
