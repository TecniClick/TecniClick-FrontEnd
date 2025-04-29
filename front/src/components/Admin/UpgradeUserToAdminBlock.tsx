'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

const UpgradeUserToAdminBlock = () => {
  const [userId, setUserId] = useState('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  const searchUserById = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Validación estricta de UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(userId)) {
        throw new Error('Por favor ingrese un ID válido (formato UUID)')
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      if (response.status === 401) {
        throw new Error('No autorizado')
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al buscar usuario')
      }

      const user = await response.json()
      
      // Verificar que el usuario no sea ya administrador
      if (user.role === 'admin' || user.role === 'superadmin') {
        throw new Error('Este usuario ya tiene privilegios administrativos')
      }

      setSearchResults([user])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpgradeToAdmin = async () => {
    if (!selectedUser) return

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/upgrade-admin/${selectedUser.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 401) {
        throw new Error('No autorizado')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar usuario')
      }

      setSuccess(`Usuario ${selectedUser.name} convertido a administrador con éxito`)
      setSearchResults([])
      setUserId('')
      setSelectedUser(null)
      setShowConfirmation(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Convertir Usuario a Administrador</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Busque usuarios por ID para convertirlos en administradores
      </p>

      <form onSubmit={searchUserById} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID del Usuario (UUID)
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Ej: 123e4567-e89b-12d3-a456-426614174000"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            required
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            El ID debe estar en formato UUID válido
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || !userId.trim()}
          className={`w-full px-4 py-2 rounded-lg text-white ${
            isLoading || !userId.trim()
              ? 'bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Buscando...' : 'Buscar Usuario por ID'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
          {success}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {searchResults.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-800 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'customer' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {user.role === 'customer' ? 'Cliente' : user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => {
                        setSelectedUser(user)
                        setShowConfirmation(true)
                      }}
                      disabled={isLoading}
                      className="px-3 py-1 text-sm rounded-md bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Convertir a Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showConfirmation && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Confirmar Conversión</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              ¿Estás seguro de convertir a <strong>{selectedUser.name}</strong> ({selectedUser.email}) en administrador?
            </p>
            
            <div className="bg-yellow-50 dark:bg-gray-700 p-3 rounded mb-4">
              <p className="text-sm"><strong>ID:</strong> {selectedUser.id}</p>
              <p className="text-sm"><strong>Rol actual:</strong> {selectedUser.role === 'customer' ? 'Cliente' : selectedUser.role}</p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpgradeToAdmin}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg text-white ${
                  isLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isLoading ? 'Procesando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpgradeUserToAdminBlock