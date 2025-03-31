import { UserType } from "@/helpers/typeMock";
import { usersMock } from "@/helpers/dataMock";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MODE = process.env.NEXT_PUBLIC_MODE;

export const getUsers = async () : Promise<UserType[]> => {
    // TODO: Implementar la lógica para obtener todos los usuarios
    try {
        if(MODE === "developer") {
            // ! Mock
            return usersMock;
        } else if(MODE === "production") {
            const response = await fetch(`${API_URL}/users`, { cache: "no-cache" });
            return await response.json() || [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }

    return [];
}

export const getUserById = async (id: string) : Promise<UserType | null> => {
    // TODO: Implementar la lógica para obtener el perfil del usuario por id
    try {
        if(MODE === "developer") {
            // ! Mock
            return usersMock.find((user) => user.id === id) || null;
        } else if(MODE === "production") {
            const response = await fetch(`${API_URL}/users/${id}`, { cache: "no-cache" });
            return await response.json() || null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}

export const getUserByEmail = async (email: string) : Promise<UserType | null> => {
    // TODO: Implementar la lógica para obtener el perfil del usuario por email
    try {
        if(MODE === "developer") {
            // ! Mock
            return usersMock.find((user) => user.email === email) || null;
        } else if(MODE === "production") {
            const response = await fetch(`${API_URL}/users/${email}`, { cache: "no-cache" });
            return await response.json() || null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}

export const updateUser = async (id: string, user: UserType) : Promise<boolean> => {
    // TODO: Implementar la lógica para actualizar el perfil del usuario por id
    try {
        if(MODE === "developer") {
            // ! Mock
            return true;
        } else if(MODE === "production") {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            return await response.json() || false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }

    return false;
}

export const deleteUser = async (id: string) : Promise<boolean> => {
    // TODO: Implementar la lógica para eliminar el perfil del usuario por id
    try {
        if(MODE === "developer") {
            // ! Mock
            return true;
        } else if(MODE === "production") {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: "DELETE",
            });
            return await response.json() || false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }

    return false;
}
