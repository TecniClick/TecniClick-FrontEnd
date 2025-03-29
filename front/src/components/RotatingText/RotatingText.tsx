"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const professions = ["💧 Plomero", "💡 Electricista", "🔥 Gasista"];

const RotatingText = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % professions.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-row my-8 mx-auto gap-8 py-8 font-normal text-center items-center justify-center w-[500px]">
            <span className="flex items-center">
                <h4>Necesito un<span className="font-bold">...</span></h4>
            </span>
            <div className="flex flex-col justify-center items-center w-1/2 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={professions[index]}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold"
                >
                    {professions[index]}
                </motion.div>
            </div>
        </div>
    );
};

export default RotatingText;

