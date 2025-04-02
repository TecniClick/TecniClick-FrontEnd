"use client";

import { MouseEvent } from "react";
import { toast } from "sonner";

const AppointmentHandler = () => {
  const handler = (event: MouseEvent) => {
    event.preventDefault();
    toast.error("Debes iniciar sesión para poder reservar un turno! ");
  };
  return (
    <div className="p-4 w-full flex justify-center items-center">
      <button
        className="py-1 px-8 bg-primary text-secondary rounded-md"
        onClick={(event) => handler(event)}
      >
        Agregar turno a la agenda
      </button>
    </div>
  );
};
export default AppointmentHandler;
