import CreateCategoryBlock from "@/components/Admin/CreateCategory";
import PendingRequests from "@/components/Admin/PendingRequests";
import { StatsBlock } from "@/components/Admin/StatsBlock";
import { WelcomeBlock } from "@/components/Admin/WelcomeBlock";
import UserSearcherBlock from "@/components/Admin/UserSearcherBlock";
import ReviewManagerBlock from "@/components/Admin/ReviewSearcher";
import UserTableBlock from "@/components/Admin/UserTableBlock";
import CreateAdminBlock from "@/components/Admin/CreateAdminBlock";
import AdminProtect from "@/components/RouteProtect/AdminProtect";
import ReviewSearchModalBlock from "@/components/Admin/ReviewSearcher";

export const metadata = {
  title: "Panel Administrativo | TecniClick",
};

export default function AdminDashboard() {
  return (
    <AdminProtect>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Header y Estadísticas */}
        <div className="lg:col-span-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <WelcomeBlock />
            </div>
            <div className="md:w-3/4">
              <StatsBlock />
            </div>
          </div>
        </div>

        {/* Primera Fila: Gestión Rápida */}
        <div className="lg:col-span-2">
          <PendingRequests />
        </div>
        <div className="lg:col-span-1">
          <CreateCategoryBlock />
        </div>
        <div className="lg:col-span-1">
          <CreateAdminBlock />
        </div>

        {/* Segunda Fila: Usuarios */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Gestión de Usuarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserSearcherBlock />
              <ReviewSearchModalBlock />
            </div>
            <div className="lg:col-span-1">
                <UserTableBlock />
            </div>
          </div>
        </div>
      </div>
    </AdminProtect>
  );
}