import AppointmentForm from "@/components/AppointmentForm/AppointmentForm";
import RouteProtect from "@/components/RouteProtect/RouteProtect";

export default function Page() {
  return (
    <RouteProtect>
      <AppointmentForm />
    </RouteProtect>
  );
}
