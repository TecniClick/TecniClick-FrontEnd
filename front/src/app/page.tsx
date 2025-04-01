import Image from "next/image";
import logoContraste from "../../public/logoContraste.png";
import RotatingText from "@/components/RotatingText/RotatingText";
import click from "../../public/click.png";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import { IoIosCard, IoIosStar } from "react-icons/io";
import { FaCalendarCheck, FaCheck, FaSearch } from "react-icons/fa";
import { MdRocketLaunch } from "react-icons/md";
import { FaFaceGrinWink } from "react-icons/fa6";

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-banner">
        <main className="text-white text-center py-10 px-4 mx-[2%] md:mx-[8%] 2xl:mx-[12%]">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">
            Encuentra a los mejores servicios profesionales del Hogar en un solo lugar
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center mt-4">
            <h3 className="italic">
              Y al alcance de un <span className="font-bold">Click!</span>
            </h3>
            <Image src={click} alt="click" className="w-10 sm:w-16 ml-2" />
          </div>
          <RotatingText />
          <button className="border text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg mt-6 text-base sm:text-lg font-extrabold hover:bg-quaternary">
            <Link href="/register">Registrarse gratis</Link>
          </button>
        </main>
      </div>

      <section className="bg-secondary text-tertiary p-6 sm:p-8">
        <div className="mx-[5%] lg:mx-[12%] 2xl:mx-[20%]">
          <h2 className="font-bold text-lg sm:text-xl">Nuestra Misión</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center sm:items-stretch">
            <p className="w-full sm:w-1/2 text-justify flex-1 text-sm sm:text-base">
              Desde 2025, nuestra misión es ayudar a las personas a encontrar servicios técnicos y
              de mantenimiento confiables para satisfacer las necesidades de su hogar o espacio.
              Creemos que la tranquilidad y seguridad de nuestros usuarios comienzan con
              profesionales capacitados, eficientes y responsables. Asimismo, también buscamos
              apoyar a los profesionales del sector, ofreciéndoles una plataforma donde puedan
              mostrar sus habilidades, conectar con más clientes y hacer crecer su negocio.
              Facilitamos la comunicación, la confianza y la transparencia entre quienes necesitan
              un servicio y quienes lo ofrecen. Nos esforzamos por crear un ecosistema donde la
              calidad, la rapidez y la confianza sean los pilares de cada conexión entre clientes y
              trabajadores.
            </p>
            <div className="w-full sm:w-1/2 flex items-center justify-center">
              <div className="h-64 sm:h-auto sm:w-full aspect-[5/4] relative">
                <Image
                  src="/oficios.jpg"
                  alt="Trabajador 1"
                  fill
                  loading="lazy"
                  style={{ objectFit: "contain", borderRadius: "12px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white p-6 sm:p-8 text-center">
        <div className="mx-[2%] lg:mx-[8%] 2xl:mx-[12%]">
          <h2 className="font-bold text-lg sm:text-xl">¿Por qué elegirnos?</h2>
          <ul className="my-6 sm:my-8 text-left grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-16">
            <li>
              <h5 className="font-semibold flex items-center"><FaCheck size={35} className="pr-2 text-quaternary"/>
                Profesionales Verificados</h5>
              <p className="text-justify">
                Cada trabajador en nuestra plataforma pasa por un proceso de validación para
                garantizar seguridad y confianza.
              </p>
            </li>
            <li>
              <h5 className="font-semibold flex items-center"><IoIosStar size={35} className="pr-2 text-quaternary" />
                 Reseñas y Calificaciones</h5>
              <p className="text-justify">
                Consulta opiniones de otros clientes para tomar decisiones informadas antes de
                contratar un servicio.
              </p>
            </li>
            <li>
              <h5 className="font-semibold flex items-center"><FaCalendarCheck size={35} className="pr-2 text-quaternary"/>
                 Reserva Fácil y Rápida</h5>
              <p className="text-justify">
                Agenda servicios en pocos pasos y recibe confirmaciones al instante.
              </p>
            </li>
            <li>
              <h5 className="font-semibold flex items-center"><FaSearch size={35} className="pr-2 text-quaternary"/>
                 Búsqueda Inteligente</h5>
              <p className="text-justify">
                Filtra por categoría, ubicación y calificaciones para encontrar el profesional que
                mejor se adapte a tus necesidades.
              </p>
            </li>
            <li>
              <h5 className="font-semibold flex items-center"><MdRocketLaunch size={35} className="pr-2 text-quaternary"/>
                 Oportunidades para Profesionales</h5>
              <p>
                Si eres técnico o especialista en mantenimiento, nuestra plataforma te ayuda a
                encontrar más clientes y hacer crecer tu negocio.
              </p>
            </li>
            <li>
              <h5 className="font-semibold flex items-center"><IoIosCard size={35} className="pr-2 text-quaternary" />
                Pagos Seguros</h5>
              <p className="text-justify">
                Opciones de pago en línea con garantía de seguridad y transparencia.
              </p>
            </li>
          </ul>
          <p className="mt-6 sm:mt-10 font-bold flex justify-center items-center gap-2"><FaFaceGrinWink size={35} className=" text-quaternary" />
            Encuentra el mejor servicio o da a conocer tus habilidades, todo en un solo lugar.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center bg-secondary my-6 sm:my-8">
        <div className="mx-4 sm:mx-36 my-6 sm:my-8 text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Image src={logoContraste} alt="logo" className="w-48 sm:w-64" />
          </div>
          <p className="font-semibold mb-6 sm:mb-8">
            Nuestros usuarios encuentran 10 veces más profesionales que en cualquier otro lugar.
          </p>
          <div className="flex items-center justify-center w-full">
            <SearchBar redirectToServices={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
