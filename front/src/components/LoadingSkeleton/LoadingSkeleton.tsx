import Image from "next/image";
import logo from "../../../public/logo.png";

export default function LoadingSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
        <div className="animate-pulse">
          <Image
            src={logo}
            alt="Logo de la empresa"
            width={120}
            height={120}
            priority
          />
        </div>
  
        <p className="mt-4 text-secondary text-lg animate-pulse">
          Cargando...
        </p>
      </div>
    );
};
