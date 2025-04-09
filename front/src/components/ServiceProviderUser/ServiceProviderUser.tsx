"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { UserType } from "@/helpers/typeMock";
import profile from "../../../public/profile.png";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AppointmentHandler from "./AppointmentHandler";

const ServiceProviderUser: React.FC<UserType> = ({
  id,
  name,
  imgUrl,
  services,
  interests,
  reviews,
}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();


  const promedioRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  return (
    <div className="bg-secondary pb-8 w-3/4 dark:bg-tertiary mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-b border-gray-200 items-center justify-center">
        <div
          className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 relative cursor-pointer hover:scale-105 transition"
          onClick={() => setShowImageModal(true)}
        >
          <Image
            src={imgUrl || profile}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm font-semibold text-tertiary dark:text-secondary mt-1">
            {services?.title || "Sin servicio"} - {services?.category?.name}
          </p>
          <p className="text-sm text-tertiary dark:text-secondary">
            {services?.category?.description}
          </p>

          <div className="flex items-center justify-center sm:justify-start mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`text-yellow-400 ${i < Math.round(promedioRating) ? "opacity-100" : "opacity-80"
                  }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {promedioRating.toFixed(1)} / 5
            </span>
          </div>

          <div className="mt-4 sm:mt-2">
            <AppointmentHandler
              onClick={() => {
                console.log("¿Estoy autenticado?", isAuthenticated);
                if (!isAuthenticated) {
                  toast.error("Debes iniciar sesión para poder reservar un turno!");
                  return;
                }
                router.push("/appointments");
              }}
            />
          </div>

        </div>
      </div>

      {/* Sobre mí */}
      {
        services?.description && (
          <section className="py-4">
            <h3 className="text-lg font-semibold mb-2">Sobre mí</h3>
            <p className="text-sm  text-tertiary dark:text-secondary">{services.description}</p>
          </section>
        )
      }

      {/* Servicios */}
      <section className="py-4">
        <h3 className="text-lg font-semibold mb-2">Servicios ofrecidos</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {interests.length ? (
            interests.map((interest, index) => (
              <li
                key={index}
                className="bg-gray-100 p-2 rounded-md shadow-xl border  text-tertiary text-sm text-center"
              >
                {interest}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">No especificados</li>
          )}
        </ul>
      </section>

      {/* Galería */}
      <section className="py-4">
        <h3 className="text-lg font-semibold mb-2">
          Galería de trabajos realizados
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 border shadow-xl">
          {services?.images?.length ? (
            services.images.map((image, index) => (
              <div
                key={index}
                className="relative h-28 sm:h-32 rounded-md overflow-hidden"
              >
                <Image
                  src={image.imgUrl}
                  alt={`${name} - Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-full text-center">
              El profesional no ha publicado imágenes
            </p>
          )}
        </div>
      </section>

      {/* Comentarios */}
      <section className="py-4">
        <h3 className="text-lg font-semibold mb-2">Opiniones de clientes</h3>
        {reviews.length ? (
          reviews.map((review, i) => (
            <div
              key={i}
              className="mb-3 p-3 bg-white shadow-sm rounded-md border border-gray-100"
            >
              <p className="text-sm font-semibold">{review.user.name}</p>
              <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
              <div className="flex text-yellow-500 text-sm">
                {Array.from({ length: review.rating }, (_, j) => (
                  <FaStar key={j} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No hay reseñas disponibles.</p>
        )}
      </section>

      {/* Modal */}
      {
        showImageModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4"
            onClick={() => setShowImageModal(false)}
          >
            <div className="bg-white p-4 rounded-lg max-w-sm w-full">
              <div className="relative aspect-square bg-gray-300 rounded-full overflow-hidden">
                <Image
                  src={imgUrl || profile}
                  alt={`${name} - perfil grande`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default ServiceProviderUser;
