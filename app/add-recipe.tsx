
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../components/Button";
import { Recipe } from "../constants/mockData";
import { COLORS, FONT_SIZES, SPACING } from "../constants/theme";
import { useRecipes } from "../context/RecipeContext";

export default function AddRecipe() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { addRecipe, updateRecipe, recipes } = useRecipes();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");

    useEffect(() => {
        if (id) {
            const existingRecipe = recipes.find((r) => r.id === id);
            if (existingRecipe) {
                setTitle(existingRecipe.title);
                setImage(existingRecipe.image);
                setIngredients(existingRecipe.ingredients.join("\n"));
                setSteps(existingRecipe.steps.join("\n"));
            }
        }
    }, [id, recipes]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        if (!title || !ingredients || !steps) {
            Alert.alert("Missing Fields", "Please fill in all required fields (Name, Ingredients, Steps).");
            return;
        }

        const recipeData: Recipe = {
            id: id || Date.now().toString(),
            categoryId: "my_food",
            isMyFood: true,
            title,
            image: image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
            time: "30 Mins",
            calories: "Unknown",
            difficulty: "Medium",
            servings: "2 Servings",
            ingredients: ingredients.split("\n").filter(i => i.trim().length > 0),
            steps: steps.split("\n").filter(s => s.trim().length > 0),
        };

        if (id) {
            updateRecipe(recipeData);
            Alert.alert("Success", "Recipe updated successfully!");
        } else {
            addRecipe(recipeData);
            Alert.alert("Success", "Recipe added successfully!");
        }
        router.back();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.label}>Recipe Name</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Pizza"
                value={title}
                onChangeText={setTitle}
            />

            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="camera" size={40} color={COLORS.textSecondary} />
                        <Text style={styles.placeholderText}>Tap to add cover image</Text>
                    </View>
                )}
            </TouchableOpacity>

            <Text style={styles.label}>Ingredients (one per line)</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="1 cup flour&#10;2 eggs..."
                value={ingredients}
                onChangeText={setIngredients}
                multiline
            />

            <Text style={styles.label}>Steps (one per line)</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="1. Mix ingredients...&#10;2. Bake for 20 mins..."
                value={steps}
                onChangeText={setSteps}
                multiline
            />

            <View style={styles.spacer} />

            <Button
                title={id ? "Update Recipe" : "Save Recipe"}
                onPress={handleSave}
            />

            <View style={styles.spacer} />

            <Button
                title="Back to Home"
                variant="secondary"
                onPress={() => router.back()}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SPACING.m,
    },
    label: {
        fontSize: FONT_SIZES.medium,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
        marginTop: SPACING.s,
    },
    input: {
        backgroundColor: COLORS.grayLight,
        padding: SPACING.m,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.grayDC,
        fontSize: FONT_SIZES.medium,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    imagePicker: {
        marginVertical: SPACING.m,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: COLORS.grayLight,
        borderWidth: 1,
        borderColor: COLORS.grayDC,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePreview: {
        width: "100%",
        height: "100%",
    },
    imagePlaceholder: {
        alignItems: 'center',
    },
    placeholderText: {
        color: COLORS.textSecondary,
        marginTop: SPACING.s,
    },
    spacer: {
        height: SPACING.m,
    }
});
