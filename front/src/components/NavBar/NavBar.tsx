"use client";
import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import DarkMode from "../DarkMode/DarkMode";
import LoginButton from "./LoginButton";
import { useAuth } from "@/contexts/authContext";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const NavBar = () => {
  const {loading} = useAuth();

  if (loading) {
    return <LoadingSkeleton />
  }
  return (
    <>
      <nav className="hidden md:flex mx-6 lg:mx-36">
        <ul className="flex flex-row justify-between items-center text-secondary font-semibold w-full">
          <Link href="/" className="w-16 h-full justify-center">
            <button className="w-full h-full relative">
              <Image src={logo} alt="logo" fill loading="lazy" style={{ objectFit: "contain" }} />
            </button>
          </Link>
          <li className="btn-hundido">
            <Link href="/services">Buscar Servicios</Link>
          </li>
          <li className="btn-hundido">
            <Link href="/contact">Contacto</Link>
          </li>
          <li className="w-1/3">
            <LoginButton />
          </li>
          <li>
            <DarkMode />
          </li>
        </ul>
      </nav>

      {/* NavBar para pantallas pequeñas!! */}

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-primary border-t shadow-md z-50">
        <LoginButton />
      </nav>
    </>
  );
};

export default NavBar;
