
import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONT_SIZES, SPACING } from "../constants/theme";

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "outline";
    loading?: boolean;
    disabled?: boolean;
}

export default function Button({
    title,
    onPress,
    variant = "primary",
    loading = false,
    disabled = false,
}: ButtonProps) {
    const getBackgroundColor = () => {
        if (disabled) return COLORS.grayDC;
        switch (variant) {
            case "primary":
                return COLORS.primary;
            case "secondary":
                return COLORS.secondary;
            case "outline":
                return "transparent";
            default:
                return COLORS.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return COLORS.textSecondary;
        switch (variant) {
            case "outline":
                return COLORS.primary;
            default:
                return COLORS.white;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: getBackgroundColor() },
                variant === "outline" && styles.outlineSub,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: SPACING.m,
        paddingHorizontal: SPACING.l,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    outlineSub: {
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    text: {
        fontSize: FONT_SIZES.medium,
        fontWeight: "bold",
    },
});
