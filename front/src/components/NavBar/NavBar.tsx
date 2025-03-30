import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import DarkMode from "../DarkMode/DarkMode";

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
                    <li><Link href="/"><Image className="w-10" src={logo} alt="logo" /></Link></li>
                    <li><Link href="/services">🔍</Link></li>
                    <li><Link href="/contact">📩</Link></li>
                    <li><Link href="/register">👤</Link></li>
                    <li><Link href="/login">🙎🏻‍♂️</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default NavBar;