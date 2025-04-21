import Link from "next/link";

export default function ServiceButton({ params }: { params: string[] }) {
    return (
        <Link
            href={params[0]}
            className="px-6 py-2 rounded-lg bg-quaternary dark:bg-quinary text-white font-semibold hover:scale-105 transition-all text-center"
        >
            {params[1]}
        </Link>
    );
}
