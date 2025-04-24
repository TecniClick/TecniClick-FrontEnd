"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AppointmentType, AppointmentStatus } from "@/helpers/typeMock";
import { useAuth } from "./authContext";
import {
    getMyAppointments,
    getMyProvidedAppointments,
} from "@/services/appointmentService";

interface AppointmentsContextType {
    appointments: AppointmentType[];
    refreshAppointments: () => Promise<void>;
    cancelAppointment: (id: string) => Promise<void>;
    approveAppointment: (id: string) => Promise<void>;
    getAppointmentById: (id: string) => Promise<AppointmentType | undefined>;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
    undefined
);

export const AppointmentsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [appointments, setAppointments] = useState<AppointmentType[]>([]);
    const { token, user, isLoadingAuth } = useAuth(); // ← añadí isLoadingAuth si lo tenés

    /* ---------------- helpers ---------------- */
    const mapStatus = (statusString: string): AppointmentStatus => {
        switch (statusString) {
            case "pending":
                return AppointmentStatus.PENDING;
            case "confirmed":
                return AppointmentStatus.CONFIRMED;
            case "rescheduled":
                return AppointmentStatus.RESCHEDULED;
            case "cancelled":
                return AppointmentStatus.CANCELLED;
            case "completed":
                return AppointmentStatus.COMPLETED;
            default:
                console.warn(
                    `Estado desconocido: ${statusString}. Se asignará el estado 'pending'`
                );
                return AppointmentStatus.PENDING;
        }
    };

    /* ---------------- fetch principal ---------------- */
    const fetchAppointments = async () => {
        if (!token || !user) {
            setAppointments([]); // limpie si está deslog
            return;
        }

        try {
            const raw =
                user.serviceProfile?.status === "active"
                    ? await getMyProvidedAppointments() // proveedor
                    : await getMyAppointments(); // cliente

            const data: AppointmentType[] = raw.map((a: any) => ({
                id: a.id,
                user: a.users ?? a.user, // users para proveedor, user para cliente
                provider: a.provider,
                date: new Date(a.date),
                appointmentStatus: mapStatus(a.appointmentStatus),
                additionalNotes: a.additionalNotes,
                review: a.review,
            }));

            setAppointments(data);
        } catch (err) {
            console.error("Error cargando turnos:", err);
        }
    };

    /* ---------------- efecto de carga ---------------- */
    useEffect(() => {
        // mientras AuthContext no terminó de validar sesión, no dispares nada
        if (isLoadingAuth) return;

        // si token es null / "", limpia y salí
        if (!token) {
            setAppointments([]);
            return;
        }

        // token y user listos → traigo turnos
        fetchAppointments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingAuth, token, user]);

    /* ---------- acciones cancel / approve / byId ---------- */
    const cancelAppointment = async (id: string) => {
        if (!token) return;
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/appointments/cancel/${id}`,
                {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            await fetchAppointments();
        } catch (err) {
            console.error("Error cancelando turno:", err);
        }
    };

    const approveAppointment = async (id: string) => {
        if (!token) return;
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/appointments/confirm/${id}`,
                {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            await fetchAppointments();
        } catch (err) {
            console.error("Error confirmando turno:", err);
        }
    };

    const getAppointmentById = async (
        id: string
    ): Promise<AppointmentType | undefined> => {
        if (!token) return;
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) {
                console.error("Error al obtener el turno:", await res.text());
                return;
            }
            const data = await res.json();
            return {
                id: data.id,
                user: data.users,
                provider: data.provider,
                date: new Date(data.date),
                appointmentStatus: mapStatus(data.appointmentStatus),
                additionalNotes: data.additionalNotes,
                review: data.review,
            };
        } catch (err) {
            console.error("Error trayendo turno por ID:", err);
        }
    };

    return (
        <AppointmentsContext.Provider
            value={{
                appointments,
                refreshAppointments: fetchAppointments,
                cancelAppointment,
                approveAppointment,
                getAppointmentById,
            }}
        >
            {children}
        </AppointmentsContext.Provider>
    );
};

export const useAppointments = () => {
    const ctx = useContext(AppointmentsContext);
    if (!ctx) throw new Error("useAppointments debe usarse dentro de AppointmentsProvider");
    return ctx;
};
