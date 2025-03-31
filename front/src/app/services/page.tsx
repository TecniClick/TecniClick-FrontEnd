import SearchBar from "@/components/SearchBar/SearchBar";

export default function Services() {
    return (
        <div className="mx-[12%]">
            <div>
                <h2 className="font-semibold text-center py-2">Servicios</h2>
            </div>
            <div className="flex items-center justify-center w-full">
            <SearchBar />
            </div>
            
        </div>

    );
};