"use client";

import { useAuth } from "@/contexts/authContext";
import { useAppointments } from "@/contexts/appointmentContext";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import UserInterests from "./UserInterests";
import UserAppointments from "./userAppointments";
import ServiceButton from "./ServiceButton";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardContent() {
    const { user, token } = useAuth();
    const { refreshAppointments } = useAppointments();

    const isLoggedIn = !!user;

    useEffect(() => {
        if (user && token) {
            refreshAppointments();
        }
    }, [token, user, refreshAppointments]);

    let params: [string, string] = ["/login", "Inicie sesión primero"];

    if (!user?.serviceProfile) {
        params = ["/provider-edit", "Ofrecer un servicio"];
    } else if (user.serviceProfile.status === "pending") {
        params = ["/dashboard", "Su solicitud está en revisión"];
    } else if (user.serviceProfile.status === "rejected") {
        params = ["/provider-edit", "Solicitud rechazada, enviar otra modificada"];
    } else if (
        user.serviceProfile.status === "active" &&
        (!user.serviceProfile.subscription || user.serviceProfile.subscription.status !== "active")
    ) {
        params = ["/provider-premium", "Hazte Premium"];
    } else if (
        user.serviceProfile.subscription?.status === "active" &&
        user.serviceProfile.subscription.expirationDate
    ) {
        const expiration = new Date(user.serviceProfile.subscription.expirationDate);
        const now = new Date();

        if (expiration < now) {
            params = ["/provider-premium", "Suscripción vencida, renová tu plan"];
        } else {
            const formatted = expiration.toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
            params = ["/dashboard", `Perfil Premium ✅ - Vence el ${formatted}`];
        }
    }

    return (
        <section className="w-full min-h-screen bg-background px-6 py-10 md:px-[10%] dark:text-white">
            {isLoggedIn ? (
                <div className="max-w-6xl mx-auto flex flex-col gap-8 items-center">

                    <div className="flex flex-col items-center gap-4">
                        <UserImage
                            imgUrl={user?.serviceProfile?.profilePicture ?? undefined}
                            name={user?.name ?? "Usuario"}
                        />
                        <h1 className="text-2xl font-semibold text-center">
                            ¡Bienvenido/a {user?.name}!
                        </h1>
                    </div>

                    {user && (
                        <>
                            <ServiceButton params={params} />

                            {user?.serviceProfile?.id && (
                                <Link
                                    href="/update-provider"
                                    className="px-6 py-2 rounded-lg bg-quaternary dark:bg-quinary text-white font-semibold hover:scale-105 transition-all text-center"
                                >
                                    Editar perfil de servicio
                                </Link>
                            )}
                        </>
                    )}

                    <div className="flex flex-wrap gap-6 w-full justify-center">
                        <div className="flex-1">
                            <UserInfo
                                email={user?.email ?? ""}
                                phone={user?.phone !== "0" ? user?.phone : "No especificado"}
                                address={user?.address !== "Dirección no especificada" ? user?.address : "No especificado"}
                            />
                        </div>

                        {Array.isArray(user?.interests) && user?.interests.length > 0 && (
                            <div className="flex-1">
                                <UserInterests interests={user.interests} />
                            </div>
                        )}
                    </div>

                    <div className="w-full">
                        <UserAppointments />
                    </div>
                </div>
            ) : (
                <h1 className="text-center text-xl mt-20">
                    Por favor, registrese e inicie sesión
                </h1>
            )}
        </section>
    );
}
