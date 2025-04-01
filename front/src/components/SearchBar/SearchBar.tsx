"use client";
import React, { useState } from "react";
import Image from "next/image";
import lupa from "../../../public/lupa.png";
import { useRouter } from "next/navigation";

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    redirectToServices?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Buscar Servicio...", onSearch, redirectToServices = false }) => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedQuery = normalizeString(query);

        if (redirectToServices) {
            router.push(`/services?search=${normalizedQuery}`);
        } else if (onSearch) {
            onSearch(normalizedQuery);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center w-11/12 max-w-lg bg-primary rounded-lg shadow-md overflow-hidden">
            <input type="text"
                className="w-full border-2 border-black px-4 py-3 outline-none text-tertiary"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="bg-primary text-secondary font-bold px-4 py-3 hover:bg-quaternary rounded-lg">
                <Image
                    src={lupa}
                    alt="lupa"
                    className="w-5"
                />
            </button>
        </form>
    );
};

export default SearchBar;
