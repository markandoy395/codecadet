import React, { useEffect, useRef } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'

// Individual dot with specific angle, opacity, and color
const SpinnerDot = ({ angle, opacity, color }: { angle: number; opacity: number; color: string }) => {
  return (
    <View
      style={[
        styles.dot,
        {
          transform: [{ rotate: `${angle}deg` }],
          opacity: opacity,
        },
      ]}
    >
      <View style={[styles.dotInner, { backgroundColor: color }]} />
    </View>
  )
}

// Main spinner component with multiple dots at different angles
const RadialSpinner = ({ size = 50 }: { size?: number }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animateRotation = () => {
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        rotateAnim.setValue(0)
        animateRotation()
      })
    }
    animateRotation()
  }, [])

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  // Create 12 dots at different angles with varying opacity and alternating colors
  const dots = []
  for (let i = 0; i < 12; i++) {
    const angle = i * 30 // 360/12 = 30 degrees apart
    const opacity = 0.3 + (i / 12) * 0.7 // Opacity from 0.3 to 1.0
    const isYellow = i % 2 === 0 // Alternate between yellow and blue
    dots.push(<SpinnerDot key={i} angle={angle} opacity={opacity} color={isYellow ? '#F5B700' : '#0D133D'} />)
  }

  return (
    <Animated.View
      style={[
        styles.spinner,
        {
          width: size,
          height: size,
          transform: [{ rotate: spin }],
        },
      ]}
    >
      {dots}
    </Animated.View>
  )
}

export default function SimpleLoading({ isVisible = true, loadingText = 'Loading...', backgroundColor = '#ffffff' }: { isVisible?: boolean; loadingText?: string; backgroundColor?: string }) {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <Animated.View style={[styles.container, { backgroundColor, opacity: fadeAnim }]}>
      <View style={styles.content}>
        <RadialSpinner size={50} />
        <Text style={styles.loadingText}>{loadingText}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dotInner: {
    width: 4,
    height: 12,
    borderRadius: 2,
    marginTop: 2,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
})

// Usage example
export const LoadingExample = () => {
  return (
    <View style={{ flex: 1 }}>
      <SimpleLoading isVisible={true} loadingText="Loading..." backgroundColor="#ffffff" />
    </View>
  )
}
