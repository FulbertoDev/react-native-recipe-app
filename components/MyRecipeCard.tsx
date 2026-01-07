
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Recipe } from "../constants/mockData";
import { COLORS, FONT_SIZES, SPACING } from "../constants/theme";
import { useRecipes } from "../context/RecipeContext";

interface MyRecipeCardProps {
    recipe: Recipe;
}

export default function MyRecipeCard({ recipe }: MyRecipeCardProps) {
    const router = useRouter();
    const { deleteRecipe } = useRecipes();

    const handleEdit = () => {
        router.push({
            pathname: "/add-recipe",
            params: { id: recipe.id },
        } as any);
    };

    const handleDelete = () => {
        Alert.alert("Delete Recipe", "Are you sure you want to delete this recipe?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteRecipe(recipe.id),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Link href={`/recipe/${recipe.id}`} asChild>
                <TouchableOpacity style={styles.cardContent}>
                    <Image
                        source={{ uri: recipe.image }}
                        style={styles.image}
                        contentFit="cover"
                        transition={200}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title} numberOfLines={1}>
                            {recipe.title}
                        </Text>
                        <Text style={styles.subtitle} numberOfLines={2}>
                            {recipe.ingredients.slice(0, 3).join(", ")}...
                        </Text>
                        <Text style={styles.description} numberOfLines={2}>
                            {recipe.steps[0]}...
                        </Text>
                    </View>
                </TouchableOpacity>
            </Link>

            <View style={styles.actionRow}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: COLORS.success }]}
                    onPress={handleEdit}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: COLORS.danger, marginLeft: SPACING.m }]}
                    onPress={handleDelete}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginBottom: SPACING.m,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        padding: SPACING.s,
    },
    cardContent: {
        marginBottom: SPACING.s,
    },
    image: {
        width: "100%",
        height: 180,
        borderRadius: 8,
    },
    textContainer: {
        marginTop: SPACING.s,
    },
    title: {
        fontSize: FONT_SIZES.large,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xs,
    },
    description: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textSecondary,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: SPACING.s,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: FONT_SIZES.medium,
    }
});
