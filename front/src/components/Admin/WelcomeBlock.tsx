import Image from "next/image"
import admin from "../../../public/admin.png";

export function WelcomeBlock() {
    return (
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow h-full flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold mb-2">¡Bienvenido Administrador!</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-9">
          Desde este panel puedes gestionar categorías, ver estadísticas y atender solicitudes de los usuarios.
        </p>
        <div className="relative w-24 h-24 mt-8">
        <Image
          src={admin}
          alt="Administrador"
          width={100}
          height={100}
        />
      </div>
      </section>
    )
  }