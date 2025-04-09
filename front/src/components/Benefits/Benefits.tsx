export default function Benefits() {
    const benefits = [
        "✅ Más visibilidad en la plataforma",
        "✅ Acceso a clientes verificados",
        "✅ Soporte técnico prioritario",
        "✅ Herramientas de análisis avanzadas",
    ]

    return (
        <section className="bg-white p-6 rounded-2xl shadow mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ventajas de ser Premium</h2>
            <ul className="list-disc pl-5 space-y-2">
                {benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                ))}
            </ul>
        </section>
    )
}
