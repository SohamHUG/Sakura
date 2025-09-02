export type DietaryTag = "vegan" | "vegetarian" | "vegetarian-option" | "gluten-free" | "spicy" | "grill" | "signature" | "new";
export type Category =
    | "Entrées"
    | "Sushi & Sashimi"
    | "Makis & Rolls"
    | "Plats Chauds"
    | "Accompagnements"
    | "Desserts"
    | "Boissons";

export type MenuItem = {
    id: string;
    name: string;
    jp?: string; // Japanese name
    description?: string;
    price: number; // in EUR
    category: Category;
    tags?: DietaryTag[];
    spicyLevel?: 0 | 1 | 2 | 3; // 0 = not spicy
};

export const TAG_LABEL: Record<DietaryTag, string> = {
    vegan: "Vegan",
    vegetarian: "Végétarien",
    "vegetarian-option": "Option végétarienne",
    "gluten-free": "Sans gluten",
    spicy: "Épicé",
    grill: "Grillé",
    signature: "Signature",
    new: "Nouveau",
};