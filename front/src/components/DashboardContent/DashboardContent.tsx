"use client";

import { useAuth } from "@/contexts/authContext";
import { useAppointments } from "@/contexts/appointmentContext";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import UserInterests from "./UserInterests";
import UserAppointments from "./userAppointments";
import ServiceButton from "./ServiceButton";
import { useEffect } from "react";

export default function DashboardContent() {
    const { user, token } = useAuth();
    const { appointments, refreshAppointments } = useAppointments();

    const isLoggedIn = !!user;

    useEffect(() => {
        if (user && token) {
            refreshAppointments();
        }
    }, [token, user, refreshAppointments]);

    let params: string[] = ["/login", "Inicie sesión primero"]
    if (!user?.serviceProfile) params = ["/provider-edit", "Ofrecer un servicio"]
    else if (user?.serviceProfile && user?.serviceProfile.status == "pending") params = ["/dashboard", "Su solicitud está en revisión"]
    else if (user?.serviceProfile && user?.serviceProfile.status == "rejected") params = ["/provider-edit", "Solicitud rechazada, enviar otra modificada"]
    else if (user?.serviceProfile && user?.serviceProfile.status == "active") params = ["/provider-premium", "Hazte Premium"]



    return (
        <section className="w-full min-h-screen bg-background px-6 py-10 md:px-[10%] dark:text-white">
            {isLoggedIn ? (
                <div className="max-w-6xl mx-auto flex flex-col gap-8 items-center">
                    
                    <div className="flex flex-col items-center gap-4">
                        <UserImage
                            imgUrl={user?.imgUrl ?? undefined}
                            name={user?.name ?? "Usuario"}
                        />
                        <h1 className="text-2xl font-semibold text-center">
                            ¡Bienvenido/a {user?.name}!
                        </h1>
                    </div>

                    
                    {user && (
                        <ServiceButton params={params} />
                    )}

                    
                    <div className="flex flex-wrap gap-6 w-full justify-center">
                        <div className="flex-1">
                            <UserInfo
                                email={user?.email ?? ""}
                                phone={user?.phone ?? "No especificado"}
                                address={user?.address ?? "No especificado"}
                            />
                        </div>

                        {Array.isArray(user?.interests) && user?.interests.length > 0 && (
                            <div className="flex-1">
                                <UserInterests interests={user.interests} />
                            </div>
                        )}
                    </div>

                    <div className="w-full">
                        <UserAppointments appointments={appointments || []} />
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

