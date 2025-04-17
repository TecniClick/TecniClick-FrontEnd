"use client"
import Image from "next/image"
import Link from "next/link"
import { MouseEvent } from "react"
import { toast } from "sonner"

import { IoSearch } from "react-icons/io5";
import { MdLogin, MdLogout } from "react-icons/md";
import { FaUser, FaUserPlus } from "react-icons/fa";
import logo from "../../../public/logo.png";
import { useAuth } from "@/contexts/authContext"
import { useRouter } from "next/navigation"
import { BsEnvelopePaperFill } from "react-icons/bs"
import { RiFilePaper2Fill } from "react-icons/ri"
import { useSession, signOut } from "next-auth/react"

const LoginButton = () => {
  const { isAuthenticated, logout } = useAuth(); // Usamos el contexto que creaste
  const router = useRouter();

  const logoutHandler = (event: MouseEvent) => {
    event.preventDefault();
    toast.warning("Seguro que quieres cerrar sesión?", {
      action: {
        label: "Seguro",
        onClick() {
          if (isAuthenticated) {
            logout();
          }
          router.push("/"); // Redirige a la página principal después de cerrar sesión
        },
      },
      position: "top-right",
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="hidden w-full md:flex justify-between items-center">
          <Link href="/dashboard" className="btn-hundido">Perfil</Link>
          <button
            onClick={(event) => logoutHandler(event)}
            className="px-3 py-1 ml-2 rounded-md bg-secondary hover:bg-quaternary text-primary hover:text-secondary flex justify-center items-center"
          >
            <span>Cerrar Sesión</span>
          </button>
        </div>
      ) : (
        <div className="hidden w-full md:flex justify-end items-center">
          <Link href="/login" className="text-nowrap hover:text-quaternary">Iniciar Sesión</Link>
          <div className="px-3 py-[2px] ml-2 rounded-md bg-secondary hover:bg-quaternary text-primary hover:text-secondary flex justify-center items-center">
            <Link href="/register">Registrarse</Link>
          </div>
        </div>
      )}

      <ul className="md:hidden flex justify-around items-center text-secondary font-semibold py-2">
        <Link className="hover:text-quaternary transition flex justify-center items-center h-8 aspect-[5/3] relative" href="/">
          <Image src={logo} alt="logo" fill loading="lazy" style={{ objectFit: "contain" }} />
        </Link>
        <Link className="hover:text-quaternary transition" href="/services">
          <IoSearch size={30} />
        </Link>

        {isAuthenticated ? (
          <>
            <Link className="hover:text-quaternary transition" href="/contact">
              <BsEnvelopePaperFill size={30} />
            </Link>
            <Link className="hover:text-quaternary transition" href="/dashboard">
              <FaUser size={30} />
            </Link>
            <button className="hover:text-quaternary transition" onClick={(event) => logoutHandler(event)}>
              <MdLogout size={30} />
            </button>
          </>
        ) : (
          <>
            <Link className="hover:text-quaternary transition" href="/terms">
              <RiFilePaper2Fill size={30} />
            </Link>
            <Link className="hover:text-quaternary transition" href="/register">
              <FaUserPlus size={30} />
            </Link>
            <Link className="hover:text-quaternary transition" href="/login">
              <MdLogin size={30} />
            </Link>
          </>
        )}
      </ul>
    </>
  );
};

export default LoginButton;
