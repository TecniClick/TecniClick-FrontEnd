import CreateCategoryBlock from "@/components/Admin/CreateCategory";
import PendingRequests from "@/components/Admin/PendingRequests";
import { StatsBlock } from "@/components/Admin/StatsBlock";
import { WelcomeBlock } from "@/components/Admin/WelcomeBlock";
import UserSearcherBlock from "@/components/Admin/UserSearcherBlock";
import UserTableBlock from "@/components/Admin/UserTableBlock";
import CreateAdminBlock from "@/components/Admin/CreateAdminBlock";
import AdminStats from "@/components/Admin/AdminStats";
import AdminProtect from "@/components/RouteProtect/AdminProtect";
import ReviewSearchModalBlock from "@/components/Admin/ReviewSearcher";

export const metadata = {
  title: "Panel de Administración | TecniClick",
};

export default function AdminDashboard() {
  return (
    <AdminProtect>
      <div className="p-6 space-y-6">
        {/* Fila 1: Encabezado y Estadísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <WelcomeBlock />
          </div>
          <div className="lg:col-span-3">
            <StatsBlock />
          </div>
        </div>

        {/* Fila 2: Estadísticas Avanzadas */}
        <div className="grid grid-cols-1 gap-6">
          <AdminStats />
        </div>

        {/* Fila 3: Gestión Rápida */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PendingRequests />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <CreateCategoryBlock />
            <CreateAdminBlock />
          </div>
        </div>

        {/* Fila 4: Gestión de Usuarios */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <UserSearcherBlock />
          </div>
          <div className="lg:col-span-3">
            <UserTableBlock />
          </div>
        </div>

        {/* Fila 5: Reseñas y Moderación */}
        <div className="grid grid-cols-1 gap-6">
          <ReviewSearchModalBlock />
        </div>
      </div>
    </AdminProtect>
  );
}