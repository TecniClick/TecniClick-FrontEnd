'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import { UserType } from '@/helpers/typeMock';
import { useRef } from 'react';

export default function AuthSuccessPage() {
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const hasProcessedRef = useRef(false);

    useEffect(() => {
        if (hasProcessedRef.current) return;

        if (localStorage.getItem('authSuccessProcessed')) {
            router.replace('/dashboard');
            return;
        }

        const token = searchParams.get('token');
        const userString = searchParams.get('user');

        if (token && userString) {
            try {
                const user: UserType = JSON.parse(decodeURIComponent(userString));
                login(token, user).then(() => {
                    localStorage.setItem('authSuccessProcessed', 'true');
                    hasProcessedRef.current = true;
                    router.replace('/dashboard');
                });
            } catch (err) {
                console.error('Error procesando datos de Google:', err);
                hasProcessedRef.current = true;
                router.replace('/login');
            }
        } else {
            hasProcessedRef.current = true;
            router.replace('/login');
        }
    }, [searchParams, login, router]);
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl font-semibold">Procesando autenticación...</p>
        </div>
    );
}
