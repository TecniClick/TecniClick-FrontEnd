"use client";

import { useAuth } from "@/contexts/authContext";
// import { useState } from "react";
import Image from "next/image";
import profile from "../../../public/profile.png";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuth();
  // const [user, setUser] = useState(user || false)
  const image = user?.imgUrl || profile;

  return (
    <div className="mx-[6%] p-[3%] oscuro shadow-lg">
      {user ? (
        <div className="flex flex-col items-center">
          <div className="relative h-[10vh] aspect-square border-[3px] rounded-xl border-quaternary dark:border-quinary">
            <Image
              src={image}
              alt={user.name || "perfil"}
              fill
              layout="lazy"
              style={{ objectFit: "contain", borderRadius: "9px" }}
            />
          </div>
          <h1>¡Bienvedido/a {user.name}!</h1>
          <Link href="/provider-edit" className="my-4 py-1 px-4 buttons">
            {!user.services ? <p>Ofrecer un servicio</p> : <p>Editar tus servicios</p>}
          </Link>
          <div className="w-full md:w-[75%] 2xl:w-[60%] flex flex-col border-2 borders rounded-2xl">
            <h2 className="p-2 bg-quaternary dark:bg-quinary bg-opacity-40 dark:bg-opacity-50 border-b-2 borders rounded-t-2xl">
              Informacion
            </h2>
            <div className="flex flex-col p-2">
              <span>Email: {user.email} </span>
              <span>Telefono: {user.phone} </span>
              <span>direccion: {user.address} </span>
              <span>Rol: {user.role} </span>
            </div>
          </div>
          {user.interests?.length && (
            <div className="my-4">
              <h4>Intereses</h4>
              <p>{user.interests.join(", ")}</p>
            </div>
          )}
          {user.appointments?.length ? (
            <div className="my-4 w-full md:w-[75%] 2xl:w-[60%] flex flex-col border-2 borders">
              <h2 className="p-2 bg-quaternary dark:bg-quinary bg-opacity-40 dark:bg-opacity-50 border-b-2 borders">
                Informacion
              </h2>
              <div className="">
                {user.appointments.map((appointment) => {
                  return <div key={appointment.id}>turno {appointment.id}</div>;
                })}
              </div>
            </div>
          ) : (
            <h3 className="my-4">Aún no tienes turnos agendados</h3>
          )}
        </div>
      ) : (
        <h1 className="w-full h-[60vh] text center">Por favor, registrese e inicie sesion</h1>
      )}
    </div>
  );
}
