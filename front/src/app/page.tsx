import Image from 'next/image';
import logoContraste from '../../public/logoContraste.png'
import RotatingText from '@/components/RotatingText/RotatingText';
import click from '../../public/click.png'

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-banner">
        <main className="text-white text-center py-10 px-4 mx-[2%] lg:mx-[8%] 2xl:mx-[12%]">
          <h1 className="font-bold">
            Encontra a los mejores Servicios Profesionales del Hogar en un solo lugar
          </h1>
          <div className='flex flex-row items-center justify-center'>
            <h3 className="italic mt-2">Y al alcance de un <span className="font-bold">Click!</span></h3>
            <Image
              src={click}
              alt='click'
              className='w-16' />
          </div>
          <RotatingText />
          <button className="border text-white px-6 py-3 rounded-lg mt-6 text-lg font-extrabold hover:bg-quaternary">
            Registrarse gratis
          </button>
        </main>
      </div>

      <section className="bg-secondary text-tertiary p-8">
        <div className='mx-[5%] lg:mx-[12%] 2xl:mx-[20%]'>
          <h2 className="font-bold">Nuestra Misión</h2>
          <div className='flex flex-row gap-8 items-stretch'>
            <p className="mt-4 text-justify justify-start flex-1">
              Desde 2025, nuestra misión es ayudar a las personas a encontrar servicios técnicos y de mantenimiento confiables para satisfacer las necesidades de su hogar o espacio. Creemos que la tranquilidad y seguridad de nuestros usuarios comienzan con profesionales capacitados, eficientes y responsables.
              Asimismo, también buscamos apoyar a los profesionales del sector, ofreciéndoles una plataforma donde puedan mostrar sus habilidades, conectar con más clientes y hacer crecer su negocio. <br /> Facilitamos la comunicación, la confianza y la transparencia entre quienes necesitan un servicio y quienes lo ofrecen.
              Nos esforzamos por crear un ecosistema donde la calidad, la rapidez y la confianza sean los pilares de cada conexión entre clientes y trabajadores.
            </p>
            <div className="mt-6 flex justify-center items-center flex-1">
              <img src="/oficios.jpg" alt="Trabajador 1" className="rounded-lg h-full object-cover w-80" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white p-8 text-center">
        <div className='mx-[2%] lg:mx-[8%] 2xl:mx-[12%]'>
          <h2 className="font-bold">¿Por qué elegirnos?</h2>
          <ul className="my-8 text-left mx-auto grid grid-cols-2 gap-16">
            <li>
              <h5 className='font-semibold'>✅ Profesionales Verificados</h5>
              <p className='text-justify'>Cada trabajador en nuestra plataforma pasa por un proceso de validación para garantizar seguridad y confianza.</p>
            </li>
            <li>
              <h5 className='font-semibold'>⭐ Reseñas y Calificaciones</h5>
              <p className='text-justify'>Consulta opiniones de otros clientes para tomar decisiones informadas antes de contratar un servicio.</p>
            </li>
            <li>
              <h5 className='font-semibold'>📅 Reserva Fácil y Rápida</h5>
              <p className='text-justify'>Agenda servicios en pocos pasos y recibe confirmaciones al instante.</p>
            </li>
            <li>
              <h5 className='font-semibold'>🔍 Búsqueda Inteligente</h5>
              <p className='text-justify'>Filtra por categoría, ubicación y calificaciones para encontrar el profesional que mejor se adapte a tus necesidades.</p>
            </li>
            <li>
              <h5 className='font-semibold'>🚀 Oportunidades para Profesionales</h5>
              <p>Si eres técnico o especialista en mantenimiento, nuestra plataforma te ayuda a encontrar más clientes y hacer crecer tu negocio.</p>
            </li>
            <li>
              <h5 className='font-semibold'>💳 Pagos Seguros</h5>
              <p className='text-justify'>Opciones de pago en línea con garantía de seguridad y transparencia.</p>
            </li>
          </ul>
          <p className="mt-10 font-bold">😉Encuentra el mejor servicio o da a conocer tus habilidades, todo en un solo lugar.</p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center bg-secondary my-8">
        <div className='mx-36 my-8 text-center'>
          <div className='flex justify-center mb-8'>
            <Image
              src={logoContraste}
              alt="logo"
              className='w-64 mx-auto'
            />
          </div>
          <div>
          <p className='font-semibold mb-8'>Nuestros usuarios encuentran 10 veces más profesionales  que en cualquier otro lugar.</p>
          </div>
          <div className='flex flex-col items-center mb-8'>
            <button className="bg-primary text-secondary font-bold px-6 py-3 rounded-lg mt-4 w-11/12 hover:bg-quaternary">
              <h3>Buscar Servicio...</h3>
            </button>
          </div>
        </div>
      </ section>
    </div>
  );
}