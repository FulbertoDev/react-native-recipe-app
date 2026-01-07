
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Recipe } from "../constants/mockData";
import { COLORS, FONT_SIZES, SPACING } from "../constants/theme";

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const imageHeight = recipe.height || 180;

    return (
        <Link href={`/recipe/${recipe.id}`} asChild>
            <TouchableOpacity style={styles.card}>
                <Image
                    source={{ uri: recipe.image }}
                    style={[styles.image, { height: imageHeight }]}
                    contentFit="cover"
                    transition={200}
                />
                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={2}>
                        {recipe.title}
                    </Text>
                    <Text style={styles.subtitle}>{recipe.categoryId}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginBottom: SPACING.m,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%',
    },
    image: {
        width: "100%",
    },
    content: {
        padding: SPACING.s,
    },
    title: {
        fontSize: FONT_SIZES.medium,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textSecondary,
        textTransform: "capitalize",
        fontStyle: 'italic',
    },
});
