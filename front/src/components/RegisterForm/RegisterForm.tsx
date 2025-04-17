"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import "@/styles/styles.css"
import { useRouter } from "next/navigation";
import GoogleButton from "../GoogleButton/GoogleButton";

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    address: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    address?: string;
}

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Nombre completo es requerido";
            isValid = false;
        }
        if (!formData.email) {
            newErrors.email = "Correo electrónico es requerido";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Ingrese un correo electrónico válido";
            isValid = false;
        }
        if (!formData.phone) {
            newErrors.phone = "Teléfono es requerido";
            isValid = false;
        } else if (!/^\d{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Teléfono debe tener entre 10 y 15 dígitos";
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = "Contraseña es requerida";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
            isValid = false;
        }
        if (!formData.address.trim()) {
            newErrors.address = "Dirección es requerida";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Por favor corrige los errores en el formulario");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    phone: Number(formData.phone),
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    address: formData.address,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el registro");
            }

            const data = await response.json();

            toast.success("Registro exitoso! Redirigiendo...");
            // Redirigir usando el router de Next.js
            router.push("/login");
        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.message || "Error al registrar. Por favor intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="w-full h-full flex justify-center items-center gap-8 px-4 pt-4 text-primary">
            <form onSubmit={handleSubmit} className="bg-secondary p-4 flex flex-col items-center rounded-md w-full sm:w-3/4 md:w-2/4 lg:w-1/3">
                <div className="flex items-center justify-center relative w-1/2 md:w-2/4 h-24">
                    <Image
                        src="/logoContraste.png"
                        alt="Logo de la pagina"
                        fill
                        className="!relative object-contain pb-4"
                        priority
                    />
                </div>

                <div className="flex flex-col w-full">
                    {/* Nombre Completo */}
                    <div className="container-input-login">
                        <label className="w-full">Nombre Completo</label>
                        <div className="flex flex-col w-full">
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Juan Pérez"
                                className={`input-login ${errors.fullName ? 'border-red-500' : ''}`}
                            />
                            {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName}</span>}
                        </div>
                    </div>

                    {/* Correo Electrónico */}
                    <div className="container-input-login mt-2">
                        <label className="w-full">Correo Electrónico</label>
                        <div className="flex flex-col w-full">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ejemplo@gmail.com"
                                className={`input-login ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                        </div>
                    </div>

                    {/* Teléfono */}
                    <div className="container-input-login mt-2">
                        <label className="w-full">Teléfono</label>
                        <div className="flex flex-col w-full">
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="1234567890"
                                className={`input-login ${errors.phone ? 'border-red-500' : ''}`}
                            />
                            {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div className="container-input-login mt-2">
                        <label className="w-full">Contraseña</label>
                        <div className="flex flex-col w-full">
                            <div className="w-full flex flex-row items-center">
                                <input
                                    type={showPassword.password ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="******"
                                    className={`input-login ${errors.password ? 'border-red-500' : ''}`}
                                />
                                <div
                                    className="pl-2 cursor-pointer"
                                    onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                                >
                                    {showPassword.password ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                                </div>
                            </div>
                            {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
                        </div>
                    </div>

                    {/* Confirmar Contraseña */}
                    <div className="container-input-login mt-2">
                        <label className="w-full">Confirmar Contraseña</label>
                        <div className="flex flex-col w-full">
                            <div className="w-full flex flex-row items-center">
                                <input
                                    type={showPassword.confirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="******"
                                    className={`input-login ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                />
                                <div
                                    className="pl-2 cursor-pointer"
                                    onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                                >
                                    {showPassword.confirmPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                                </div>
                            </div>
                            {errors.confirmPassword && <span className="text-red-500 text-xs mt-1">{errors.confirmPassword}</span>}
                        </div>
                    </div>

                    {/* Dirección */}
                    <div className="container-input-login mt-2">
                        <label className="w-full">Dirección</label>
                        <div className="flex flex-col w-full">
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Calle 123, Ciudad"
                                className={`input-login ${errors.address ? 'border-red-500' : ''}`}
                            />
                            {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address}</span>}
                        </div>
                    </div>
                </div>

                <button
                    className={`mt-4 py-2 w-full sm:w-4/5 bg-primary rounded-md text-secondary ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registrando...' : 'Registrarse'}
                </button>

                <div className="my-4 flex flex-col items-center w-full">
                    <GoogleButton />
                </div>

                <Link href='/login'>
                    <p className="self-start text-primary hover:underline cursor-pointer">¿Ya tienes cuenta? Inicia sesión</p>
                </Link>
            </form>
        </main>
    );
}