
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function CustomDrawerContent(props: any) {
  const { state, navigation, descriptors } = props;

  const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
    index: 'move-outline',
    loading: 'hourglass-outline',
    multitouch: 'finger-print-outline',
    bounce: 'radio-button-on-outline',
    carousel: 'albums-outline',
    shake: 'phone-portrait-outline',
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      <View style={styles.header}>
        

        <Text style={styles.title}>Animaciones</Text>
        
      </View>

      <View style={styles.menu}>
        {state.routes.map((route: any, index: number) => {
          const options = descriptors[route.key]?.options;
          const label = options?.drawerLabel ?? options?.title ?? route.name;
          const focused = state.index === index;
          const icon = icons[route.name] ?? 'apps-outline';

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[
                styles.menuItem,
                focused && styles.menuItemActive,
              ]}
            >
              <Ionicons
                name={icon}
                size={21}
                color={focused ? '#7C3AED' : '#64748B'}
              />

              <Text
                style={[
                  styles.menuLabel,
                  focused && styles.menuLabelActive,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      
    </DrawerContentScrollView>
  );
}
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#6D28D9',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveTintColor: '#7C3AED',
          drawerInactiveTintColor: '#64748B',
          drawerActiveBackgroundColor: '#F3E8FF',
          drawerLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            marginLeft: -10,
          },
          drawerStyle: {
            backgroundColor: '#FFFFFF',
            width: 280,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{ title: '1. Drag & Rotación' }}
        />
        <Drawer.Screen
          name="loading"
          options={{ title: '2. Loading' }}
        />
        <Drawer.Screen
          name="multitouch"
          options={{ title: '3. Multitouch' }}
        />
        <Drawer.Screen
          name="bounce"
          options={{ title: '4. Bounce' }}
        />
        <Drawer.Screen
          name="carousel"
          options={{ title: '5. Carrusel' }}
        />
        <Drawer.Screen
          name="shake"
          options={{ title: '6. Acelerómetro' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#6D28D9',
    padding: 24,
    paddingTop: 35,
    paddingBottom: 28,
  },
  logoContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#E9D5FF',
    fontSize: 12,
    marginTop: 5,
  },
  menu: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 5,
    gap: 13,
  },
  menuItemActive: {
    backgroundColor: '#F3E8FF',
  },
  menuLabel: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  menuLabelActive: {
    color: '#7C3AED',
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  },
});