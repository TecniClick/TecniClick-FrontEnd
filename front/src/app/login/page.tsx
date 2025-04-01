"use client"

import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
import "./styles.css";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
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

  const authenticateUser = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const validCredentials = [
      { email: "usuario@gmail.com", password: "password123" },
      { email: "test@test.com", password: "123456" }
    ];

    return validCredentials.some(
      cred => cred.email === formData.email && cred.password === formData.password
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const isAuthenticated = await authenticateUser();

      if (isAuthenticated) {
        toast.success('Inicio de sesión exitoso', {
          duration: 1500,
          onAutoClose: () => router.push('/')
        });
      } else {
        toast.error('Credenciales incorrectas. Intente nuevamente.');
        setErrors({
          ...errors,
          general: 'Correo electrónico o contraseña incorrectos'
        });
      }
    } catch (error) {
      toast.error('Ocurrió un error al intentar iniciar sesión. Por favor, intente más tarde.');
      console.error("Error en autenticación:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-89px)] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 px-4 sm:px-8 md:px-16 py-8 text-primary">
      <form onSubmit={handleSubmit} className="relative bg-secondary p-4 flex flex-col items-center h-fit rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-2/5 max-w-md">
        <div className="flex items-center justify-center relative w-1/2 md:w-2/4 h-24">
          <Image
            src="/logoContraste.png"
            alt="Logo de la pagina"
            fill
            className="!relative object-contain pb-4"
            priority
          />
        </div>

        <div className="flex flex-col w-full mt-4">
          {/* Correo */}
          <div className="container-input-login flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
            <label className="w-full sm:w-20 text-sm sm:text-base self-start">Correo</label>
            <div className="w-full flex flex-col">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@gmail.com"
                className={`input-login w-full ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Contraseña */}
          <div className="container-input-login mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
            <label className="w-full sm:w-20 text-sm sm:text-base self-start">Contraseña</label>
            <div className="w-full flex flex-col">
              <div className="w-full flex flex-row items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="*******"
                  className={`input-login w-full ${errors.password ? 'border-red-500' : ''}`}
                />
                <div
                  className="pl-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">{errors.password}</span>
              )}
            </div>
          </div>

          {/* Errores generales */}
          {errors.general && (
            <div className="mt-2 text-red-500 text-sm text-center">
              {errors.general}
            </div>
          )}
        </div>

        {/* Botón de Enviar */}
        <button
          className={`mt-6 py-2 w-full sm:w-4/5 bg-primary rounded-md text-secondary hover:bg-opacity-90 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>

        {/* Google Login */}
        <div className="my-4 flex flex-col items-center w-full">
          <p className="text-sm mb-2">O inicia sesión con</p>
          <FcGoogle
            size={40}
            className="p-2 shadow-md rounded-full cursor-pointer hover:shadow-lg transition-shadow"
          />
        </div>

        {/* Enlace de Registro */}
        <Link href='/register' className="self-center">
          <p className="text-primary hover:underline cursor-pointer text-sm sm:text-base hover:text-opacity-80 transition-colors">
            ¿No tienes cuenta? Regístrate
          </p>
        </Link>
      </form>
    </main>

  );
}