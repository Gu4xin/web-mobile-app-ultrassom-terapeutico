import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccessibilityProvider } from "../components/accessibility";
import { BottomNavigation, palette } from "../components/ui";

export default function RootLayout() {
  return (
    <AccessibilityProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: palette.paper }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: palette.paper },
            animation: "fade",
          }}
        />
        <BottomNavigation />
      </SafeAreaView>
    </AccessibilityProvider>
  );
}
