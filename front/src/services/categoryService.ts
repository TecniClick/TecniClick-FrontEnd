import { CategoryType } from "@/helpers/typeMock";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MODE = process.env.NEXT_PUBLIC_MODE;

export const getCategories = async (): Promise<CategoryType[]> => {
    try {
            const response = await fetch(`${API_URL}/categories`, { cache: "no-cache" });
            return await response.json() || [];
    } catch (error) {
        console.error(error);
        return [];
    }

    return [];
}

export const getCategoryById = async (id: string): Promise<CategoryType | null> => {
    try { if (MODE === "production") {
            const response = await fetch(`${API_URL}/categories/${id}`, { cache: "no-cache" });
            return await response.json() || null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}

