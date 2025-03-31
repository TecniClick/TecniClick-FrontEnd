'use client';
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ title: "", description: "", subject: "Consultas", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    setForm({ ...form, [e.target.name]: newValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.email) {
      toast.error("Todos los campos son obligatorios!");
      return;
    }

    toast.success("Mensaje enviado correctamente! En breve nos pondremos en contacto contigo.");
    setForm({ title: "", description: "", subject: "Consultas", email: "" });
  };


  return (
    <div className="container mx-auto my-8 p-4 bg-primary rounded">
      <h4 className="text-2xl text-center text-secondary font-bold mb-4">¿Tenes alguna consulta?🤔<br/>¿Necesitas reportar algún problema?🙋</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-tertiary">
        <select 
        name="subject"
        value={form.subject}
        onChange={handleChange}
        className="border p-2 rounded text-tertiary"
        >
          <option value="Consultas">Consulta</option>
          <option value="Reportes">Reporte</option>
          <option value="Denuncias">Denuncia</option>
         </select>
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={form.email}
          onChange={handleChange}
          
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Describe tu mensaje"
          value={form.description}
          onChange={handleChange}
          
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-secondary w-1/2 mx-auto text-primary font-bold py-2 rounded hover:bg-quaternary"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}
