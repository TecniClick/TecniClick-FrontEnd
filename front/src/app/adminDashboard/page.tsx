import CreateCategoryBlock from "@/components/Admin/CreateCategory";
import PendingRequests from "@/components/Admin/PendingRequests";
import { StatsBlock } from "@/components/Admin/StatsBlock";
import { WelcomeBlock } from "@/components/Admin/WelcomeBlock";
import UserSearcherBlock from "@/components/Admin/UserSearcherBlock";
import ReviewManagerBlock from "@/components/Admin/ReviewSearcher";
import UserTableBlock from "@/components/Admin/UserTableBlock"; // Nuevo componente
import AdminProtect from "@/components/RouteProtect/AdminProtect";

export const metadata = {
  title: "Perfil de Administrador | TecniClick",
};

export default function AdminDashboard() {
  return (
    <AdminProtect>
      <div className="p-6 space-y-8">
        {/* Encabezado */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Panel de Administración</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestión integral de la plataforma TecniClick
          </p>
        </div>

        {/* Primera fila: Welcome y Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <WelcomeBlock />
          </div>
          <div className="lg:col-span-2">
            <StatsBlock />
          </div>
        </div>

        {/* Segunda fila: PendingRequests y CreateCategory */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PendingRequests />
          </div>
          <div className="lg:col-span-1">
            <CreateCategoryBlock />
          </div>
        </div>

        {/* Tercera fila: Gestión de Usuarios (Nueva sección unificada) */}
        <div className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Gestión de Usuarios
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Busca y modera cuentas de clientes y proveedores
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <UserSearcherBlock /> {/* Búsqueda por ID (existente) */}
            <UserTableBlock />    {/* Nueva tabla paginada */}
          </div>
        </div>

        {/* Cuarta fila: ReviewManager y espacio para futuros componentes */}
        <div className="grid grid-cols-1 gap-6">
          <ReviewManagerBlock />
        </div>
      </div>
    </AdminProtect>
  );
}