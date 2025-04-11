//Toda las funciones para conectar con los endpoints del back//

import { AppointmentType } from "@/helpers/typeMock";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MODE = process.env.NEXT_PUBLIC_MODE;


interface NewAppointmentPayload {
    date: string;
    userId: string;
    providerId: string;
    additionalNotes?: string;
}

export const newAppointment = async (
    payload: NewAppointmentPayload
): Promise<AppointmentType> => {
    try {
        const response = await fetch(`${API_URL}/appointments/createAppointment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al crear el turno");
        }

        const createdAppointment: AppointmentType = await response.json();
        return createdAppointment;
    } catch (error) {
        console.error("Error en newAppointment:", error);
        throw error;
    }
};