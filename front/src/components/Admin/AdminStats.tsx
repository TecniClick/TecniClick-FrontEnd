'use client'
import React, { useEffect, useState } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  ArcElement, 
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip, 
  Legend 
} from 'chart.js'
import Image from 'next/image'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

type StatsData = {
  summary: {
    totalUsers: number
    activeUsers: number
    inactiveUsers: number
    totalServices: number
    activeServices: number
    pendingServices: number
    rejectedServices: number
    approvalRate: number
    totalAppointments: number
    pendingAppointments: number
  }
  services?: {
    category: string
    count: number
  }[]
}

export default function AdminStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [summaryRes, servicesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/summary`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/servicesdistribution`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        ])

        if (!summaryRes.ok || !servicesRes.ok) {
          throw new Error('Error al cargar estadísticas')
        }

        setStats({
          summary: await summaryRes.json(),
          services: await servicesRes.json()
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-red-500 dark:text-red-400">
        Error: {error}
      </div>
    )
  }

  if (!stats) return null

  // Preparar datos para gráficos
  const serviceCategories = stats.services?.map(item => item.category || 'Sin categoría') || []
  const serviceCounts = stats.services?.map(item => item.count) || []

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Estadísticas Generales
        </h2>
        <div className="flex items-center space-x-2">
          <Image 
            src="/icons/chart.svg" 
            width={20} 
            height={20} 
            alt="Estadísticas" 
            className="dark:invert"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Actualizado en tiempo real
          </span>
        </div>
      </div>

      {/* Sección de Usuarios */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Usuarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            title="Total de Usuarios" 
            value={stats.summary.totalUsers}
            trend="up"
            icon="👥"
          />
          <StatCard 
            title="Usuarios Activos" 
            value={stats.summary.activeUsers}
            trend="stable"
            icon="✅"
          />
          <StatCard 
            title="Usuarios Inactivos" 
            value={stats.summary.inactiveUsers}
            trend={stats.summary.inactiveUsers > 0 ? "down" : "stable"}
            icon="❌"
          />
        </div>
      </div>

      {/* Sección de Servicios */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Servicios</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            title="Total de Servicios" 
            value={stats.summary.totalServices}
            trend="up"
            icon="🛠️"
          />
          <StatCard 
            title="Servicios Activos" 
            value={stats.summary.activeServices}
            trend="up"
            icon="✔️"
          />
          <StatCard 
            title="Servicios Pendientes" 
            value={stats.summary.pendingServices}
            trend={stats.summary.pendingServices > 0 ? "down" : "stable"}
            icon="⏳"
          />
          <StatCard 
            title="Servicios Rechazados" 
            value={stats.summary.rejectedServices}
            trend={stats.summary.rejectedServices > 0 ? "down" : "stable"}
            icon="✖️"
          />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard 
            title="Tasa de Aprobación" 
            value={`${stats.summary.approvalRate}%`}
            trend={stats.summary.approvalRate > 70 ? "up" : "down"}
            icon="📈"
            fullWidth
          />
        </div>
      </div>

      {/* Sección de Citas */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Citas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard 
            title="Total de Citas" 
            value={stats.summary.totalAppointments}
            trend="up"
            icon="📅"
            fullWidth
          />
          <StatCard 
            title="Citas Pendientes" 
            value={stats.summary.pendingAppointments}
            trend={stats.summary.pendingAppointments > 0 ? "down" : "stable"}
            icon="⏳"
            fullWidth
          />
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 dark:text-white mb-4">
            Distribución de Servicios
          </h3>
          <div className="h-64">
            <Doughnut
              data={{
                labels: serviceCategories,
                datasets: [{
                  data: serviceCounts,
                  backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
                    '#9966FF', '#FF9F40', '#8AC24A', '#EA80FC'
                  ],
                  borderWidth: 1
                }]
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: '#6B7280',
                      font: {
                        size: 12
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 dark:text-white mb-4">
            Servicios por Categoría
          </h3>
          <div className="h-64">
            <Bar
              data={{
                labels: serviceCategories,
                datasets: [{
                  label: 'Cantidad',
                  data: serviceCounts,
                  backgroundColor: '#3B82F6',
                  borderRadius: 4
                }]
              }}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#E5E7EB'
                    },
                    ticks: {
                      color: '#6B7280'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: '#6B7280'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ 
  title, 
  value, 
  trend, 
  icon,
  fullWidth = false
}: {
  title: string
  value: number | string
  trend?: 'up' | 'down' | 'stable'
  icon: string
  fullWidth?: boolean
}) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    stable: 'text-yellow-500'
  }

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 border border-gray-100 dark:border-gray-700 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`text-2xl ${trend ? trendColors[trend] : ''}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}