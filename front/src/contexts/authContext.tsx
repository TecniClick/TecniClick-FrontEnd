"use client";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { UserType, UserRole } from "@/helpers/typeMock";
import { useSession } from "next-auth/react";

interface AuthContextType {
    user: UserType | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string, user: UserType) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser && storedUser !== "undefined") {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Error al parsear el usuario desde localStorage:", err);
                localStorage.removeItem("user");
            }
        } else if (storedToken) {
            logout();
        }

        setLoading(false);
    }, []);

    // 🔄 Detecta sesión de Google y crea/recupera usuario desde tu backend
    useEffect(() => {
        if (session?.user) { // Verifica que session y session.user estén definidos
            const createOrFetchUser = async () => {
                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: session.user?.name ?? "",
                                email: session.user?.email ?? "",
                                image: session.user?.image ?? "",
                            }),
                        }
                    );

                    const data = await res.json();

                    console.log("Usuario creado o recuperado:", data);

                    // ⚠️ Asegurate que el backend devuelva: { token, user }
                    if (data?.token && data?.user) {
                        await login(data.token, data.user);
                    }
                } catch (err) {
                    console.error("Error creando usuario desde sesión de Google:", err);
                }
            };

            createOrFetchUser();
        }
    }, [session, user]);

    const login = async (jwtToken: string, userData: UserType) => {
        try {
            localStorage.setItem("token", jwtToken);
            localStorage.setItem("user", JSON.stringify(userData));
            setToken(jwtToken);
            setUser(userData);
        } catch (error) {
            console.error("Error en login:", error);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};
