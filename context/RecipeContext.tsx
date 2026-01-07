
import React, { createContext, useContext, useState } from "react";
import { MOCK_RECIPES, Recipe } from "../constants/mockData";

interface RecipeContextType {
    recipes: Recipe[];
    favorites: string[];
    toggleFavorite: (id: string) => void;
    addRecipe: (recipe: Recipe) => void;
    updateRecipe: (recipe: Recipe) => void;
    deleteRecipe: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) => {
            if (prev.includes(id)) {
                return prev.filter((favId) => favId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const addRecipe = (recipe: Recipe) => {
        setRecipes((prev) => [recipe, ...prev]);
    };

    const updateRecipe = (updatedRecipe: Recipe) => {
        setRecipes((prev) =>
            prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
        );
    };

    const deleteRecipe = (id: string) => {
        setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    };

    const isFavorite = (id: string) => favorites.includes(id);

    return (
        <RecipeContext.Provider
            value={{
                recipes,
                favorites,
                toggleFavorite,
                addRecipe,
                updateRecipe,
                deleteRecipe,
                isFavorite,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipes = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error("useRecipes must be used within a RecipeProvider");
    }
    return context;
};
