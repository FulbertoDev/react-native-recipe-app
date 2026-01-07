
import { Image } from "expo-image";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CATEGORIES } from "../constants/mockData";
import { COLORS, FONT_SIZES, SPACING } from "../constants/theme";

interface CategoryBarProps {
    selectedCategory: string;
    onSelectCategory: (id: string) => void;
}

export default function CategoryBar({
    selectedCategory,
    onSelectCategory,
}: CategoryBarProps) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {CATEGORIES.map((category) => {
                    const isSelected = selectedCategory === category.id;
                    return (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryItem}
                            activeOpacity={0.7}
                            onPress={() => onSelectCategory(category.id)}
                        >
                            <View style={[
                                styles.imageContainer,
                                isSelected && styles.selectedImageContainer
                            ]}>
                                <Image
                                    source={{ uri: category.image }}
                                    style={styles.image}
                                    contentFit="cover"
                                />
                            </View>
                            <Text
                                style={[
                                    styles.categoryText,
                                    isSelected && styles.selectedCategoryText,
                                ]}
                            >
                                {category.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: SPACING.m,
    },
    scrollContent: {
        paddingHorizontal: SPACING.m,
        gap: SPACING.l,
    },
    categoryItem: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: COLORS.grayDC,
        backgroundColor: COLORS.grayLight,
        overflow: 'hidden',
        marginBottom: SPACING.s,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    selectedImageContainer: {
        borderColor: COLORS.primary,
        borderWidth: 2,
        backgroundColor: COLORS.white,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    categoryText: {
        fontSize: FONT_SIZES.small,
        color: COLORS.textSecondary,
        textAlign: "center",
    },
    selectedCategoryText: {
        color: COLORS.primary,
        fontWeight: "bold",
    },
});
