"use client";

import { MouseEvent } from "react";
import { toast } from "sonner";

const AppointmentHandler = () => {
  const handler = (event: MouseEvent) => {
    event.preventDefault();
    toast.success("Agregado a la agenda!");
  };
  return (
    <div className="m-4 w-full flex justify-center items-center">
      <button
        className="py-1 px-8 bg-quinary text-secondary rounded-md"
        onClick={(event) => handler(event)}
      >
        Agregar turno a la agenda
      </button>
    </div>
  );
};
export default AppointmentHandler;
