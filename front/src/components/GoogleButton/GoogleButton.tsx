'use client';

import { signIn } from "next-auth/react";

export default function GoogleButton() {
  return (
    <button
      onClick={() => signIn('google')}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Iniciar sesión con Google
    </button>
  );
}