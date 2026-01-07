
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import CategoryBar from "../components/CategoryBar";
import MyRecipeCard from "../components/MyRecipeCard";
import RecipeCard from "../components/RecipeCard";
import { COLORS, FONT_SIZES, SPACING } from "../constants/theme";
import { useRecipes } from "../context/RecipeContext";

export default function HomeScreen() {
  const router = useRouter();
  const { recipes, favorites, isFavorite } = useRecipes();
  const [selectedCategory, setSelectedCategory] = useState("my_food");

  const filteredRecipes = useMemo(() => {
    switch (selectedCategory) {
      case "favorites":
        return recipes.filter((r) => isFavorite(r.id));
      case "my_food":
        return recipes.filter(
          (r) => r.categoryId === "my_food" || r.isMyFood
        );
      default:
        return recipes.filter((r) => r.categoryId === selectedCategory);
    }
  }, [selectedCategory, recipes, favorites, isFavorite]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <Ionicons name="person-circle-outline" size={40} color={COLORS.primary} />
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello, User!</Text>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Make your own food,</Text>
        <Text style={styles.mainTitle}>
          stay at <Text style={styles.highlightTitle}>home</Text>
        </Text>
      </View>

      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {selectedCategory === "my_food" && (
        <View style={styles.addRecipeContainer}>
          <Button
            title="Add New Recipe"
            onPress={() => router.push("/add-recipe" as any)}
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>
        {selectedCategory === "favorites" ? "My Favorite Recipes" : "Recipes"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={selectedCategory === "my_food" ? styles.fullWidthItem : styles.columnItem}>
            {selectedCategory === "my_food" ? (
              <MyRecipeCard recipe={item} />
            ) : (
              <RecipeCard recipe={item} />
            )}
          </View>
        )}
        key={selectedCategory === "my_food" ? "list-1" : "list-2"}
        numColumns={selectedCategory === "my_food" ? 1 : 2}
        columnWrapperStyle={selectedCategory === "my_food" ? undefined : styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {selectedCategory === "favorites"
                ? "No favorite recipes yet."
                : "No recipes found."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingHorizontal: SPACING.m,
    paddingTop: SPACING.l,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.l,
    justifyContent: 'space-between'
  },
  greetingContainer: {
    backgroundColor: COLORS.grayLight,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
  },
  greetingText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginBottom: SPACING.m,
  },
  mainTitle: {
    fontSize: FONT_SIZES.xxlarge,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  highlightTitle: {
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: SPACING.m,
  },
  addRecipeContainer: {
    marginBottom: SPACING.m,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: SPACING.m,
  },
  columnItem: {
    width: "48%",
  },
  fullWidthItem: {
    width: "100%",
    paddingHorizontal: SPACING.m,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.medium
  }
});
