import { Accelerometer } from 'expo-sensors';
import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

const SHAKE_THRESHOLD = 1.8; // en "g"
const COOLDOWN_MS = 800;

export default function Shake() {
  const offset = useSharedValue(0);
  const lastShake = useRef(0);

  const triggerShake = () => {
    offset.value = withSequence(
      withTiming(-20, { duration: 50 }),
      withRepeat(withTiming(20, { duration: 100 }), 6, true),
      withTiming(0, { duration: 50 })
    );
  };

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const sub = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();
      if (magnitude > SHAKE_THRESHOLD && now - lastShake.current > COOLDOWN_MS) {
        lastShake.current = now;
        triggerShake();
      }
    });
    return () => sub.remove();
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, style]} />
      <Text style={styles.hint}>Agita el celular</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 },
  box: { width: 120, height: 120, borderRadius: 20, backgroundColor: '#D63031' },
  hint: { fontSize: 16, color: '#636E72' },
});