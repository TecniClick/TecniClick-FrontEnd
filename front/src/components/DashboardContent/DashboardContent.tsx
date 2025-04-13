"use client";

import { useAuth } from "@/contexts/authContext";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import UserInterests from "./UserInterests";
import UserAppointments from "./userAppointments";
import ServiceButton from "./ServiceButton";

export default function DashboardContent() {
    const { user } = useAuth();

    return (
        <section className="w-full min-h-screen bg-background px-6 py-10 md:px-[10%] dark:text-white">
            {user ? (
                <div className="max-w-6xl mx-auto flex flex-col gap-8 items-center">
                    {/* Imagen + nombre */}
                    <div className="flex flex-col items-center gap-4">
                        <UserImage imgUrl={user.imgUrl ?? undefined} name={user.name} />
                        <h1 className="text-2xl font-semibold text-center">¡Bienvenido/a {user.name}!</h1>
                    </div>

                    {/* Botón de servicios */}
                    <ServiceButton hasServices={!!user.services} />

                    {/* Info + Intereses */}
                    <div className="flex flex-wrap gap-6 w-full justify-center">
                        <div className="flex-1">
                            <UserInfo
                                email={user.email}
                                phone={user.phone}
                                address={user.address}
                                role={user.role}
                            />
                        </div>
                        {user.interests?.length > 0 && (
                            <div className="flex-1">
                                <UserInterests interests={user.interests} />
                            </div>
                        )}
                    </div>

                    {/* Turnos */}
                    <div className="w-full">
                        <UserAppointments appointments={user.appointments || []} />
                    </div>
                </div>
            ) : (
                <h1 className="text-center text-xl mt-20">Por favor, registrese e inicie sesión</h1>
            )}
        </section>
    );
}
