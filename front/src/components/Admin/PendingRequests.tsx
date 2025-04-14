'use client'
import React, { useEffect, useState } from 'react'

type Request = {
    id: string
    name: string
    email: string
    date: string
    status: 'pendiente' | 'aprobado' | 'rechazado'
    serviceTitle: string
    description: string
    phone: string
    address: string
    rating: number
    category: string
    documentImageUrl: string
  }

  const dummyRequests: Request[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@mail.com',
      date: '2025-04-11',
      status: 'pendiente',
      serviceTitle: 'Electricista Profesional',
      description: 'Instalaciones eléctricas residenciales y comerciales.',
      phone: '3001234567',
      address: 'Cra 45 #32-21, Medellín',
      rating: 4.8,
      category: 'Electricidad',
      documentImageUrl: 'https://via.placeholder.com/300x200.png?text=Documento'
    },
    {
      id: '2',
      name: 'Luisa Gómez',
      email: 'luisa@mail.com',
      date: '2025-04-10',
      status: 'pendiente',
      serviceTitle: 'Plomería Integral',
      description: 'Reparaciones y mantenimiento de redes hidráulicas.',
      phone: '3007654321',
      address: 'Calle 10 #23-45, Bogotá',
      rating: 4.6,
      category: 'Plomería',
      documentImageUrl: 'https://via.placeholder.com/300x200.png?text=Documento'
    },
    {
        id: '3',
        name: 'Paco Perez',
        email: 'Paco@mail.com',
        date: '2025-04-10',
        status: 'pendiente',
        serviceTitle: 'Plomería Integral',
        description: 'Reparaciones y mantenimiento de redes hidráulicas.',
        phone: '3007654321',
        address: 'Calle 10 #23-45, Bogotá',
        rating: 4.6,
        category: 'Plomería',
        documentImageUrl: 'https://via.placeholder.com/300x200.png?text=Documento'
    },
    {
        id: '4',
        name: 'Andres Marulanda',
        email: 'Andres@mail.com',
        date: '2025-04-10',
        status: 'pendiente',
        serviceTitle: 'Plomería Integral',
        description: 'Reparaciones y mantenimiento de redes hidráulicas.',
        phone: '3007654321',
        address: 'Calle 10 #23-45, Bogotá',
        rating: 4.6,
        category: 'Plomería',
        documentImageUrl: 'https://via.placeholder.com/300x200.png?text=Documento'
    },
    {
        id: '5',
        name: 'Juan Carlos Pelota',
        email: 'Juan@mail.com',
        date: '2025-04-10',
        status: 'pendiente',
        serviceTitle: 'Plomería Integral',
        description: 'Reparaciones y mantenimiento de redes hidráulicas.',
        phone: '3007654321',
        address: 'Calle 10 #23-45, Bogotá',
        rating: 4.6,
        category: 'Electricista',
        documentImageUrl: 'https://via.placeholder.com/300x200.png?text=Documento'
    }
  ]

  const PendingRequests = () => {
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  
    // ✅ Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
      if (selectedRequest) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
    }, [selectedRequest])
  
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex flex-1 flex-col gap-2">
        <h2 className="text-xl font-bold pb-4 text-gray-800 dark:text-white">Solicitudes Pendientes</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-8">
            Usuarios que solicitan convertirse en proveedores de servicios. Revisa y aprueba sus solicitudes.
          </p>
        <div className="overflow-x-auto px-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent' }}>
            <div className="flex space-x-4">
            {dummyRequests.map((req) => (
                <div
                key={req.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 flex flex-col justify-between w-[250px] shrink-0"
                >
                <div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{req.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{req.email}</p>
                </div>
                <button
                    className="text-blue-600 dark:text-blue-400 hover:underline mt-2 self-start"
                    onClick={() => setSelectedRequest(req)}
                >
                    Revisar
                </button>
                </div>
            ))}
            </div>
        </div>
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl relative transform transition-all duration-300 scale-100 opacity-100">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                onClick={() => setSelectedRequest(null)}
              >
                ✕
              </button>
  
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Detalles de la Solicitud
              </h3>
  
              <div className="space-y-2 text-gray-800 dark:text-white">
                <p><strong>Nombre:</strong> {selectedRequest.name}</p>
                <p><strong>Email:</strong> {selectedRequest.email}</p>
                <p><strong>Teléfono:</strong> {selectedRequest.phone}</p>
                <p><strong>Dirección:</strong> {selectedRequest.address}</p>
                <p><strong>Título del servicio:</strong> {selectedRequest.serviceTitle}</p>
                <p><strong>Descripción:</strong> {selectedRequest.description}</p>
                <p><strong>Categoría:</strong> {selectedRequest.category}</p>
                <p><strong>Precio:</strong> ${selectedRequest.rating}</p>
  
                {selectedRequest.documentImageUrl && (
                  <div className="mt-4">
                    <p className="font-semibold">Documento:</p>
                    <img
                      src={selectedRequest.documentImageUrl}
                      alt="Documento"
                      className="w-full max-w-sm rounded border"
                    />
                  </div>
                )}
              </div>
  
              <div className="mt-6 flex justify-end space-x-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Aprobar
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Rechazar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  export default PendingRequests