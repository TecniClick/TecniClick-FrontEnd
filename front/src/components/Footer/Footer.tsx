const Footer = () => {
    return (
        <div className="text-secondary mx-36">
            <div className="flex flex-row justify-between my-8">
                <ul className="text-left gap-4 grid grid-cols-2 ">
                    <li>🏠 Inicio</li>
                    <li>🔍 Buscar Servicios</li>
                    <li>👷‍♂️ Registrarse</li>
                    <li>📄 Términos y Condiciones</li>
                    <li>🔒 Política de Privacidad</li>
                    <li>📩 Contacto</li>
                </ul>
                <div className="flex flex-col items-center">
                    <h6 className="font-bold mb-4">📲 Síguenos en Redes Sociales</h6>
                    <ul className="text-justify grid grid-cols-2 gap-4">
                        <li>🌐 Facebook</li>
                        <li>|📸 Instagram</li>
                        <li>🐦 Twitter</li>
                        <li>|💼 LinkedIn</li>
                    </ul>
                </div>
            </div>
            <h6 className="text-center justify-center">© 2025 TecniClick. Todos los derechos reservados.</h6>
        </div>
    );
};


export default Footer;