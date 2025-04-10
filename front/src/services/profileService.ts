import { ServiceProfileType } from "@/helpers/typeMock";
import { servicesMock } from "@/helpers/dataMock";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MODE = process.env.NEXT_PUBLIC_MODE;

export const getServiceProfile = async (): Promise<ServiceProfileType[]> => {
    console.log("ENV VARIABLES:", process.env);

    try {
        if (MODE === "developer") {
            // En modo desarrollo, siempre se devuelve el mock
            return servicesMock;
        }

        if (MODE === "production") {
            const response = await fetch(`${API_URL}/services`, { cache: "no-cache" });

            if (!response.ok) {
                console.warn("Respuesta no exitosa del servidor, usando mock...");
                return servicesMock;
            }

            const data = await response.json();

            // Si no hay datos válidos, también devolvemos el mock
            if (!Array.isArray(data) || data.length === 0) {
                console.warn("Datos inválidos o vacíos, usando mock...");
                return servicesMock;
            }

            return data;
        }
    } catch (error) {
        console.error("Error en la conexión con el backend:", error);
        return servicesMock;
    }

    // Por si MODE no está definido correctamente
    console.warn("MODE desconocido, devolviendo mock por defecto...");
    return servicesMock;
};


export const getServiceProfileById = async (id: string): Promise<ServiceProfileType | null> => {
    // TODO: Implementar la lógica para obtener el perfil del servicio por id

    try {
        if (MODE === "developer") {
            // ! Mock
            return servicesMock.find((service) => service.id === id) || null;
        } else if (MODE === "production") {
            const response = await fetch(`${API_URL}/services/${id}`, { cache: "no-cache" });
            return await response.json() || null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}

export const getServiceProfileByCategory = async (id: string): Promise<ServiceProfileType[] | null> => {
    // TODO: Implementar la lógica para obtener el perfil del servicio por categoría

    try {
        if (MODE === "developer") {
            // ! Mock
            return servicesMock.filter((service) => service.category.id === id) || null;
        } else if (MODE === "production") {
            const response = await fetch(`${API_URL}/services?category=${id}`, { cache: "no-cache" });
            return await response.json() || null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}

export const updateServiceProfile = async (service: ServiceProfileType): Promise<ServiceProfileType | null> => {
    // TODO: Implementar la lógica para actualizar el perfil del servicio

    try {
        if (MODE === "developer") {
            // ! Mock
            return servicesMock.find((service) => service.id === service.id) || null;
        } else if (MODE === "production") {
            const response = await fetch(`${API_URL}/services/${service.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(service),
            });
            return await response.json() || null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}

export const deleteServiceProfile = async (id: string): Promise<boolean> => {
    // TODO: Implementar la lógica para eliminar el perfil del servicio

    try {
        if (MODE === "developer") {
            // ! Mock
            return servicesMock.some((service) => service.id === id);
        } else if (MODE === "production") {
            const response = await fetch(`${API_URL}/services/${id}`, {
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

export const getFilteredServices = async (query: string): Promise<ServiceProfileType[]> => {
    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    try {
        if (MODE === "developer") {
            return servicesMock.filter(service =>
                normalizeString(service.title).includes(normalizeString(query))
            );
        } else if (MODE === "production") {
            const response = await fetch(`${API_URL}/services?search=${query}`, { cache: "no-cache" });
            const data = await response.json();


            return data.filter((service: ServiceProfileType) =>
                normalizeString(service.title).includes(normalizeString(query))
            ) || [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }

    return [];
};

