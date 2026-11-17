import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import TopicScreen from './src/screens/TopicScreen';
import type { RootStackParamList } from './src/navigation/types';
import { AccessibilityContext } from './src/context/AccessibilityContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontScale, setFontScale] = useState(1);

  return (
    <AccessibilityContext.Provider value={{ fontScale, setFontScale }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#F3FBF9' },
            headerTintColor: '#183438',
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: '#F3FBF9' },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Topic"
            component={TopicScreen}
            options={{ title: 'Conteúdo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AccessibilityContext.Provider>
  );
}
