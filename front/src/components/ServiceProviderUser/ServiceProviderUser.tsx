/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Image from "next/image";
import { UserType } from "@/helpers/typeMock";
import profile from "../../../public/profile.png";
import AppointmentHandler from "./AppointmentHandler";

const ServiceProviderUser: React.FC<UserType> = ({
  id,
  name,
  email,
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
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Información del Prestador */}
      <section className="flex flex-row justify-center items-center">
        <div className="relative aspect-square w-12 mr-2 border-primary rounded-lg border-[3px]">
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
      <div className="mt-6">
        <AppointmentHandler />
      </div>
      {/* Servicios */}
      <section className="mt-6 border rounded-lg overflow-hidden shadow">
        <h4 className="p-2 bg-primary text-white text-lg font-medium">
          Servicios que ofrece
        </h4>
        <div className="p-4">
          {services ? (
            <>
              <p className="font-semibold">
                {services.name} - {services.category.name} ({services.category.description})
              </p>
              <p className="mt-2 text-gray-700">Tarifa base: ${services.price}</p>
              <p className="mt-2 text-gray-700">Descripción: {services.description}.</p>
              <h4 className="text-lg font-semibold">Realiza trabajos de:</h4>
              <p className="text-gray-700">{interests.length ? interests.join(", ") : "No especificados"}.</p>
              <h4 className="text-lg font-semibold">Puntuación:</h4>
              <p className="text-gray-700">{services.rating}</p>
            </>
          ) : (
            <p className="text-gray-500">No hay servicios disponibles</p>
          )
          }
        </div>
      </section>

      <section className="mt-6 border rounded-lg overflow-hidden shadow">
        <h4 className="p-2 bg-primary text-white text-lg font-medium">
          Galería
        </h4>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {services?.images?.length ? (
            services.images.map((image, index) => (
              <Image
                key={index}
                src={image.imgUrl}
                alt={`${name} - Imagen ${index + 1}`}
                width={600}
                height={600}
                className="rounded-lg object-cover"
              />
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center">
              El profesional no ha publicado imágenes
            </p>
          )}
        </div>
      </section>

      <section className="mt-6 border rounded-lg overflow-hidden shadow">
        <h4 className="p-2 bg-primary text-white text-lg font-medium">
          Reseñas
        </h4>
        <div className="p-4">
          {reviews.length ? (
            reviews.map((review) => (
              <div key={review.id} className="border-b py-2">
                <h5 className="font-semibold">{review.user.name}</h5>
                <p className="text-sm text-gray-500">Servicio: {review.service.name}</p>
                <p className="text-sm">Puntuación: {review.rating}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay reseñas disponibles.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServiceProviderUser;
