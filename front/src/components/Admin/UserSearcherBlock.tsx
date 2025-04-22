'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'provider'
  createdAt: string
  phone: string
  address: string
  imgUrl: string
  deletedAt: string | null
  serviceProfile?: {
    id: string
    serviceTitle: string
    rating: number | null
    appointmentPrice: string
    description?: string
    category?: {
      id: string
      name: string
    }
  }
}

const UserSearcherBlock = () => {
  const [userId, setUserId] = useState('')
  const [foundUser, setFoundUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSearch = async () => {
    if (!userId.trim()) {
      setError('Por favor ingresa un ID de usuario')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (response.status === 401) {
        throw new Error('Unauthorized')
      }

      if (!response.ok) {
        throw new Error('Usuario no encontrado')
      }

      const userData = await response.json()
      setFoundUser({
        ...userData,
        // Aseguramos que serviceProfile esté presente si existe
        serviceProfile: userData.serviceProfile || undefined
      })
      setIsModalOpen(true)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Unauthorized') {
          localStorage.removeItem('token')
          router.push('/login')
        } else {
          setError(err.message)
        }
      } else {
        setError('Error desconocido al buscar usuario')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = () => {
    if (foundUser?.deletedAt === null) {
      setShowDeleteConfirmation(true)
    }
  }

  const confirmDelete = async () => {
    if (!foundUser || foundUser.deletedAt !== null) return
    
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/softDelete/${foundUser.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 401) {
        throw new Error('Unauthorized')
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const updatedUser = await response.json()
      setFoundUser({
        ...updatedUser,
        // Mantenemos la relación con serviceProfile si existe
        serviceProfile: updatedUser.serviceProfile || foundUser.serviceProfile
      })
      alert(`Usuario ${foundUser.name} desactivado correctamente`)
      setShowDeleteConfirmation(false)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Unauthorized') {
          localStorage.removeItem('token')
          router.push('/login')
        } else {
          setError(err.message)
          alert(`Error al desactivar: ${err.message}`)
        }
      } else {
        setError('Error desconocido al desactivar usuario')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Buscar Usuario</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
        Busca usuarios por ID para moderar cuentas que infrinjan las normas de la plataforma.
      </p>
      
      <div className="flex gap-4">
        <input
          type="text"
          placeholder='Ingresa el ID del usuario'
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value)
            setError(null)
          }}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* Modal de detalles */}
      {isModalOpen && foundUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Detalles del Usuario
            </h3>

            <div className="flex items-start gap-4 mb-4">
              <Image
                src={foundUser.imgUrl}
                alt="Avatar"
                className="w-16 h-16 rounded-full border border-gray-200 dark:border-gray-600"
              />
              <div>
                <p className="font-semibold text-lg text-gray-800 dark:text-white">{foundUser.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{foundUser.email}</p>
                <span className={`mt-1 px-2 py-1 rounded-full text-xs ${
                  foundUser.deletedAt === null
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {foundUser.deletedAt === null ? 'Activo' : 'Desactivado'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-800 dark:text-white">
              <div>
                <p><strong>Rol:</strong> {foundUser.role === 'provider' ? 'Prestador' : 'Cliente'}</p>
                <p><strong>Teléfono:</strong> {foundUser.phone}</p>
                <p><strong>Registro:</strong> {new Date(foundUser.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p><strong>Dirección:</strong> {foundUser.address}</p>
                <p><strong>ID:</strong> {foundUser.id}</p>
              </div>
            </div>

            {/* Sección de ServiceProfile - RESTAURADA */}
            {foundUser.role === 'provider' && foundUser.serviceProfile && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="font-semibold text-gray-800 dark:text-white mb-2">Perfil de Servicio:</p>
                <p><strong>Servicio:</strong> {foundUser.serviceProfile.serviceTitle}</p>
                <p><strong>Precio:</strong> ${foundUser.serviceProfile.appointmentPrice}</p>
                <p><strong>Rating:</strong> {foundUser.serviceProfile.rating ?? 'Sin calificaciones'}</p>
                {foundUser.serviceProfile.description && (
                  <p><strong>Descripción:</strong> {foundUser.serviceProfile.description}</p>
                )}
                {foundUser.serviceProfile.category && (
                  <p><strong>Categoría:</strong> {foundUser.serviceProfile.category.name}</p>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                disabled={foundUser.deletedAt !== null || isLoading}
                className={`px-4 py-2 rounded-lg ${
                  foundUser.deletedAt === null
                    ? isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white`}
              >
                {foundUser.deletedAt === null 
                  ? (isLoading ? 'Procesando...' : 'Desactivar Usuario') 
                  : 'Usuario Desactivado'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {showDeleteConfirmation && foundUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Confirmar Desactivación
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ¿Estás seguro de desactivar este usuario{foundUser.serviceProfile ? ' y su perfil de servicio' : ''}?
            </p>
            
            <div className="bg-yellow-50 dark:bg-gray-700 p-3 rounded mb-4">
              <p className="text-sm font-medium">ID: {foundUser.id}</p>
              <p className="text-sm">Nombre: {foundUser.name}</p>
              <p className="text-sm">Email: {foundUser.email}</p>
              {foundUser.serviceProfile && (
                <p className="text-sm">Servicio: {foundUser.serviceProfile.serviceTitle}</p>
              )}
            </div>
            
            <ul className="list-disc pl-5 mb-6 text-gray-600 dark:text-gray-300 space-y-1">
              <li>No podrá iniciar sesión</li>
              {foundUser.serviceProfile && <li>Sus servicios no serán visibles</li>}
              <li>Puedes reactivarlo manualmente después</li>
            </ul>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg text-white ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isLoading ? 'Procesando...' : 'Confirmar Desactivación'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserSearcherBlock