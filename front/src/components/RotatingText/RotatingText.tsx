"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const professions = [
    "💧 Plomero",
    "💡 Electricista",
    "🔥 Gasista",
    "🔨 Carpintero",
    "🔧 Mecánico",
    "🌿 Jardinero",
    "🧹 Ama de casa",
    "👷 Albañil",
    "🚿 Instalador de baños",
    "🧴 Pintor",
    "🛠️ Reparador de electrodomésticos",
    "📱 Técnico en celulares",
    "💻 Técnico informático",
    "📡 Instalador de antenas",
    "🧑‍🍳 Chef",
    "🚗 Chofer",
    "🧑‍🏫 Profesor particular",
    "👩‍🍼 Niñera",
];

const RotatingText = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % professions.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-36 flex flex-col sm:flex-row my-4 mx-auto gap-8 py-8 font-normal text-center items-center justify-center w-full max-w-[700px]">
            <span className="flex items-center text-lg sm:text-xl">
                <h4>Necesito un<span className="font-bold">...</span></h4>
            </span>
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={professions[index]}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl font-bold"
                >
                    {professions[index]}
                </motion.div>
            </div>
        </div>
    );
};

export default RotatingText;
