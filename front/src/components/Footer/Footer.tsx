import Link from "next/link";

const Footer = () => {
    return (
        <footer className="text-secondary bg-primary w-full text-xs px-4 md:px-8 xl:px-16 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start my-4 gap-4">
                <ul className="text-left grid grid-cols-2 gap-4 underline">
                    <li><Link href="/">🏠 Inicio</Link></li>
                    <li><Link href="/services">🔍 Buscar Servicios</Link></li>
                    <li><Link href="/register">👤 Registrarse</Link></li>
                    <li><Link href="/ingresar">🙎🏻‍♂️ Iniciar Sesión</Link></li>
                    <li><Link href="/contact">📩 Contacto</Link></li>
                    <li><Link href="/terms">📄 Términos y Condiciones</Link></li>
                </ul>

                <div className="flex flex-col items-center">
                    <h6 className="font-bold mb-2">📲 Síguenos en Redes Sociales</h6>
                    <ul className="grid grid-cols-2 gap-2">
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐 Facebook</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">| 📸 Instagram</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">| 💼 LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <h6 className="text-center text-sm mt-4">© 2025 TecniClick. Todos los derechos reservados.</h6>
        </footer>
    );
};

export default Footer;
