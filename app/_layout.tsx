
import { Stack } from "expo-router";
import { COLORS } from "../constants/theme";
import { RecipeProvider } from "../context/RecipeContext";

export default function RootLayout() {
  return (
    <RecipeProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerShadowVisible: false,
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="recipe/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-recipe"
          options={{
            title: "Add New Recipe",
            presentation: "modal",
            headerShown: true
          }}
        />
      </Stack>
    </RecipeProvider>
  );
}
