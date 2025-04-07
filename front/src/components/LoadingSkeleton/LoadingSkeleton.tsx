import Image from "next/image";
import logo from "../../../public/logo.png";
import logoContraste from "../../../public/logoContraste.png";

export default function LoadingSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-pulse">
          {/* Logo para modo claro */}
          <Image src={logoContraste} alt="logo claro" className="w-32 sm:w-64 block dark:hidden" priority/>
          {/* Logo para modo oscuro */}
          <Image src={logo} alt="logo oscuro" className="w-32 sm:w-64 hidden dark:block" priority/>
        </div>
        <p className="mt-4 text-lg animate-pulse">Cargando...</p>
      </div>
    );
};
