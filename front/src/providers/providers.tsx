
import { AuthProvider } from "@/contexts/authContext";
import { ServiceProvider } from "@/contexts/serviceContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ServiceProvider>
        {children}
      </ServiceProvider>
    </AuthProvider>
  );
}
