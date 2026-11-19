import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.65;
const SPACER = (width - ITEM_WIDTH) / 2;

const DATA = [
  { id: '1', title: 'Card 1', color: '#6C5CE7' },
  { id: '2', title: 'Card 2', color: '#00B894' },
  { id: '3', title: 'Card 3', color: '#E17055' },
  { id: '4', title: 'Card 4', color: '#0984E3' },
  { id: '5', title: 'Card 5', color: '#FDCB6E' },
];

function Card({
  item,
  index,
  scrollX,
}: {
  item: (typeof DATA)[number];
  index: number;
  scrollX: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => {
    const input = [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH];
    return {
      transform: [
        { scale: interpolate(scrollX.value, input, [0.8, 1, 0.8], Extrapolation.CLAMP) },
        { rotate: `${interpolate(scrollX.value, input, [10, 0, -10], Extrapolation.CLAMP)}deg` },
      ],
      opacity: interpolate(scrollX.value, input, [0.5, 1, 0.5], Extrapolation.CLAMP),
    };
  });

  return (
    <View style={{ width: ITEM_WIDTH }}>
      <Animated.View style={[styles.card, { backgroundColor: item.color }, style]}>
        <Text style={styles.title}>{item.title}</Text>
      </Animated.View>
    </View>
  );
}

export default function Carousel() {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SPACER }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <Card item={item} index={index} scrollX={scrollX} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  card: {
    height: 300,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: '#fff', fontSize: 28, fontWeight: '800' },
});