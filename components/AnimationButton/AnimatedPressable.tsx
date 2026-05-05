// components/AnimatedPressable.tsx
import React, { useRef } from 'react';
import { Pressable, Animated, ViewStyle } from 'react-native';

type AnimatedPressableProps = {
  children: React.ReactNode; // the content inside (image, text, etc.)
  onPress?: () => void; // action when clicked
  style?: ViewStyle | ViewStyle[]; // custom styling
};

export default function AnimatedPressable({
  children,
  onPress,
  style,
}: AnimatedPressableProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
