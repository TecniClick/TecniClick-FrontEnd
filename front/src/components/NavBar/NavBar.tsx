import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import DarkMode from "../DarkMode/DarkMode";
import { IoSearch } from "react-icons/io5";
import { MdLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";

const NavBar = () => {
    return (
        <>
            <nav className="hidden md:flex mx-6 lg:mx-36">
                <ul className="flex flex-row justify-between items-center text-secondary font-semibold w-full">
                    <div>
                        <Link href="/">
                            <button>
                                <Image
                                    className="w-20"
                                    src={logo}
                                    alt="logo"
                                />
                            </button>
                        </Link>
                    </div>
                    <li className="btn-hundido"><Link href="/services">Buscar Servicios</Link></li>
                    <li className="btn-hundido"><Link href="/contact">Contacto</Link></li>
                    <li className="btn-hundido"><Link href="/register">Registrarse</Link></li>
                    <li className="btn-hundido"><Link href="/login">Iniciar Sesión</Link></li>
                    <li><DarkMode /></li>
                </ul>
            </nav>

            {/* NavBar para pantallas pequeñas!! */}

            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-primary border-t shadow-md z-50">
                <ul className="flex justify-around items-center text-secondary font-semibold py-2">
                    <li><Link className="hover:text-quaternary transition" href="/"><Image className="w-10" src={logo} alt="logo" /></Link></li>
                    <li><Link className="hover:text-quaternary transition" href="/services"><IoSearch size={30} /></Link></li>
                    <li><Link className="hover:text-quaternary transition" href="/contact"><FaEnvelope size={30}/></Link></li>
                    <li><Link className="hover:text-quaternary transition" href="/register"><FaUserPlus size={30} /></Link></li>
                    <li><Link className="hover:text-quaternary transition" href="/login"><MdLogin size={30} /></Link></li>
                </ul>
            </nav>
        </>
    );
};

export default NavBar;