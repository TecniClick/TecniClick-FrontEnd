"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { updateServiceProfileToPremium } from "@/services/profileService";
import { FormEvent } from "react";

export default function SubscriptionForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe no está listo todavía.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("No se pudo obtener el elemento de tarjeta.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error(error.message || "Error procesando la tarjeta.");
    } else if (paymentMethod) {
      const response = updateServiceProfileToPremium(paymentMethod.id, 1000);
      toast.promise(response, {
        loading: "Espere mientras registramos el pago...",
        success: () => {
          cardElement.clear();
          return "Se registró exitosamente como Usuario Premium";
        },
        error: (data) =>
          `Error al registrar el pago (${data || "pruebe otro método"})`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <CardElement className="p-2 border-2" />
      <button
        type="submit"
        className="w-full bg-primary hover:bg-quaternary text-white py-2 rounded-md mt-4"
      >
        Suscribirme
      </button>
    </form>
  );
}
