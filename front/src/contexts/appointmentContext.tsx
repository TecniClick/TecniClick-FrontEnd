"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AppointmentType, AppointmentStatus } from "@/helpers/typeMock";
import { useAuth } from "./authContext";

interface AppointmentsContextType {
    appointments: AppointmentType[];
    refreshAppointments: () => Promise<void>;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider = ({ children }: { children: React.ReactNode }) => {
    const [appointments, setAppointments] = useState<AppointmentType[]>([]);
    const { token, user } = useAuth();

    const fetchAppointments = async () => {
        if (!token || !user) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            // Adaptamos los datos a tu tipo
            const formattedAppointments: AppointmentType[] = data.map((a: AppointmentType) => ({
                id: a.id,
                user: a.user,
                service: a.service,
                date: new Date(a.date),
                status: mapStatus(a.status),
                note: a.note,
            }));

            setAppointments(formattedAppointments);
        } catch (err) {
            console.error("Error cargando turnos:", err);
        }
    };

    // Esta función se encarga de mapear el string recibido al enum correspondiente
    const mapStatus = (statusString: string): AppointmentStatus => {
        switch (statusString) {
            case "pending":
                return AppointmentStatus.PENDING;
            case "confirmed":
                return AppointmentStatus.CONFIRMED;
            case "canceled":
                return AppointmentStatus.CANCELLED;
            default:
                console.warn("Estado desconocido:", statusString);
                return AppointmentStatus.PENDING; // fallback por si llega algo raro
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [token, user]);

    return (
        <AppointmentsContext.Provider value={{ appointments, refreshAppointments: fetchAppointments }}>
            {children}
        </AppointmentsContext.Provider>
    );
};

export const useAppointments = () => {
    const context = useContext(AppointmentsContext);
    if (!context) {
        throw new Error("useAppointments debe usarse dentro de AppointmentsProvider");
    }
    return context;
};
