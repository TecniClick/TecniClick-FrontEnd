import FormContact from "@/components/FormContact/FormContact";

export default function Contact() {
    return (
        <div className="mx-4 sm:mx-8 md:mx-40">
            <h2 className="font-bold py-8 text-2xl sm:text-3xl">Habla con nosotros</h2>
            <p className="text-justify text-sm sm:text-base">
                En <span className="font-semibold italic text-lg">Tecniclick</span> nos interesa la opinión de todos nuestros usuarios. <br />
                Por esa misma razón, te invitamos expresarte, completando el siguiente formulario.
            </p>
            <div className="mt-8">
                <FormContact />
            </div>
        </div>
    );
}
