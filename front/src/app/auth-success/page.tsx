'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import { UserType } from '@/helpers/typeMock';
import { toast } from 'sonner';

export default function AuthSuccessPage() {
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [hasProcessed, setHasProcessed] = useState(false);

    useEffect(() => {
        if (hasProcessed) return;

        const token = searchParams.get('token');
        const userString = searchParams.get('user');

        if (token && userString) {
            try {
                const user: UserType = JSON.parse(decodeURIComponent(userString));
                login(token, user).then(() => {
                    toast.success(`Login exitoso, ¡bienvenido ${user.name || ''}!`);
                    setHasProcessed(true);
                    setTimeout(() => router.replace('/dashboard'), 1000);
                })
            } catch (err) {
                console.error('Error procesando datos de Google:', err);
                setHasProcessed(true);
                router.replace('/login');
            }
        } else {
            setHasProcessed(true);
            router.replace('/login');
        }
    }, [searchParams, login, router, hasProcessed]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl font-semibold">Procesando autenticación...</p>
        </div>
    );
}
