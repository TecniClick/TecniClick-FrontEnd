'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type User = {
  id: string
  name?: string | null
  email?: string | null
  role?: 'customer' | 'provider' | null
  imgUrl?: string | null
  deletedAt?: string | null
  createdAt: string
}

const ITEMS_PER_PAGE = 5

const UserTableBlock = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [currentUsers, setCurrentUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const router = useRouter()

  const fetchUsers = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/active`,
        { 
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          } 
        }
      )

      if (response.status === 401) throw new Error('Unauthorized')
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

      const users = await response.json()
      const processedUsers = users.map((user: User) => ({
        ...user,
        name: user.name || 'Sin nombre',
        email: user.email || 'Sin email',
        role: user.role || 'customer',
        imgUrl: user.imgUrl || null
      }))
      
      setAllUsers(processedUsers)
      updatePaginatedUsers(processedUsers, 1)

    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Unauthorized') {
          localStorage.removeItem('token')
          router.push('/login')
        } else {
          setError(err.message)
        }
      } else {
        setError('Error desconocido al cargar usuarios')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const updatePaginatedUsers = (users: User[], page: number) => {
    const filteredUsers = users.filter(user => {
      const searchTermLower = searchTerm.toLowerCase()
      const nameLower = user.name?.toLowerCase() || ''
      const emailLower = user.email?.toLowerCase() || ''
      const roleLower = user.role?.toLowerCase() || ''

      return (
        nameLower.includes(searchTermLower) ||
        emailLower.includes(searchTermLower) ||
        roleLower.includes(searchTermLower)
      )
    })

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
    setTotalPages(totalPages > 0 ? totalPages : 1)
    setCurrentPage(page > totalPages ? 1 : page)

    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    setCurrentUsers(paginatedUsers)
  }

  const handleDelete = async () => {
    if (!selectedUser) return

    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/softDelete/${selectedUser.id}`,
        { 
          method: 'PATCH',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 401) throw new Error('Unauthorized')
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

      setAllUsers(prev => prev.map(user => 
        user.id === selectedUser.id ? { ...user, deletedAt: new Date().toISOString() } : user
      ))
      updatePaginatedUsers(allUsers, currentPage)
      setShowDeleteConfirmation(false)

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error desconocido al desactivar usuario')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      updatePaginatedUsers(allUsers, 1)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Gestión de Usuarios Activos</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Busca y administra usuarios activos en la plataforma
      </p>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, email o rol..."
          className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute left-3 top-2.5 text-gray-400">
          🔍
        </span>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Usuario</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rol</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registro</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {user.imgUrl ? (
                        <Image 
                          src={user.imgUrl}
                          width={32}
                          height={32}
                          className="rounded-full"
                          alt={`Avatar de ${user.name}`}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/default-avatar.png'
                            target.onerror = null
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {user.name?.charAt(0).toUpperCase() || '?'}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {user.name || 'Sin nombre'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.email || 'Sin email'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                    {user.role === 'provider' ? 'Prestador' : 'Cliente'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => {
                        setSelectedUser(user)
                        setShowDeleteConfirmation(true)
                      }}
                      disabled={user.deletedAt !== null || isLoading}
                      className={`px-3 py-1 text-sm rounded-md ${
                        user.deletedAt || isLoading
                          ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 cursor-not-allowed' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      Desactivar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                  {isLoading ? 'Cargando usuarios...' : 'No se encontraron usuarios'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => updatePaginatedUsers(allUsers, currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 text-gray-800 dark:text-white"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => updatePaginatedUsers(allUsers, currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 text-gray-800 dark:text-white"
          >
            Siguiente
          </button>
        </div>
      )}

      {showDeleteConfirmation && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Confirmar Desactivación</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              ¿Estás seguro de desactivar al usuario <strong>{selectedUser.name || 'Sin nombre'}</strong> ({selectedUser.role === 'provider' ? 'Prestador' : 'Cliente'})?
            </p>
            <div className="bg-yellow-50 dark:bg-gray-700 p-3 rounded mb-4">
              <p className="text-sm"><strong>Email:</strong> {selectedUser.email || 'Sin email'}</p>
              <p className="text-sm"><strong>Registro:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg text-white ${
                  isLoading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
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

export default UserTableBlock