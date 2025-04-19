import Benefits from "@/components/Benefits/Benefits";
import PremiumClientWrapper from "@/components/SubscriptionForm/PremiumClientWrapper";

export const metadata = {
  title: "Plan Premium | TecniClick",
};

export default function ProviderPremiumPage() {
  return (
    <main className="bg-gradient-navbar dark:bg-tertiary max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-secondary mb-8">
        Mejora tu perfil: Sé un Proveedor Premium
      </h1>
      <Benefits />
      <section className="bg-white p-6 rounded-2xl shadow mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Suscribite por solo <span className="text-blue-600">$9.99/mes</span>
        </h2>
        <PremiumClientWrapper />
      </section>
    </main>
  );
}
