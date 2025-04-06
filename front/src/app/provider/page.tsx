"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function PerfilProveedorPage() {
  const [showImageModal, setShowImageModal] = useState(false);

  const proveedor = {
    name: "Carlos López",
    imageUrl: "",
    services: ["Plomería", "Instalación de sanitarios", "Reparación de fugas"],
    location: "Bogotá, Colombia",
    description:
      "¡Hola! Soy Carlos, plomero certificado con más de 10 años de experiencia. Me especializo en reparaciones rápidas y soluciones duraderas. Trabajo con responsabilidad, limpieza y respeto por tu hogar. 🚿🔧",
    evidencias: [1, 2, 3, 4],
    reviews: [
      {
        user: "Laura Gómez",
        comment:
          "Excelente trabajo, llegó puntual y dejó todo funcionando perfecto. Súper recomendado.",
        rating: 5,
      },
      {
        user: "Daniel Ruiz",
        comment:
          "Muy amable y profesional. Solucionó una fuga que otros no pudieron. Lo volveré a contratar.",
        rating: 5,
      },
      {
        user: "Marta Villalba",
        comment: "Buen servicio, pero se tardó un poco más de lo acordado.",
        rating: 3,
      },
    ],
  };

  const promedioRating =
    proveedor.reviews.reduce((acc, r) => acc + r.rating, 0) /
    proveedor.reviews.length;

  return (
    <div className="pb-28 max-w-xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 border-b border-gray-200">
        <div
          className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm mx-auto sm:mx-0 cursor-pointer hover:scale-105 transition"
          onClick={() => setShowImageModal(true)}
        >
          Foto
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">{proveedor.name}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {proveedor.services.join(" | ")}
          </p>
          <p className="text-sm text-gray-500">{proveedor.location}</p>

          <div className="flex items-center justify-center sm:justify-start mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`text-yellow-400 ${
                  i < Math.round(promedioRating) ? "opacity-100" : "opacity-30"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {promedioRating.toFixed(1)} / 5
            </span>
          </div>

          <div className="mt-4 sm:mt-2">
            <a
              target="_blank"
              className="block text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold w-full sm:w-fit px-8 mx-auto sm:mx-0"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>

      {/* Sobre mí */}
      <section className="py-4">
        <h3 className="text-lg font-semibold mb-2">Sobre mí</h3>
        <p className="text-sm text-gray-700">{proveedor.description}</p>
      </section>

      {/* Servicios */}
      <section className="py-4">
        <h3 className="text-lg font-semibold mb-2">Servicios ofrecidos</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {proveedor.services.map((service, index) => (
            <li
              key={index}
              className="bg-gray-100 p-2 rounded-md text-sm text-center"
            >
              {service}
            </li>
          ))}
        </ul>
      </section>

      {/* Galería */}
      <section className="py-4">
        <h3 className="text-lg font-semibold mb-2">
          Galería de trabajos realizados
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {proveedor.evidencias.map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-md h-28 sm:h-32 flex items-center justify-center text-gray-500 text-sm"
            >
              Foto {index + 1}
            </div>
          ))}
        </div>
      </section>

      {/* Comentarios */}
      <section className="py-4">
        <h3 className="text-lg font-semibold mb-2">Opiniones de clientes</h3>
        {proveedor.reviews.map((review, i) => (
          <div
            key={i}
            className="mb-3 p-3 bg-white shadow-sm rounded-md border border-gray-100"
          >
            <p className="text-sm font-semibold">{review.user}</p>
            <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
            <div className="flex text-yellow-500 text-sm">
              {Array.from({ length: review.rating }, (_, j) => (
                <FaStar key={j} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="bg-white p-4 rounded-lg max-w-sm w-full">
            <div className="w-full aspect-square bg-gray-300 flex items-center justify-center text-gray-600 text-xl rounded-full">
              Foto grande
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
