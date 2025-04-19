import { ServiceProfileType, ServiceRequestType, UserType } from "@/helpers/typeMock";
import { servicesMock } from "@/helpers/dataMock";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MODE = process.env.NEXT_PUBLIC_MODE;

export const getServiceProfile = async (): Promise<ServiceProfileType[]> => {
    try {
        if (MODE === "developer") {
            return servicesMock;
        }

        if (MODE === "production") {
            const response = await fetch(`${API_URL}/service-profile`, { cache: "no-cache" });
            if (!response.ok) {
                console.warn("Respuesta no exitosa del servidor, usando mock...");
                return servicesMock;
            }

            const data = await response.json();
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

    console.warn("MODE desconocido, devolviendo mock por defecto...");
    return servicesMock;
};

export const getServiceProfileById = async (id: string): Promise<ServiceProfileType | null> => {
    try {
        console.log("Consultando ID de perfil:", id, " (Ambiente: ", typeof window !== "undefined" ? "cliente" : "servidor", ")");
        if (MODE === "developer") {
            return servicesMock.find((service) => service.id === id) || null;
        } else if (MODE === "production") {
            const response = await fetch(`${API_URL}/service-profile/${id}`, { cache: "no-cache" });
            return await response.json() || null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
};

export const getServiceProfileByCategory = async (categoryId: string): Promise<ServiceProfileType[]> => {
    const allServices = await getServiceProfile();
    return allServices.filter(service => service.category?.id === categoryId);
};

export const createServiceProfile = async (token: string, service: ServiceRequestType): Promise<UserType> => {
    try {
        const res = await fetch(`${API_URL}/service-profile/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(service),
        });

        const response = await res.json();

        if (res.status !== 201) {
            const data: string[] = response.message.split("«");
            throw new Error(data[0]);
        }

        return response;
    } catch (error) {
        console.error("Error al crear el perfil de servicio:", error);
        throw error;
    }
};

export const updateServiceProfile = async (service: ServiceProfileType): Promise<ServiceProfileType | null> => {
    try {
        if (MODE === "developer") {
            return servicesMock.find((s) => s.id === service.id) || null;
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
};

export const updateServiceProfileToPremium = async (id: string, ammount: number): Promise<void> => {
    try {
        // if (MODE === "developer") {
        //     return servicesMock.find((s) => s.id === service.id) || null;
        // } else if (MODE === "production") {
            const res = await fetch(`${API_URL}/payments/create-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, ammount }),
            });

            const response = await res.json();

            if (res.status !== 201) {
                const data: string[] = response.message.split("«");
                throw new Error(data[0]);
            }
    
            return response;
        } catch (error) {
            console.error("Error al cargar la tarjeta:", error);
        }
};

export const deleteServiceProfile = async (id: string): Promise<boolean> => {
    try {
        if (MODE === "developer") {
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
};

export const getFilteredServices = async (query: string): Promise<ServiceProfileType[]> => {
    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    try {
        if (MODE === "developer") {
            return servicesMock.filter(service =>
                normalizeString(service.serviceTitle).includes(normalizeString(query))
            );
        } else if (MODE === "production") {
            const response = await fetch(`${API_URL}/services?search=${query}`, { cache: "no-cache" });
            const data = await response.json();

            return data.filter((service: ServiceProfileType) =>
                normalizeString(service.serviceTitle).includes(normalizeString(query))
            ) || [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }

    return [];
};
