import Link from "next/link";
import { FaEnvelope, FaFacebook, FaFileContract, FaHome, FaInstagram, FaLinkedin, FaSignInAlt, FaTwitter, FaUserPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="text-secondary bg-gradient-banner w-full text-xs px-4 md:px-8 xl:px-16 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start my-4 gap-4">
                <ul className="text-left grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <li><Link className="flex flex-row items-center gap-3 hover:text-quaternary transition " href="/"><FaHome  size={22} /> Inicio</Link></li>
                    <li><Link className="flex flex-row items-center gap-3  hover:text-quaternary transition" href="/services"><IoSearch size={22}/>Buscar Servicios</Link></li>
                    <li><Link className="flex flex-row items-center gap-3  hover:text-quaternary transition" href="/register"><FaUserPlus size={22}/>Registrarse  </Link></li>
                    <li><Link className="flex flex-row items-center gap-3  hover:text-quaternary transition" href="/ingresar"><FaSignInAlt size={22}/>Iniciar Sesión </Link></li>
                    <li><Link className="flex flex-row items-center gap-3  hover:text-quaternary transition" href="/contact"><FaEnvelope size={22}/>Contacto </Link></li>
                    <li><Link className="flex flex-row items-center gap-3  hover:text-quaternary transition" href="/terms"><FaFileContract size={22}/>Términos y Condiciones</Link></li>
                </ul>

                <div className="flex flex-col items-center">
                    <h6 className="font-bold mb-2"> Síguenos en Redes Sociales</h6>
                    <ul className="grid grid-cols-4 gap-4">
                        <li><a  href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook   className="hover:text-quaternary transition" size={22}/> </a></li>
                        <li><a  href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="hover:text-quaternary transition" size={22}/> </a></li>
                        <li><a  href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter     className="hover:text-quaternary transition" size={22}/>  </a></li>
                        <li><a  href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin   className="hover:text-quaternary transition" size={22}/> </a></li>
                    </ul>
                </div>
            </div>

            <h6 className="text-center text-sm mt-4">© 2025 TecniClick. Todos los derechos reservados.</h6>
        </footer>
    );
};

export default Footer;
