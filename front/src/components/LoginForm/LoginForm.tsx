"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "@/styles/styles.css"

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    //handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // 1. Inicio de sesión - Cambiado a la variable de entorno
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || "Error al iniciar sesión");
            }

            const { token, userId } = await res.json();

            // 2. Obtención de datos del usuario - También con la variable de entorno
            const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!userRes.ok) throw new Error("Error al obtener el usuario");

            const user = await userRes.json();

            // 3. Guardado en contexto y redirección
            await login(token, user);
            router.push("/");

        } catch (error: any) {
            console.error("Login fallido:", error);
            setError(error.message || "Correo o contraseña incorrectos");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <main className="w-full min-h-[calc(100vh-89px)] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 px-4 sm:px-8 md:px-16 py-8 text-primary">
            <form
                onSubmit={handleSubmit}
                className="relative bg-secondary p-4 flex flex-col items-center h-fit rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-2/5 max-w-md"
            >
                <div className="flex items-center justify-center relative w-1/2 md:w-2/4 h-24">
                    <Image
                        src="/logoContraste.png"
                        alt="Logo de la página"
                        fill
                        className="!relative object-contain pb-4"
                        priority
                    />
                </div>

                <div className="flex flex-col w-full mt-4">
                    {/* Email */}
                    <div className="container-input-login flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
                        <label className="w-full sm:w-20 text-sm sm:text-base self-start">Correo</label>
                        <div className="w-full flex flex-col">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ejemplo@gmail.com"
                                className={`input-login w-full ${error ? "border-red-500" : ""}`}
                                required
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div className="container-input-login mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
                        <label className="w-full sm:w-20 text-sm sm:text-base self-start">Contraseña</label>
                        <div className="w-full flex flex-col">
                            <div className="w-full flex flex-row items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="*******"
                                    className={`input-login w-full ${error ? "border-red-500" : ""}`}
                                    required
                                />
                                <div
                                    className="pl-2 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Errores */}
                    {error && (
                        <div className="mt-2 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                </div>

                {/* Botón de Enviar */}
                <button
                    type="submit"
                    className={`mt-6 py-2 w-full sm:w-4/5 bg-primary rounded-md text-secondary hover:bg-opacity-90 transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    disabled={isLoading}
                >
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>

                {/* Google Login (decorativo) */}
                <div className="my-4 flex flex-col items-center w-full">
                    <p className="text-sm mb-2">O inicia sesión con</p>
                    <FcGoogle
                        size={40}
                        className="p-2 shadow-md rounded-full cursor-pointer hover:shadow-lg transition-shadow"
                    />
                </div>

                {/* Link de registro */}
                <Link href="/register" className="self-center">
                    <p className="text-primary hover:underline cursor-pointer text-sm sm:text-base hover:text-opacity-80 transition-colors">
                        ¿No tienes cuenta? Regístrate
                    </p>
                </Link>
            </form>
        </main>
    );
}

export default LoginForm;