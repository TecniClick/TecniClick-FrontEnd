"use client";

import {
  getFilteredServices,
  getServiceProfile,
} from "@/services/profileService";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CategoryType, ServiceProfileStatus, ServiceProfileType } from "@/helpers/typeMock";
import { getCategories } from "@/services/categoryService";
import Image from "next/image";
import profile from "../../../public/profile.png";
import Link from "next/link";
import { useServiceContext } from "@/contexts/serviceContext";
import { FaStar } from "react-icons/fa";

const ServicesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("Buscar Servicio") || "";

  const { minRating } = useServiceContext();

  const [services, setServices] = useState<ServiceProfileType[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceProfileType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [nameCategory, setNameCategory] = useState<string | null>(null);
  const [sortPrice, setSortPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesList = await getCategories();
      setCategories(categoriesList);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const allServices = await getServiceProfile();
      setServices(allServices);
      setFilteredServices(allServices);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchFilteredServices = async () => {
      let updatedServices = services;

      if (searchQuery) {
        updatedServices = await getFilteredServices(searchQuery);
      } else if (nameCategory) {
        // 🔧 Filtrado por categoría directamente en frontend
        updatedServices = services.filter(
          (service) => service.category?.id === nameCategory
        );
      }

      if (minRating !== null) {
        updatedServices = updatedServices.filter(
          (service) => service.rating !== null && service.rating >= minRating
        );
      }

      if (sortPrice === "asc") {
        updatedServices = [...updatedServices].sort(
          (a, b) => a.appointmentPrice - b.appointmentPrice
        );
      } else if (sortPrice === "desc") {
        updatedServices = [...updatedServices].sort(
          (a, b) => b.appointmentPrice - a.appointmentPrice
        );
      }

      setFilteredServices(updatedServices);
    };

    fetchFilteredServices();
  }, [searchQuery, nameCategory, services, sortPrice, minRating]);

  const resetFilters = () => {
    setNameCategory(null);
    setSortPrice(null);
    setFilteredServices(services);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen text-tertiary">
      <div className="flex flex-wrap items-center justify-center gap-4 my-4">
        <select
          className="border p-2 rounded-lg w-full sm:w-auto dark:bg-tertiary dark:text-secondary"
          onChange={(e) => setNameCategory(e.target.value || null)}
          value={nameCategory || ""}
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded-lg w-full sm:w-auto oscuro"
          onChange={(e) => setSortPrice(e.target.value || null)}
          value={sortPrice || ""}
        >
          <option value="">Ordenar por precio</option>
          <option value="asc">Menor a Mayor</option>
          <option value="desc">Mayor a Menor</option>
        </select>

        <button
          className="bg-quaternary dark:bg-quinary text-white px-4 py-2 rounded-lg hover:bg-opacity-80 w-full sm:w-auto"
          onClick={resetFilters}
        >
          Limpiar Filtros
        </button>
      </div>

      <ul className="grid gap-4 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => {
            if (service.status == ServiceProfileStatus.ACTIVE) {
            return (
            <li key={service.id} className="oscuro border p-4 rounded-lg shadow-lg">
              <Link href={`/services/${service.id}`}>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={service.profilePicture || profile}
                    alt="Foto de perfil"
                    width={100}
                    height={100}
                    className="w-12 h-12 object-cover rounded-full border-2 border-quaternary dark:border-quinary"
                  />
                  <h3 className="text-lg font-semibold">{service.serviceTitle}</h3>
                </div>
                <div className="p-1">
                  <p>
                    Profesional:{" "}
                    <span className="font-bold">{service.userName}</span>
                  </p>
                  <p>
                    Categoría:{" "}
                    <span className="font-bold">
                      {service.category ? service.category.name : "Categoría no disponible"}
                    </span>
                  </p>
                  <p>
                    Precio Base:{" "}
                    <span className="font-bold">${service.appointmentPrice}</span>
                  </p>
                  <p>
                    Descripción:{" "}
                    {service.description?.length ?? 0 > 80
                      ? `${service.description?.slice(0, 80)}...`
                      : service.description ?? "Descripción no disponible"}

                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center gap-1">
                    {service.rating
                      ? Array.from({ length: Math.floor(service.rating) }, (_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))
                      : <span className="text-gray-500">Sin calificaciones</span>
                    }
                  </p>

                </div>
              </Link>
            </li>)
            } else return null
            })
        ) : (
          <div className="oscuro p-4 border rounded-lg shadow-lg text-center flex items-center justify-center col-span-full">
            <p>No hay profesionales disponibles aún en esta categoría.</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ServicesPage;