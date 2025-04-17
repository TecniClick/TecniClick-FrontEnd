"use client";

import { SessionProvider } from "next-auth/react"; // Asegúrate de importar esto
import { AppointmentsProvider } from "@/contexts/appointmentContext";
import { AuthProvider } from "@/contexts/authContext";
import { ServiceProvider } from "@/contexts/serviceContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ServiceProvider>
          <AppointmentsProvider>
            {children}
          </AppointmentsProvider>
        </ServiceProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
