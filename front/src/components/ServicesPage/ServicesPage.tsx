"use client";
import { getFilteredServices, getServiceProfile, getServiceProfileByCategory } from "@/services/profileService";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { CategoryType, ServiceProfileType } from "@/helpers/typeMock";
import { getCategories } from "@/services/categoryService";
import Image from "next/image";
import profile from "../../../public/profile.png";

const ServicesPage: React.FC = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("Buscar Servicio") || "";

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
                updatedServices = await getServiceProfileByCategory(nameCategory) || [];
            }


            if (sortPrice === "asc") {
                updatedServices = [...updatedServices].sort((a, b) => a.price - b.price);
            } else if (sortPrice === "desc") {
                updatedServices = [...updatedServices].sort((a, b) => b.price - a.price);
            }

            setFilteredServices(updatedServices);
        };
        fetchFilteredServices();
    }, [searchQuery, nameCategory, services, sortPrice]);

    const resetFilters = () => {
        setNameCategory(null);
        setSortPrice(null);
        setFilteredServices(services);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 text-tertiary">
            <div className="flex items-center justify-center w-full">
                <SearchBar onSearch={async (query) => {
                    const services = await getFilteredServices(query);
                    setFilteredServices(services);
                }} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 my-8">
                <select
                    className="border p-2 rounded-lg"
                    onChange={(e) => setNameCategory(e.target.value || null)}
                    value={nameCategory || ""}
                >
                    <option value="">Todas las categorías</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <select
                    className="border p-2 rounded-lg"
                    onChange={(e) => setSortPrice(e.target.value || null)}
                    value={sortPrice || ""}
                >
                    <option value="">Ordenar por precio</option>
                    <option value="asc">Menor a Mayor</option>
                    <option value="desc">Mayor a Menor</option>
                </select>

                <button
                    className="bg-quaternary text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
                    onClick={resetFilters}
                >
                    Limpiar Filtros
                </button>
            </div>

            <ul className="grid grid-cols-2 gap-8">
                {filteredServices.map(service => (
                    <li key={service.id} className="bg-secondary border p-8 rounded-lg shadow-lg">
                        <div className="flex items-center gap-4">
                            <Image
                                src={profile}
                                alt="Foto de perfil"
                                width={50}
                                className="rounded-full"
                            />
                            <h3 className="text-lg font-semibold">{service.name}</h3>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-600">
                                Categoría: <span className="font-bold">
                                    {service.category ? service.category.name : "Categoría no disponible"}
                                </span>
                            </p>
                            <p className="text-gray-600">
                                Profesional: <span className="font-bold">
                                    {service.user}
                                </span>
                            </p>
                            <p className="text-gray-600">Precio Base: <span className="font-bold">${service.price}</span></p>
                            <p className="text-gray-500">Descripción: {service.description}.</p>
                            <p className="text-sm text-gray-500">Puntuación: {service.rating}</p>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default ServicesPage;