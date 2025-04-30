import { galleriesType, ServiceProfileType, ServiceRequestType, SubscriptionType } from "@/helpers/typeMock";
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

export const getServiceProfileById = async (
    id: string
  ): Promise<ServiceProfileType | null> => {
    try {
      console.log(
        "Consultando ID de perfil:",
        id,
        "(Ambiente:",
        typeof window !== "undefined" ? "cliente" : "servidor",
        ")"
      );
  
      if (MODE === "developer") {
        return servicesMock.find((service) => service.id === id) || null;
      }
  
      if (MODE === "production") {
        const response = await fetch(`${API_URL}/service-profile/${id}`, {
          cache: "no-cache",
          next: { revalidate: 0 }, // ← Esto es útil en Next.js App Router
        });
  
        if (!response.ok) {
          console.error("Error al consultar el perfil:", response.statusText);
          return null;
        }
  
        const data = await response.json();
        return data || null;
      }
    } catch (error) {
      console.error("Error en getServiceProfileById:", error);
      return null;
    }
  
    return null;
  };
  

export const getServiceProfileByCategory = async (categoryId: string): Promise<ServiceProfileType[]> => {
    const allServices = await getServiceProfile();
    return allServices.filter(service => service.category?.id === categoryId);
};

export const createServiceProfile = async (
    token: string,
    service: ServiceRequestType,
    profilePicture: File, // Ahora esto es un File
    images: galleriesType // { id_document: File[], certificate: File[], gallery: File[] }
  ): Promise<ServiceProfileType> => {
    try {
      // 1. Crear perfil
      const providerRes = await fetch(`${API_URL}/service-profile/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(service),
      });
  
      const provider = await providerRes.json();
      const serviceProfileId = provider.id;
  
      // 2. Cargar foto de perfil
      const pictureForm = new FormData();
      pictureForm.append("file", profilePicture);
  
      const uploadPicture = fetch(`${API_URL}/media/profile-picture/${serviceProfileId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: pictureForm,
      });
  
      // 3. Función utilitaria para construir una carga condicional
      const uploadFiles = (files: File[], type: string) => {
        if (!files || files.length === 0) return null;
  
        const form = new FormData();
        files.forEach(file => form.append("files", file));
  
        return fetch(`${API_URL}/media/upload/${serviceProfileId}?type=${type}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        });
      };
  
      const idDocumentsPromise = uploadFiles(images.id_document, "id_document"); // obligatorio
      const certificatePromise = images.certificate.length > 0
        ? uploadFiles(images.certificate, "certificate")
        : null;
      const galleryPromise = images.gallery.length > 0
        ? uploadFiles(images.gallery, "gallery")
        : null;
  
      // 4. Enviar todo en paralelo
      const uploads = [
        { name: "profilePicture", promise: uploadPicture },
        { name: "id_document", promise: idDocumentsPromise },
        { name: "certificate", promise: certificatePromise },
        { name: "gallery", promise: galleryPromise },
      ].filter((u): u is { name: string; promise: Promise<Response> } => u.promise !== null);
      
      const results = await Promise.allSettled(uploads.map(u => u.promise));
      
      const errors: string[] = [];
      
      results.forEach((result, index) => {
        const name = uploads[index].name;
      
        if (result.status === "rejected") {
          errors.push(`Falló la carga de ${name}: ${result.reason}`);
        } else if (!result.value.ok) {
          errors.push(`Falló la carga de ${name}: ${result.value.statusText}`);
        }
      });
      
      if (errors.length > 0) {
        console.error(errors.join("\n"));
        // Opcional: hacer rollback aquí (ej: DELETE /service-profile/${serviceProfileId})
        throw new Error(`Error al cargar archivos:\n${errors.join("\n")}`);
      }      
  
      return provider;
  
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
        throw error;
    }
    return null;
};

export const updateServiceProfileToPremium = async (id: string, amount: number, token: string): Promise<SubscriptionType> => {
    try {
        // if (MODE === "developer") {
        //     return servicesMock.find((s) => s.id === service.id) || null;
        // } else if (MODE === "production") {
            const res = await fetch(`${API_URL}/orders/create-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id, amount }),
            });

            const response = await res.json();
            
            if (res.status !== 201) {
                throw new Error(response.message);
            }
    
            return response;
        } catch (error) {
            console.error("Error al cargar la tarjeta:", error);
            throw error;
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
