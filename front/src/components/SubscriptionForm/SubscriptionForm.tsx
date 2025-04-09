'use client'

import { useState } from "react"
import { toast } from "sonner"

export default function SubscriptionForm() {
    const [form, setForm] = useState({
        name: '',
        number: '',
        expiry: '',
        cvv: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validación simple
        if (Object.values(form).some(val => !val)) {
            toast.error("Por favor completá todos los campos.")
            return
        }

        // Envío simulado
        toast.success("¡Suscripción realizada con éxito!")
        setForm({ name: '', number: '', expiry: '', cvv: '' })
    }

    return (
        <section className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Suscribite por solo <span className="text-blue-600">$9.99/mes</span></h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block font-medium">Nombre del titular</label>
                    <input type="text" id="name" value={form.name} onChange={handleChange}
                        className="w-full mt-1 border px-3 py-2 rounded-md" />
                </div>
                <div>
                    <label htmlFor="number" className="block font-medium">Número de tarjeta</label>
                    <input type="text" id="number" value={form.number} onChange={handleChange}
                        maxLength={16} className="w-full mt-1 border px-3 py-2 rounded-md" />
                </div>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label htmlFor="expiry" className="block font-medium">Vencimiento</label>
                        <input type="text" id="expiry" value={form.expiry} onChange={handleChange}
                            placeholder="MM/AA" className="w-full mt-1 border px-3 py-2 rounded-md" />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="cvv" className="block font-medium">CVV</label>
                        <input type="text" id="cvv" value={form.cvv} onChange={handleChange}
                            maxLength={4} className="w-full mt-1 border px-3 py-2 rounded-md" />
                    </div>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-quaternary  text-white py-2 rounded-md mt-4">
                    Suscribirme
                </button>
            </form>
        </section>
    )
}
