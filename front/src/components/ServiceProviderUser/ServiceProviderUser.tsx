/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Image from "next/image";
import { UserType } from "@/helpers/typeMock";
import profile from "../../../public/profile.png"
import AppointmentHandler from "./AppointmentHandler";

const ServiceProviderUser: React.FC<UserType> = ({
  id,
  name,
  email,
  password,
  phone,
  address,
  role,
  interests,
  imgUrl,
  services,
  appointments,
  reviews,
  orders,
  createdAt,
  updatedAt,
  deletedAt,
}) => {  
  return (
    <div className="secundary w-full p-[2%]">
      <section className="flex flex-row justify-center items-center">
        <div className="relative aspect-square w-12 mr-2 border-quinary rounded-lg border-[3px]">
          <Image
            src={imgUrl || profile}
            alt={name}
            fill
            loading="lazy"
            style={{ objectFit: "contain", borderRadius: "6px" }}
          />
        </div>
        <h2>{name}</h2>
      </section>

      <section className="m-[2%] border-2 borders flex flex-col">
        <h4 className="pl-1 bg-opacity-15 bg-quaternary border-b-2 borders">Servicios que ofrece: {services.name}</h4>
        <div className="p-[1%]">
          <p> {services.category.name} ({services.category.description}) </p>
          <p>Descripcion del servicio: {services.description}</p>
        </div>
      </section>

      <AppointmentHandler/>
      <span>Intereses: {interests.join(", ")}</span>

      {reviews.length ? (
        <div className="flex flex-row">
          <p>Reseñas que podrian interesarte:</p>
          <div>
            {reviews.map((revew) => {
              return (
                <div key={revew.id}>
                  <h4>{revew.user.name}</h4>
                  <h6>{revew.service.name}</h6>
                  <span>{revew.rating}</span>
                  <p>{revew.comment}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>No hay reseñas disponibles</p>
      )}
    </div>
  );
};

export default ServiceProviderUser;
