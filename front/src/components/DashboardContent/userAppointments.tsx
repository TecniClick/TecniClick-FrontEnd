import { AppointmentType } from "@/helpers/typeMock";

export default function UserAppointments({ appointments }: { appointments: AppointmentType[] }) {
    return (
        <div className="w-full bg-quaternary/40 dark:bg-quinary/40 p-4 rounded-2xl border borders shadow-md">
            <h2 className="text-lg font-bold mb-3 border-b pb-1">Turnos agendados</h2>
            {appointments.length > 0 ? (
                <div className="space-y-2">
                    {appointments.map((appointment) => (
                        <div key={appointment.id} className="p-2 bg-white dark:bg-black bg-opacity-10 rounded shadow-sm">
                            <p>Turno ID: {appointment.id}</p>
                            <p>Dia y Hora: {new Date(appointment.date).toLocaleDateString()}</p>
                            <p>Estado: {appointment.appointmentStatus}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm italic">Aún no tienes turnos agendados.</p>
            )}
        </div>
    );
}
