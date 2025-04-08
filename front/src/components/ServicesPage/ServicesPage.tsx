"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCategories } from "@/services/categoryService";
import { CategoryType } from "@/helpers/typeMock";
import SearchBar from "../SearchBar/SearchBar";
import { useServiceContext } from "@/contexts/serviceContext";
import Image from "next/image";
import profile from "../../../public/profile.png";
import Link from "next/link";

const ServicesPage: React.FC = () => {
    const searchParams = useSearchParams();
    const searchQueryParam = searchParams.get("Buscar Servicio") || "";

    const {
        filteredServices,
        setSearchQuery,
        setCategory,
        selectedCategory,
        fetchFilteredServices,
        setMinRating,
        minRating,
    } = useServiceContext();

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [sortPrice, setSortPriceLocal] = useState<string | null>(null);

    const handleSortChange = (value: string | null) => {
        setSortPriceLocal(value);
        fetchFilteredServices();
    };

    const handleRatingChange = (value: string | null) => {
        setMinRating(value ? parseInt(value) : null);
        fetchFilteredServices();
    };

    const handleCategoryChange = (value: string | null) => {
        setCategory(value);
        fetchFilteredServices();
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        fetchFilteredServices();
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesList = await getCategories();
            setCategories(categoriesList);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (searchQueryParam) {
            setSearchQuery(searchQueryParam);
            fetchFilteredServices();
        }
    }, [searchQueryParam, setSearchQuery]);

    const resetFilters = () => {
        setCategory(null);
        setSearchQuery("");
        setSortPriceLocal(null);
        setMinRating(null);
        fetchFilteredServices();
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen text-tertiary">
            <div className="flex items-center justify-center w-full mb-4">
                <SearchBar onSearch={handleSearchChange} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 my-4">
                <select
                    className="border p-2 rounded-lg w-full sm:w-auto"
                    onChange={(e) => handleCategoryChange(e.target.value || null)}
                    value={selectedCategory || ""}
                >
                    <option value="">Todas las categorías</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <select
                    className="border p-2 rounded-lg w-full sm:w-auto"
                    onChange={(e) => handleSortChange(e.target.value || null)}
                    value={sortPrice || ""}
                >
                    <option value="">Ordenar por precio</option>
                    <option value="asc">Menor a Mayor</option>
                    <option value="desc">Mayor a Menor</option>
                </select>

                <select
                    className="border p-2 rounded-lg w-full sm:w-auto"
                    onChange={(e) => handleRatingChange(e.target.value || null)}
                    value={minRating?.toString() || ""}
                >
                    <option value="">Puntuación mínima</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>
                            {rating} estrellas o más
                        </option>
                    ))}
                </select>

                <button
                    className="bg-quaternary text-white px-4 py-2 rounded-lg hover:bg-opacity-80 w-full sm:w-auto"
                    onClick={resetFilters}
                >
                    Limpiar Filtros
                </button>
            </div>

            <ul className="grid gap-4 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                        <li
                            key={service.id}
                            className="bg-secondary border p-4 rounded-lg shadow-lg"
                        >
                            <Link href={`/services/${service.userId}`}>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Image
                                        src={profile}
                                        alt="Foto de perfil"
                                        width={50}
                                        className="rounded-full"
                                    />
                                    <h3 className="text-lg font-semibold">{service.name}</h3>
                                </div>
                                <div className="p-1">
                                    <p className="text-tertiary">
                                        Profesional:{" "}
                                        <span className="font-bold">{service.user}</span>
                                    </p>
                                    <p className="text-tertiary">
                                        Categoría:{" "}
                                        <span className="font-bold">
                                            {service.category ? service.category.name : "Categoría no disponible"}
                                        </span>
                                    </p>
                                    <p className="text-tertiary">
                                        Precio Base:{" "}
                                        <span className="font-bold">${service.price}</span>
                                    </p>
                                    <p className="text-tertiary">Descripción: {service.description}.</p>
                                    <p className="text-sm text-tertiary">Puntuación: {service.rating}</p>
                                </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <div className="bg-secondary p-4 border rounded-lg shadow-lg text-center flex items-center justify-center col-span-full">
                        <p className="text-tertiary">
                            No hay profesionales disponibles aún con estos filtros.
                        </p>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default ServicesPage;
