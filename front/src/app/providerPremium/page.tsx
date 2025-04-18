import Benefits from "@/components/Benefits/Benefits"
import SubscriptionForm from "@/components/SubscriptionForm/SubscriptionForm"

export const metadata = {
  title: "Plan Premium | TecniClick",
};

export default function providerPremium() {
  return (
    <main className="bg-gradient-navbar dark:bg-tertiary max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-secondary mb-8">
        Mejora tu perfil: Sé un Proveedor Premium
      </h1>
      <Benefits />
      <SubscriptionForm />
    </main>
  )
}
