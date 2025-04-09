'use client';
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { toast } from "sonner";

const MOCK_MODE = true;

const AppointmentForm = () => {
    const router = useRouter();
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const providerId = searchParams.get("id");

    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [mockAppointment, setMockAppointment] = useState<any>(null); // Guarda el turno simulado

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const mockUser = { id: "mock-user" };
        const mockProviderId = "mock-provider";

        const realUser = MOCK_MODE ? mockUser : user;
        const realProviderId = MOCK_MODE ? mockProviderId : providerId;

        if (!realUser || !realProviderId) {
            toast.error("Error de autenticación o proveedor no encontrado.");
            return;
        }

        const selectedDate = new Date(date);
        const day = selectedDate.getDay();
        const hour = selectedDate.getHours();

        if (day === 0) {
            toast.error("No se pueden reservar turnos los domingos.");
            return;
        }

        if (hour < 8 || hour >= 20) {
            toast.error("Solo se pueden reservar turnos entre las 8:00 y las 20:00 hs.");
            return;
        }

        const payload = {
            date: new Date(date).toISOString(),
            userId: realUser.id,
            providerId: realProviderId,
            additionalNotes: notes,
        };

        try {
            if (MOCK_MODE) {
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula delay

                const mockResponse = {
                    id: "mock123",
                    ...payload,
                };

                setMockAppointment(mockResponse); // Guarda para mostrar resumen
                console.log("✅ Mock Turno creado:", mockResponse);
            } else {
                const res = await fetch("/appointments/createAppointment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) throw new Error("No se pudo crear el turno");

                router.push("/dashboard");
            }

            toast.success("Turno creado con éxito. Te llegará un correo con los detalles.");
        } catch (err) {
            toast.error("Hubo un error al crear el turno");
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-semibold">Reservar Turno</h2>

                <div>
                    <label className="block text-sm font-medium">Fecha y hora</label>
                    <input
                        type="datetime-local"
                        className="w-full p-2 border rounded"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Indica tu problema o consulta</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder=""
                    />
                </div>

                <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                    Confirmar turno
                </button>
            </form>

            {MOCK_MODE && mockAppointment && (
                <div className="mt-6 p-4 border rounded bg-gray-100">
                    <h3 className="text-lg font-medium mb-2">🧾 Resumen del Turno (Mock)</h3>
                    <p><strong>ID:</strong> 3</p>
                    <p><strong>Fecha:</strong> {new Date(mockAppointment.date).toLocaleString()}</p>
                    <p><strong>Usuario:</strong> Pepe Pepita</p>
                    <p><strong>Proveedor:</strong> Raul Perez</p>
                    <p><strong>Notas:</strong> {mockAppointment.additionalNotes || "Sin notas"}</p>
                </div>
            )}
        </div>
    );
};

export default AppointmentForm;
