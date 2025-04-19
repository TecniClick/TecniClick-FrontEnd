'use client';

export default function GoogleButton() {
  const handleLoginWithGoogle = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };
  return (
    <button onClick={handleLoginWithGoogle}>
      Iniciar sesión con Google
    </button>
  );
}