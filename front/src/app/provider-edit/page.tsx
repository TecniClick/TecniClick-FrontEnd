"use client";

import { useAuth } from "@/contexts/authContext";
import Image from "next/image";
import { useState, useRef } from "react";
import { FaStar, FaPlus } from "react-icons/fa";

const PerfilProveedorEditablePage = () => {
  const {user} = useAuth
  const [editing] = useState(true);
  const [name, setName] = useState("Carlos López");
  const [description, setDescription] = useState(
    "¡Hola! Soy Carlos, plomero certificado con más de 10 años de experiencia. Me especializo en reparaciones rápidas y soluciones duraderas. Trabajo con responsabilidad, limpieza y respeto por tu hogar. 🚿🔧"
  );
  const [services, setServices] = useState([
    "Plomería",
    "Instalación de sanitarios",
    "Reparación de fugas",
  ]);
  const [newService, setNewService] = useState("");
  const [evidencias, setEvidencias] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const reviews = [
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
  ];

  const promedioRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const handleAddService = () => {
    if (newService.trim()) {
      setServices([...services, newService]);
      setNewService("");
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setEvidencias([...evidencias, ...newImages]);
    }
  };

  return (
    <div className="mx-[6%] p-[3%] oscuro shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200">
        <div
          className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden relative cursor-pointer group"
          onClick={() => profileInputRef.current?.click()}
        >
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Perfil"
              className="w-full h-full object-cover !relative"
              fill
            />
          ) : (
            <span className="flex items-center justify-center h-full w-full text-gray-600 text-sm">
              Foto
            </span>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
            Editar
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={profileInputRef}
            onChange={handleProfileImageChange}
          />
        </div>

        <div className="flex-1">
          {editing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-bold bg-transparent border-b border-gray-500 focus:outline-none w-full"
            />
          ) : (
            <h2 className="text-xl font-bold">{name}</h2>
          )}

          <p className="text-sm text-opacity-90">Bogotá, Colombia</p>

          <div className="flex items-center mt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`text-yellow-400 ${
                  i < Math.round(promedioRating) ? "opacity-100" : "opacity-30"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-opacity-85">{promedioRating.toFixed(1)} / 5</span>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <section className="p-4">
        <h3 className="text-lg font-semibold mb-2">Sobre mí</h3>
        {editing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-sm text-opacity-85 border border-gray-500 rounded-md p-2"
            rows={4}
          />
        ) : (
          <p className="text-sm text-gray-700">{description}</p>
        )}
      </section>

      {/* Servicios */}
      <section className="p-4">
        <h3 className="text-lg font-semibold mb-2">Servicios ofrecidos</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
          {services.map((service, index) => (
            <li
              key={index}
              className="bg-gray-100 p-2 rounded-md text-sm flex justify-between items-center"
            >
              {service}
              {editing && (
                <button
                  onClick={() => setServices(services.filter((_, i) => i !== index))}
                  className="text-red-500 text-xs ml-2"
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
        {editing && (
          <div className="flex gap-2">
            <input
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="Nuevo servicio"
              className="flex-1 border rounded-md p-2 text-sm"
            />
            <button
              onClick={handleAddService}
              className="bg-blue-500 text-white px-3 rounded-md text-sm"
            >
              <FaPlus />
            </button>
          </div>
        )}
      </section>

      {/* Galería */}
      <section className="p-4">
        <h3 className="text-lg font-semibold mb-2">Trabajos realizados</h3>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {evidencias.map((src, index) => (
            <div key={index} className="relative w-full aspect-square rounded-md overflow-hidden">
              <Image
                src={src}
                fill
                alt={`Evidencia ${index + 1}`}
                className=" object-cover !relative"
              />
            </div>
          ))}
        </div>
        {editing && (
          <div>
            <button
              onClick={() => galleryInputRef.current?.click()}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm rounded-md"
            >
              Subir nueva evidencia
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={galleryInputRef}
              onChange={handleGalleryUpload}
            />
          </div>
        )}
      </section>

      {/* Opiniones */}
      <section className="p-4">
        <h3 className="text-lg font-semibold mb-2">Opiniones de clientes</h3>
        {reviews.map((review, i) => (
          <div key={i} className="mb-3 p-3 bg-white shadow-sm rounded-md border border-gray-100">
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

      {/* Botón guardar */}
      {editing && (
        <div className="p-4 sticky bottom-0 bg-white border-t">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold">
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  );
};

export default PerfilProveedorEditablePage;
