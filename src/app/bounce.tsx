import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

export default function Bounce() {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => {
          scale.value = withTiming(0.7, { duration: 120 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 4, stiffness: 180 }); // rebote
        }}
      >
        <Animated.View style={[styles.circle, style]}>
          <Text style={styles.text}>Presióname</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E17055',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: '#fff', fontWeight: '700' },
});