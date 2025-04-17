"use client";

import { useAuth } from "@/contexts/authContext";
import { useAppointments } from "@/contexts/appointmentContext";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import UserInterests from "./UserInterests";
import UserAppointments from "./userAppointments";
import ServiceButton from "./ServiceButton";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function DashboardContent() {
    const { user, token } = useAuth();
    const { appointments, refreshAppointments } = useAppointments();
    const { data: session, status } = useSession();

    const isLoggedIn = !!user || status === "authenticated";

    // Para datos de usuario desde Google
    const googleUser = session?.user;

    useEffect(() => {
        if ((user && token) || status === "authenticated") {
            refreshAppointments();
        }
    }, [token, user, status, refreshAppointments]);

    return (
        <section className="w-full min-h-screen bg-background px-6 py-10 md:px-[10%] dark:text-white">
            {isLoggedIn ? (
                <div className="max-w-6xl mx-auto flex flex-col gap-8 items-center">
                    {/* Imagen + nombre */}
                    <div className="flex flex-col items-center gap-4">
                        <UserImage
                            imgUrl={user?.imgUrl ?? googleUser?.image ?? undefined}
                            name={user?.name ?? googleUser?.name ?? "Usuario"}
                        />
                        <h1 className="text-2xl font-semibold text-center">
                            ¡Bienvenido/a {user?.name ?? googleUser?.name}!
                        </h1>
                    </div>

                    {/* Botón de servicios (solo si está logueado por backend) */}
                    {user && (
                        <ServiceButton hasServices={!!user.services} />
                    )}

                    {/* Info + Intereses */}
                    <div className="flex flex-wrap gap-6 w-full justify-center">
                        <div className="flex-1">
                            <UserInfo
                                email={user?.email ?? googleUser?.email ?? ""}
                                phone={user?.phone ?? "No especificado"}
                                address={user?.address ?? "No especificado"}
                            />
                        </div>

                        {Array.isArray(user?.interests) && user!.interests.length > 0 && (
                            <div className="flex-1">
                                <UserInterests interests={user.interests} />
                            </div>
                        )}
                    </div>

                    {/* Turnos */}
                    <div className="w-full">
                        <UserAppointments appointments={appointments || []} />
                    </div>
                </div>
            ) : (
                <h1 className="text-center text-xl mt-20">
                    Por favor, regístrese e inicie sesión
                </h1>
            )}
        </section>
    );
}
