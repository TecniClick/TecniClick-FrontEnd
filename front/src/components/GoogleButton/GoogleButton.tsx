'use client';
import Image from "next/image";
import googleIcon from "../../../public/googleIcon.png"


export default function GoogleButton() {
  const handleLoginWithGoogle = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };
  return (
    <button
      type="button"
      onClick={handleLoginWithGoogle}
      className="flex flex-row gap-1 px-1 border-2 shadow-md rounded font-semibold">
      Iniciar sesión con
      <Image
        src={googleIcon}
        alt="icon"
        className="w-16"
      />
    </button>
  );
}