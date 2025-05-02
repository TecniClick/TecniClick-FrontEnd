"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { ServiceProfileType } from "@/helpers/typeMock";
import verified from "../../../public/verified.png";
import profile from "../../../public/profile.png";
import formatDescription from "@/helpers/formatDescription";

type Props = {
    serviceProfile: ServiceProfileType[];
};

const CarrouselPremium = ({ serviceProfile }: Props) => {
    return (
        <section className="my-10 px-4">
            <h2 className="text-2xl font-bold text-center text-primary dark:text-secondary py-8 ">
                Los destacados del mes ⭐
            </h2>

            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={20}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
                watchOverflow={true}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="!pb-12"
            >
                {serviceProfile.map((service) => (
                    <SwiperSlide key={service.id} className="h-full flex">
                        <div className="flex flex-col justify-between h-72 w-full border p-4 rounded-lg shadow-lg bg-amber-500">
                            <Link href={`/services/${service.id}`} className="flex flex-col h-full">
                                <span className="absolute bottom-3 right-2 bg-tertiary text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                                    ⭐ Premium
                                </span>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Image
                                        src={service.profilePicture || profile}
                                        alt="Foto de perfil"
                                        width={100}
                                        height={100}
                                        className="w-12 h-12 object-cover rounded-full border-2 border-quaternary dark:border-quinary"
                                    />
                                    <div className="flex justify-between items-center w-full">
                                        <h4 className="text-lg font-semibold items-center gap-1 break-words overflow-hidden line-clamp-3">
                                            {service.serviceTitle}
                                        </h4>
                                        <Image
                                            src={verified}
                                            alt="Verificado"
                                            width={30}
                                            height={18}
                                        />
                                    </div>
                                </div>

                                <div className="p-1 flex-grow flex flex-col justify-between">
                                    <div>
                                        <p>
                                            Profesional:{" "}
                                            <span className="font-bold">{service.userName}</span>
                                        </p>
                                        <p>
                                            Categoría:{" "}
                                            <span className="font-bold">
                                                {service.category?.name || "No disponible"}
                                            </span>
                                        </p>
                                        <p>
                                            Precio Base:{" "}
                                            <span className="font-bold">${service.appointmentPrice}</span>
                                        </p>
                                        <p className="text-sm leading-snug break-words overflow-hidden line-clamp-3">
                                            <span className="font-medium">Descripción:</span>{" "}
                                            {formatDescription(service.description ?? "") || "Descripción no disponible"}
                                        </p>
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 flex items-center gap-1 self-start">
                                        {service.rating
                                            ? Array.from({ length: Math.floor(service.rating) }, (_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={"text-white"}
                                                />
                                            ))
                                            : <span className="text-gray-500">Sin calificaciones</span>}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CarrouselPremium;
