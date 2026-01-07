
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "../../constants/theme";
import { useRecipes } from "../../context/RecipeContext";

export default function RecipeDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { recipes, toggleFavorite, isFavorite, deleteRecipe } = useRecipes();

    const recipe = recipes.find((r) => r.id === id);

    if (!recipe) {
        return (
            <View style={styles.center}>
                <Text>Recipe not found</Text>
            </View>
        );
    }

    const isFav = isFavorite(recipe.id);

    const handleDelete = () => {
        Alert.alert(
            "Delete Recipe",
            "Are you sure you want to delete this recipe?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteRecipe(recipe.id);
                        router.back();
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Hero Image Section */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: recipe.image }} style={styles.image} contentFit="cover" />
                <View style={styles.overlay}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
                            <Text style={styles.backText}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => toggleFavorite(recipe.id)}
                        >
                            <Ionicons
                                name={isFav ? "heart" : "heart-outline"}
                                size={24}
                                color={isFav ? COLORS.danger : COLORS.white}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Title & Category */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <View style={styles.categoryRow}>
                        <Text style={styles.categoryText}>{recipe.categoryId}</Text>
                        <Text style={styles.categoryDivider}>|</Text>
                        <Text style={styles.categoryText}>British</Text>
                    </View>
                    {recipe.isMyFood && (
                        <TouchableOpacity onPress={handleDelete} style={{ marginTop: 8 }}>
                            <Text style={{ color: COLORS.danger }}>Delete Recipe</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Metadata Row */}
                <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                        <View style={styles.metaIconBg}>
                            <Ionicons name="time-outline" size={24} color={COLORS.textPrimary} />
                        </View>
                        <Text style={styles.metaText}>{recipe.time}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <View style={styles.metaIconBg}>
                            <Ionicons name="people-outline" size={24} color={COLORS.textPrimary} />
                        </View>
                        <Text style={styles.metaText}>{recipe.servings}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <View style={styles.metaIconBg}>
                            <Ionicons name="flame-outline" size={24} color={COLORS.danger} />
                        </View>
                        <Text style={styles.metaText}>{recipe.calories}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <View style={styles.metaIconBg}>
                            <Ionicons name="cellular-outline" size={24} color={COLORS.primary} />
                        </View>
                        <Text style={styles.metaText}>{recipe.difficulty}</Text>
                    </View>
                </View>

                {/* Ingredients */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Ingredients</Text>
                    {recipe.ingredients.map((ing, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            <View style={styles.bullet} />
                            <Text style={styles.ingredientText}>{ing}</Text>
                        </View>
                    ))}
                </View>

                {/* Steps */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Steps</Text>
                    {recipe.steps.map((step, index) => (
                        <View key={index} style={styles.stepContainer}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>{index + 1}</Text>
                            </View>
                            <Text style={styles.stepText}>{step}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        height: 300,
        width: "100%",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 50,
        paddingHorizontal: SPACING.m,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.m,
        borderRadius: 20,
    },
    backText: {
        fontWeight: 'bold',
        marginLeft: SPACING.xs,
    },
    iconButton: {
    },
    content: {
        padding: SPACING.l,
        paddingBottom: 50,
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: SPACING.l,
    },
    title: {
        fontSize: FONT_SIZES.xxlarge,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        textAlign: "center",
        marginBottom: SPACING.xs,
        fontFamily: 'serif',
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryText: {
        color: COLORS.textSecondary,
        fontSize: FONT_SIZES.medium,
        textTransform: "capitalize",
    },
    categoryDivider: {
        marginHorizontal: SPACING.s,
        color: COLORS.textSecondary,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xl,
        backgroundColor: COLORS.grayLight,
        padding: SPACING.m,
        borderRadius: 12,
    },
    metaItem: {
        alignItems: 'center',
    },
    metaIconBg: {
        backgroundColor: COLORS.grayDC,
        padding: SPACING.s,
        borderRadius: 8,
        marginBottom: SPACING.xs,
    },
    metaText: {
        fontSize: FONT_SIZES.small,
        fontWeight: 'bold',
        color: COLORS.textPrimary
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionHeader: {
        fontSize: FONT_SIZES.large,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: SPACING.m,
        fontFamily: 'serif',
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.s,
        backgroundColor: '#fffbeb',
        padding: SPACING.m,
        borderRadius: 12,
    },
    bullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
        marginRight: SPACING.m,
    },
    ingredientText: {
        fontSize: FONT_SIZES.medium,
        color: COLORS.textPrimary,
    },
    stepContainer: {
        flexDirection: 'row',
        marginBottom: SPACING.m,
    },
    stepNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
        marginTop: 2,
    },
    stepNumberText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    stepText: {
        flex: 1,
        fontSize: FONT_SIZES.medium,
        color: COLORS.textPrimary,
        lineHeight: 24,
    }
});
