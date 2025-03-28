import Image from "next/image";
import logo from "../../../public/logo.png"
import Link from "next/link";
const NavBar = () => {
    return (
        <nav className="mx-36">
            <ul className="flex flex-row justify-between items-center text-secondary font-semibold">
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
                <li className="btn-hundido"><Link href="/servicios">Buscar Servicios</Link></li>
                <li className="btn-hundido"><Link href="/contacto">Contacto</Link></li>
                <li className="btn-hundido"><Link href="/registrarse">Registrarse</Link></li>
                <li className="btn-hundido"><Link href="/ingresar">Iniciar Sesión</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;