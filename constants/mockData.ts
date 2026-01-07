
export interface Recipe {
    id: string;
    categoryId: string;
    title: string;
    image: string;
    time: string;
    calories: string;
    difficulty: "Easy" | "Medium" | "Hard";
    servings: string;
    ingredients: string[];
    steps: string[];
    isMyFood?: boolean;
    height?: number;
}

export const CATEGORIES = [
    {
        id: "my_food",
        title: "My Food",
        image: "https://www.themealdb.com/images/category/pasta.png"
    },
    {
        id: "favorites",
        title: "My Favorites",
        image: "https://www.themealdb.com/images/category/starter.png"
    },
    {
        id: "beef",
        title: "Beef",
        image: "https://www.themealdb.com/images/category/beef.png"
    },
    {
        id: "chicken",
        title: "Chicken",
        image: "https://www.themealdb.com/images/category/chicken.png"
    },
    {
        id: "dessert",
        title: "Dessert",
        image: "https://www.themealdb.com/images/category/dessert.png"
    },
    {
        id: "lamb",
        title: "Lamb",
        image: "https://www.themealdb.com/images/category/lamb.png"
    },
    {
        id: "miscellaneous",
        title: "Misc",
        image: "https://www.themealdb.com/images/category/miscellaneous.png"
    },
];

export const MOCK_RECIPES: Recipe[] = [
    {
        id: "1",
        categoryId: "beef",
        title: "Beef and Mustard Pie",
        image: "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
        time: "35 Mins",
        calories: "103 Cal",
        difficulty: "Medium",
        servings: "03 Servings",
        ingredients: [
            "1kg Beef",
            "2 tbs Plain Flour",
            "2 tbs Rapeseed Oil",
            "200ml Red Wine",
            "400ml Beef Stock",
        ],
        steps: [
            "Preheat the oven to 150C/300F/Gas 2.",
            "Toss the beef and flour together in a bowl with some salt and black pepper.",
            "Heat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole.",
            "Fry until browned on each side, then remove and set aside.",
            "Repeat with the remaining oil and beef.",
            "Return the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock and bring to the boil.",
            "Cover and place in the oven for 3-4 hours, or until the beef is tender and the sauce is thick.",
        ],
        height: 220,
    },
    {
        id: "2",
        categoryId: "chicken",
        title: "Teriyaki Chicken Casserole",
        image: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
        time: "45 Mins",
        calories: "320 Cal",
        difficulty: "Easy",
        servings: "04 Servings",
        ingredients: [
            "3/4 cup Soy Sauce",
            "1/2 cup Water",
            "1/4 cup Brown Sugar",
            "1/2 tsp Ground Ginger",
            "1/2 tsp Minced Garlic",
            "4 tbs Cornstarch",
            "2 Chicken Breasts",
        ],
        steps: [
            "Preheat oven to 350 deg F (175 deg C).",
            "In a small saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.",
            "Place chicken pieces in a lightly greased 9x13 inch baking dish. Brush chicken with the sauce. Turn pieces over, and brush again.",
            "Bake in the preheated oven for 30 minutes. Turn pieces over, and bake for another 30 minutes, until chicken juices run clear.",
        ],
        height: 160,
    },
    {
        id: "3",
        categoryId: "dessert",
        title: "Apple & Blackberry Crumble",
        image: "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
        time: "40 Mins",
        calories: "450 Cal",
        difficulty: "Medium",
        servings: "06 Servings",
        ingredients: [
            "120g Plain Flour",
            "60g Caster Sugar",
            "60g Butter",
            "300g Braeburn Apples",
            "30g Butter",
        ],
        steps: [
            "Heat oven to 190C/170C fan/gas 5.",
            "Tip the flour and sugar into a large bowl.",
            "Add the butter, then rub into the flour using your fingertips to make a light breadcrumb texture. Do not overwork it or the crumble will become heavy.",
            "Sprinkle the mixture evenly over a baking sheet and bake for 15 mins or until lightly coloured.",
        ],
        height: 200,
    },
    {
        id: "4",
        categoryId: "lamb",
        title: "Lamb Tzatziki Burgers",
        image: "https://www.themealdb.com/images/media/meals/k420tj1585565244.jpg",
        time: "50 Mins",
        calories: "580 Cal",
        difficulty: "Hard",
        servings: "04 Servings",
        ingredients: [
            "500g Lamb Mince",
            "1/2 Onion",
            "2 cloves Garlic",
            "1 tsp Cumin",
            "4 Burger Buns",
        ],
        steps: [
            "Mix the lamb, onion, garlic and season well.",
            "Shape into 4 burgers.",
            "Cook for 6-8 mins on each side until cooked through.",
            "Serve in buns with tzatziki.",
        ],
        height: 260,
    },
];
