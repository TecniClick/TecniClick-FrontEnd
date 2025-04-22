import { AppointmentType } from "@/helpers/typeMock";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface NewAppointmentPayload {
    date: string;
    providerId: string;
    additionalNotes?: string;
}

export const newAppointment = async (
    payload: NewAppointmentPayload,
    token: string
): Promise<AppointmentType> => {
    if (!token) throw new Error("Token requerido");

    const response = await fetch(`${API_URL}/appointments/createAppointment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json(); // ✅ solo una vez
    console.log("Respuesta del servidor:", data);

    if (!response.ok) {
        throw new Error(data.message || "Error al crear el turno");
    }

    return data;
};


export const getUserAppointments = async (token: string) => {
    const response = await fetch(`${API_URL}/appointments/userAppointments`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error al obtener turnos");
    return data;
};

