"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    FaWrench, FaBolt, FaFire, FaHammer, FaTools, FaLeaf, FaBroom, FaHardHat, 
    FaToilet, FaPaintRoller, FaScrewdriver, FaMobileAlt, FaLaptop, FaSatelliteDish, 
    FaUtensils, FaCar, FaChalkboardTeacher, FaBaby 
} from "react-icons/fa";

const professions = [
    { icon: <FaWrench className="text-quaternary" />, name: "Plomero" },
    { icon: <FaBolt className="text-quaternary" />, name: "Electricista" },
    { icon: <FaFire className="text-quaternary" />, name: "Gasista" },
    { icon: <FaHammer className="text-quaternary" />, name: "Carpintero" },
    { icon: <FaTools className="text-quaternary" />, name: "Mecánico" },
    { icon: <FaLeaf className="text-quaternary" />, name: "Jardinero" },
    { icon: <FaBroom className="text-quaternary" />, name: "Servicio de limpieza" },
    { icon: <FaHardHat className="text-quaternary" />, name: "Albañil" },
    { icon: <FaToilet className="text-quaternary" />, name: "Instalador de baños" },
    { icon: <FaPaintRoller className="text-quaternary" />, name: "Pintor" },
    { icon: <FaScrewdriver className="text-quaternary" size={38} />, name: "Reparador de electrodomésticos" },
    { icon: <FaMobileAlt className="text-quaternary" />, name: "Técnico en celulares" },
    { icon: <FaLaptop className="text-quaternary" />, name: "Técnico informático" },
    { icon: <FaSatelliteDish className="text-quaternary" />, name: "Instalador de antenas" },
    { icon: <FaUtensils className="text-quaternary" />, name: "Chef" },
    { icon: <FaCar className="text-quaternary" />, name: "Chofer" },
    { icon: <FaChalkboardTeacher className="text-quaternary" />, name: "Profesor particular" },
    { icon: <FaBaby className="text-quaternary" />, name: "Niñera" },
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
                    key={professions[index].name}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl font-bold flex items-center gap-2"
                >
                    {professions[index].icon}
                    {professions[index].name}
                </motion.div>
            </div>
        </div>
    );
};

export default RotatingText;
