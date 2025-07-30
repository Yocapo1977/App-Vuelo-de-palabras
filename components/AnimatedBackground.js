import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function AnimatedBackground({ children }) {
  const floatingAnimation1 = useRef(new Animated.Value(0)).current;
  const floatingAnimation2 = useRef(new Animated.Value(0)).current;
  const floatingAnimation3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createFloatingAnimation = (animatedValue, duration, delay = 0) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Diferentes velocidades para crear efecto más orgánico
    const anim1 = createFloatingAnimation(floatingAnimation1, 4000, 0);
    const anim2 = createFloatingAnimation(floatingAnimation2, 6000, 1000);
    const anim3 = createFloatingAnimation(floatingAnimation3, 5000, 2000);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  const translateY1 = floatingAnimation1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const translateY2 = floatingAnimation2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const translateY3 = floatingAnimation3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  const opacity1 = floatingAnimation1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  return (
    <View style={styles.container}>
      {/* Elementos flotantes decorativos */}
      <Animated.View
        style={[
          styles.floatingElement,
          styles.element1,
          {
            transform: [{ translateY: translateY1 }],
            opacity: opacity1,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.floatingElement,
          styles.element2,
          {
            transform: [{ translateY: translateY2 }],
            opacity: floatingAnimation2,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.floatingElement,
          styles.element3,
          {
            transform: [{ translateY: translateY3 }],
            opacity: floatingAnimation3,
          },
        ]}
      />
      
      {/* Gradiente de fondo */}
      <View style={styles.gradientOverlay} />
      
      {/* Contenido */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    backgroundColor: 'linear-gradient(180deg, rgba(0,123,255,0.05) 0%, rgba(248,249,250,0) 100%)',
  },
  floatingElement: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(0,123,255,0.1)',
  },
  element1: {
    width: 60,
    height: 60,
    top: height * 0.1,
    left: width * 0.1,
  },
  element2: {
    width: 40,
    height: 40,
    top: height * 0.2,
    right: width * 0.15,
  },
  element3: {
    width: 80,
    height: 80,
    top: height * 0.35,
    left: width * 0.7,
  },
});