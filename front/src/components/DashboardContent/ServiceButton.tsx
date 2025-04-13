import Link from "next/link";

export default function ServiceButton({ hasServices }: { hasServices: boolean }) {
    return (
        <Link
            href="/provider-edit"
            className="px-6 py-2 rounded-lg bg-quaternary dark:bg-quinary text-white font-semibold hover:scale-105 transition-all"
        >
            {hasServices ? "Editar tus servicios" : "Ofrecer un servicio"}
        </Link>
    );
}
