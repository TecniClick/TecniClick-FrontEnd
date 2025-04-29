import RouteProtect from "@/components/RouteProtect/RouteProtect";
import UserDashboardEditForm from "@/components/UserDashboardEditForm/UserDashboardEditForm";

export const metadata = {
  title: "Editar mi perfil| TecniClick",
};

export default function Page() {
  return (
    <RouteProtect>
      <UserDashboardEditForm />
    </RouteProtect>
  );
}