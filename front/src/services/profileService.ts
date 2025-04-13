import { ServiceProfileType, ServiceRequestType, UserType } from "@/helpers/typeMock";
import { servicesMock } from "@/helpers/dataMock";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MODE = process.env.NEXT_PUBLIC_MODE;

export const getServiceProfile = async (): Promise<ServiceProfileType[]> => {
    console.log("ENV VARIABLES:", process.env);

    // TODO: Implementar la lógica para obtener todos los servicios

    try {
        if (MODE === "developer") {
            // ! Mock
            return servicesMock;
        } else if (MODE === "production") {
            const response = await fetch(`${API_URL}/services`, { cache: "no-cache" });
            return await response.json() || [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }

    return [];
}

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

export const createServiceProfile = async (token: string, service: ServiceRequestType): Promise<UserType> => {
    // TODO: Implementar la lógica para actualizar el perfil del servicio

    // try {
        // if (MODE === "developer") {
        //     // ! Mock
        //     return servicesMock.find((service) => service.id === service.id) || null;
        // } else if (MODE === "production") {
            // const res = await fetch(`${API_URL}/service-profile/create`, {
            const res = await fetch(`http://localhost:3000/service-profile/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(service),
            });
            const response = await res.json();
            console.log(response);
            
            if (res.status !== 201) {
                const data: string[] = response.message.split("«");
                throw new Error(data[0]);
            }
            return response;
        // }
    // } catch (error) {
    //     console.error(error);
    //     return null;
    // }

    // return null;
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

