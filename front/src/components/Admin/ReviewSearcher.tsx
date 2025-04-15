'use client'
import React, { useState } from 'react'

type Review = {
  id: string
  rating: number
  comment: string
  createdAt: string
  user: {
    id: string
    name: string
    imgUrl: string
  }
  appointment?: {
    id: string
    date: string
  }
}

type ServiceProfile = {
  id: string
  serviceTitle: string
  userName: string
  rating: number
  description?: string
}

const ReviewSearchModalBlock = () => {
  const [providerId, setProviderId] = useState('')
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [providerInfo, setProviderInfo] = useState<ServiceProfile | null>(null)

  // Mock de búsqueda
  const handleSearch = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      if (providerId === 'provider-123') {
        setProviderInfo({
          id: 'provider-123',
          serviceTitle: 'Electricista Profesional',
          userName: 'Juan Pérez',
          rating: 4.5,
          description: 'Instalaciones eléctricas residenciales e industriales'
        })
        
        setReviews([
          {
            id: 'review-1',
            rating: 5,
            comment: 'Excelente trabajo, muy profesional y solucionó el problema rápidamente.',
            createdAt: '2025-04-15T14:30:00',
            user: {
              id: 'user-111',
              name: 'María Gómez',
              imgUrl: 'https://randomuser.me/api/portraits/women/65.jpg'
            },
            appointment: {
              id: 'appointment-1',
              date: '2025-04-15'
            }
          },
          {
            id: 'review-2',
            rating: 4,
            comment: 'Buen servicio aunque llegó con algo de retraso.',
            createdAt: '2025-04-10T10:15:00',
            user: {
              id: 'user-112',
              name: 'Carlos Rodríguez',
              imgUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
            }
          }
        ])
        setShowResultsModal(true)
      } else {
        alert('Proveedor no encontrado. Prueba con "provider-123"')
      }
      setIsLoading(false)
    }, 800)
  }

  const handleDeleteReview = (review: Review) => {
    setSelectedReview(review)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (!selectedReview) return
    
    setIsLoading(true)
    setTimeout(() => {
      setReviews(reviews.filter(r => r.id !== selectedReview.id))
      setSelectedReview(null)
      setShowDeleteModal(false)
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Buscar Reviews por Proveedor</h2>
      
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID del Proveedor
          </label>
          <input
            type="text"
            placeholder='Ingresa "provider-123" para probar'
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            value={providerId}
            onChange={(e) => setProviderId(e.target.value)}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'} text-white h-[42px]`}
        >
          {isLoading ? 'Buscando...' : 'Buscar Reviews'}
        </button>
      </div>

      {/* Modal de resultados */}
      {showResultsModal && providerInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            {/* Header del modal */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {providerInfo.serviceTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {providerInfo.userName} • Rating: {providerInfo.rating.toFixed(1)}/5
                </p>
                {providerInfo.description && (
                  <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                    {providerInfo.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowResultsModal(false)}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Contenido con scroll */}
            <div className="overflow-y-auto flex-1 p-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Reviews ({reviews.length})
              </h4>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div 
                      key={review.id} 
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={review.user.imgUrl}
                          alt={review.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white">
                                {review.user.name}
                              </p>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <span 
                                    key={i}
                                    className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteReview(review)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
                              title="Eliminar review"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          
                          <p className="mt-3 text-gray-700 dark:text-gray-300 italic">
                            "{review.comment}"
                          </p>
                          
                          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                            <p>
                              Fecha: {new Date(review.createdAt).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            {review.appointment && (
                              <p>Cita ID: {review.appointment.id}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    Este proveedor no tiene reviews aún.
                  </p>
                </div>
              )}
            </div>

            {/* Footer del modal */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setShowResultsModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-gray-800 dark:text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Eliminar Review
            </h3>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={selectedReview.user.imgUrl}
                  alt={selectedReview.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{selectedReview.user.name}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i}
                        className={`${i < selectedReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{selectedReview.comment}"
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ¿Estás seguro que deseas eliminar permanentemente este review?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg text-white ${
                  isLoading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
                } transition-colors`}
              >
                {isLoading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewSearchModalBlock