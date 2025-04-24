"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppointmentType, AppointmentStatus } from "@/helpers/typeMock";
import { useAuth } from "@/contexts/authContext";
import { useAppointments } from "@/contexts/appointmentContext";
import { FaTimes } from "react-icons/fa";

export default function UserAppointments({ appointments }: { appointments: AppointmentType[] }) {
    const { user } = useAuth();
    const { cancelAppointment, getAppointmentById } = useAppointments();

    const isProvider = user?.serviceProfile?.status === "active";

    /** estado principal que se renderiza */
    const [appointmentsState, setAppointmentsState] = useState<AppointmentType[]>([]);

    /** ---------- helpers ---------- */
    const getStatusPriority = (s: AppointmentStatus) =>
        s === AppointmentStatus.CONFIRMED ? 1 :
            s === AppointmentStatus.COMPLETED ? 2 :
                s === AppointmentStatus.CANCELLED ? 3 : 4;

    const orderArray = (arr: AppointmentType[]) =>
        [...arr].sort((a, b) => {
            const pa = getStatusPriority(a.appointmentStatus);
            const pb = getStatusPriority(b.appointmentStatus);
            return pa !== pb ? pa - pb
                : new Date(a.date).getTime() - new Date(b.date).getTime();
        });

    const translateStatus = (s: AppointmentStatus) =>
        s === AppointmentStatus.PENDING ? "Pendiente" :
            s === AppointmentStatus.CONFIRMED ? "Confirmado" :
                s === AppointmentStatus.RESCHEDULED ? "Reprogramado" :
                    s === AppointmentStatus.CANCELLED ? "Cancelado" :
                        s === AppointmentStatus.COMPLETED ? "Completado" : "Desconocido";

    /** ---------- cargar / enriquecer turnos ---------- */
    useEffect(() => {
        const load = async () => {
            if (!isProvider) {
                setAppointmentsState(orderArray(appointments));
                return;
            }

            // para proveedores traemos la versión completa
            const enriched = await Promise.all(
                appointments.map(async (appt) => {
                    try {
                        const full = await getAppointmentById(appt.id);
                        return full ?? appt;
                    } catch {
                        return appt;
                    }
                })
            );
            setAppointmentsState(orderArray(enriched));
        };

        load();
    }, [appointments, isProvider, getAppointmentById]);

    /** ---------- cancelar turno ---------- */
    const handleCancel = (id: string) =>
        toast.warning("¿Seguro que quieres cancelar este turno?", {
            action: {
                label: "Sí, cancelar",
                onClick: async () => {
                    try {
                        await cancelAppointment(id);
                        setAppointmentsState((prev) =>
                            orderArray(
                                prev.map((a) =>
                                    a.id === id ? { ...a, appointmentStatus: AppointmentStatus.CANCELLED } : a
                                )
                            )
                        );
                        toast.success("Turno cancelado correctamente");
                    } catch {
                        toast.error("Hubo un error al cancelar el turno");
                    }
                },
            },
        });

    /** ---------- render ---------- */
    return (
        <div className="w-full bg-quaternary/40 dark:bg-quinary/40 p-4 rounded-2xl border borders shadow-md">
            <h2 className="text-lg font-bold mb-3 border-b pb-1">
                {isProvider ? "Turnos que te reservaron" : "Mis turnos agendados"}
            </h2>

            {appointmentsState.length ? (
                <div className="space-y-2">
                    {appointmentsState.map((appointment) => (
                        <div key={appointment.id} className="p-2 bg-white dark:bg-black bg-opacity-10 rounded shadow-sm">
                            {/* encabezado */}
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p><strong>Fecha y Hora:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                                    <p><strong>Estado:</strong> {translateStatus(appointment.appointmentStatus)}</p>
                                </div>

                                <div className="flex gap-2 mt-2">
                                    {appointment.appointmentStatus === AppointmentStatus.CANCELLED ? (
                                        <span className="text-red-500 font-semibold">Turno cancelado</span>
                                    ) : (
                                        <button
                                            className="px-4 py-1 bg-red-600 text-white rounded"
                                            onClick={() => handleCancel(appointment.id)}
                                            title="Cancelar turno"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* datos visibles solo a proveedores */}
                            {isProvider && (
                                <>
                                    <p><strong>Cliente:</strong> {appointment.user?.name ?? "—"}</p>
                                    <p><strong>Dirección:</strong> {appointment.user?.address ?? "—"}</p>
                                    <p><strong>Teléfono:</strong> {appointment.user?.phone ?? "—"}</p>
                                    <p><strong>Notas adicionales:</strong> {appointment.additionalNotes || "—"}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm italic">Aún no tienes turnos agendados.</p>
            )}
        </div>
    );
}
