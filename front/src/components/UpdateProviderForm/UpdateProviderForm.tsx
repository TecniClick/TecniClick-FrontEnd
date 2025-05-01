"use client";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext"; // Ajusta la importación según tu estructura de proyecto
import { getCategories } from "@/services/categoryService"; // Ajusta la importación de la función que obtiene las categorías
import { updateServiceProfile } from "@/services/profileService"; // Ajusta la importación según tu estructura
import { FaXmark } from "react-icons/fa6";
import providerFormValidatorsUpdate from "@/helpers/providerFormValidatorsUpdate";

type CategoryType = { id: string; name: string }; // Ajusta según tu tipo real de categorías
type MediaTypes =  "certificate" | "gallery";
type addressType = {
    street: string;
    extNumber: string;
    intNumber: string;
    neighborhood: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
};
type galleriesType = {
    gallery: File[];
    certificate: File[];
    id_document: File[];
};
type ServiceRequestType = {
    serviceTitle: string;
    userName: string;
    address: addressType;
    description: string;
    appointmentPrice: number;
    phone: number;
    category: string;
};

type dataType = {
    title?: string;
    phone?: number;
    appointmentPrice?: number;
    description?: string;
};

const UpdateProviderForm = () => {
    const { user, token } = useAuth();
    const [data, setData] = useState<dataType>({
        title: "",
        phone: undefined,
        appointmentPrice: undefined,
        description: "",
    });
    const [name, setName] = useState(user?.name ?? "");
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const router = useRouter();
    const [address, setAddress] = useState<addressType>({
        street: "",
        extNumber: "",
        intNumber: "",
        neighborhood: "",
        zipCode: "",
        city: "",
        state: "",
        country: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof dataType | "id_document" | "profilePicture", string>>>({});
    const [newService, setNewService] = useState("");
    const [images, setImages] = useState<galleriesType>({
        gallery: [],
        certificate: [],
        id_document: [],
    });
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const profileInputRef = useRef<HTMLInputElement | null>(null);
    const certificateInputRef = useRef<HTMLInputElement | null>(null);
    const galleryInputRef = useRef<HTMLInputElement | null>(null);

    const mediaLabels: Record<MediaTypes, string> = {
        certificate: "Certificados",
        gallery: "Galería",
    };

    const addressLabels: Record<keyof typeof address, string> = {
        extNumber: "N° de domicilio",
        intNumber: "N° de apartamento(Opcional)",
        street: "Calle",
        neighborhood: "Barrio",
        zipCode: "Código postal",
        city: "Ciudad",
        state: "Estado / Provincia",
        country: "País",
    };

    useEffect(() => {
        if (user?.serviceProfile) {
            setData({
                title: user.serviceProfile.serviceTitle || "",
                phone: user.serviceProfile.phone ? Number(user.serviceProfile.phone) : undefined,
                appointmentPrice: user.serviceProfile.appointmentPrice || undefined,
                description: user.serviceProfile.description || "",
            });

            setName(user.name || "");

            setAddress({
                street: user.serviceProfile.address?.street || "",
                extNumber: user.serviceProfile.address?.extNumber || "",
                intNumber: user.serviceProfile.address?.intNumber || "",
                neighborhood: user.serviceProfile.address?.neighborhood || "",
                zipCode: user.serviceProfile.address?.zipCode || "",
                city: user.serviceProfile.address?.city || "",
                state: user.serviceProfile.address?.state || "",
                country: user.serviceProfile.address?.country || "",
            });

            setNewService(user.serviceProfile.category?.name || "");

            if (user.serviceProfile.profilePicture) {
                setProfilePicture(null); // Reset to null since the backend returns a URL
            }
        }
    }, [user]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesList = await getCategories();
            setCategories(categoriesList);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (data) {
            setErrors(providerFormValidatorsUpdate(data, profilePicture));
        }
    }, [data, images.id_document, profilePicture]);

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePicture(file);
        }
    };

    const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>, type: MediaTypes) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newFiles = Array.from(files);
            setImages((prev) => ({
                ...prev,
                [type]: [...prev[type], ...newFiles],
            }));
        }
    };

    const removeImage = (e: MouseEvent, index: number, imageType: MediaTypes) => {
        e.preventDefault();
        const updated = [...images[imageType]];
        updated.splice(index, 1);
        setImages((prev) => ({
            ...prev,
            [imageType]: updated,
        }));
    };

    const addressCheck = () => {
        return Object.entries(address).every(([key, value]) => {
            if (["extNumber", "street", "zipCode", "city", "state", "country"].includes(key)) {
                return value != null && value.toString().trim();
            }
            return true;
        });
    };

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const currentErrors = providerFormValidatorsUpdate(data, profilePicture);
        console.log("Errores actuales:", currentErrors);

        setErrors(currentErrors);

        if (Object.keys(currentErrors).length > 0) {
            toast.warning("Revisa los campos con errores.");
            return;
        }

        const selectedServiceCategory = categories.find(
            (cat) => cat.name.toLowerCase() === newService.toLowerCase()
        );

        if (!selectedServiceCategory) {
            toast.warning("Selecciona un servicio válido de la lista");
            return;
        }

        // 🎯 Validaciones de tipo MIME
        const profilePictureValid = profilePicture
            ? /^(image\/(jpeg|png|webp)|video\/(mp4|mov|avi))$/.test(profilePicture.type)
            : false;

        const allDocumentsValid = [...images.id_document, ...images.gallery, ...images.certificate].every(
            (file) => /^(image\/(jpeg|png|webp)|application\/pdf|video\/(mp4|mov|avi))$/.test(file.type)
        );

        if (!profilePictureValid) {
            toast.error("La imagen de perfil tiene un formato no permitido.");
            return;
        }

        if (!allDocumentsValid) {
            toast.error("Uno o más archivos tienen formatos no válidos. Aceptados: jpg, png, webp, pdf, mp4, mov, avi.");
            return;
        }

        if (
            token &&
            user &&
            data.title?.trim() &&
            name.trim() &&
            profilePicture &&
            data.description?.trim() &&
            typeof data.phone === "number" &&
            typeof data.appointmentPrice === "number" &&
            addressCheck()
        ) {
            const request: ServiceRequestType = {
                serviceTitle: data.title.trim(),
                userName: name.trim(),
                address,
                description: data.description.trim(),
                appointmentPrice: data.appointmentPrice,
                phone: data.phone,
                category: selectedServiceCategory.name,
            };

            // Aquí utilizamos `updateServiceProfile` directamente
            try {
                const updatedService = await updateServiceProfile(
                    user?.serviceProfile?.id!, // Asumimos que el usuario tiene un `id` válido
                    token,
                    request,
                    profilePicture,
                    images // Solo subimos los archivos necesarios
                );

                toast.success("Servicio actualizado con éxito.");
                router.push("/dashboard"); // Redirige después de la actualización
            } catch (error) {
                toast.error("Hubo un error al actualizar el servicio.");
            }
        } else {
            toast.warning("Rellena todos los campos obligatorios.");
        }
    };
    return (
        <form className="mx-auto w-[96vw] md:w-[90vw] xl:w-[80vw] max-w-[64rem] shadow-2xl oscuro space-y-4 p-4">
            {/* Campos base */}
            <div>
                <label className="block">Título del servicio</label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    className="w-full impunts impunts-2"
                />
                {errors.title && <p className="text-quinary">{errors.title}</p>}
            </div>

            <div>
                <label className="block">Teléfono</label>
                <input
                    type="number"
                    value={data.phone || ""}
                    onChange={(e) => setData({ ...data, phone: Number(e.target.value) })}
                    className="w-full impunts impunts-2"
                />
                {errors.phone && <p className="text-quinary">{errors.phone}</p>}
            </div>

            <div>
                <label className="block">Precio de turno</label>
                <input
                    type="number"
                    value={data.appointmentPrice || ""}
                    onChange={(e) => setData({ ...data, appointmentPrice: Number(e.target.value) })}
                    className="w-full impunts impunts-2"
                />
                {errors.appointmentPrice && <p className="text-quinary">{errors.appointmentPrice}</p>}
            </div>

            <div>
                <label className="block">Descripción</label>
                <textarea
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    className="w-full impunts impunts-2 h-[10vh] lg:h-[15vh]"
                />
                {errors.description && <p className="text-quinary">{errors.description}</p>}
            </div>

            <div>
                <label className="block">Categoría del servicio</label>
                <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full p-2 impunts impunts-2"
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && (
                    <ul className="border mt-1 max-h-40 overflow-y-auto">
                        {categories
                            .filter((cat) =>
                                cat.name.toLowerCase().includes(newService.toLowerCase())
                            )
                            .map((cat) => (
                                <li
                                    key={cat.id}
                                    className="cursor-pointer p-2 hover:bg-quaternary/40 hover:dark:bg-quinary/40 dark:bg-tertiary"
                                    onClick={() => setNewService(cat.name)}
                                >
                                    {cat.name}
                                </li>
                            ))}
                    </ul>
                )}
            </div>

            {/* Foto de perfil */}
            <div>
                <label className="block">Foto de perfil</label>
                <input
                    type="file"
                    accept="image/*"
                    ref={profileInputRef}
                    onChange={handleProfileImageChange}
                    className="buttons py-2 px-6 cursor-pointer"
                />

                {profilePicture ? (
                    <div className="relative w-[20vw] aspect-square bg-senary dark:bg-zinc-800">
                        <Image
                            src={typeof profilePicture === "string" ? profilePicture : URL.createObjectURL(profilePicture)}
                            alt="Imagen de perfil"
                            fill
                            style={{objectFit: "contain"}}
                        />
                        <button
                            className="relative top-1 right-1 p-1 cursor-pointer"
                            onClick={() => setProfilePicture(null)}
                        >
                            <FaXmark size={25} color="#d31f4f"/>
                        </button>
                    </div>
                ) : (
                    <p>No hay imagen de perfil seleccionada</p>
                )}

                {errors.profilePicture && <p className="text-quinary">{errors.profilePicture}</p>}
            </div>

            {/* Solo certificados y galería (sin id_document) */}
            {(["certificate", "gallery"] as const).map((type) => (
                <div key={type}>
                    <label className="block capitalize font-medium">{mediaLabels[type]}</label>
                    <input
                        type="file"
                        multiple
                        ref={type === "certificate" ? certificateInputRef : galleryInputRef}
                        onChange={(e) => handleGalleryUpload(e, type)}
                        className="buttons py-2 px-6 cursor-pointer"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 mt-2">
                        {images[type].map((file, index) => (
                            <div key={index} className="relative w-full aspect-video bg-senary dark:bg-zinc-800">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`Imagen ${type}`}
                                    fill
                                    style={{objectFit: "contain"}}
                                />
                                <button
                                    className="relative top-1 right-1 p-1 cursor-pointer"
                                    onClick={(e) => removeImage(e, index, type)}
                                >
                                    <FaXmark size={25} color="#d31f4f"/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Dirección */}
            <div className="border-2 rounded-md border-quaternary dark:border-quinary mx-2 p-3">
                <h4 className="font-bold mt-4 mb-2">Dirección</h4>
                {Object.entries(address).map(([key, value]) => (
                    <div key={key} className="mb-2">
                        <label className="block font-medium">
                            {addressLabels[key as keyof typeof address]}
                        </label>
                        <input
                            type="text"
                            value={value ?? ""}
                            onChange={(e) =>
                                setAddress((prev) => ({
                                    ...prev,
                                    [key]: e.target.value,
                                }))
                            }
                            className="w-full impunts impunts-2"
                        />
                    </div>
                ))}
            </div>

            {/* Botón */}
            <button
                onClick={submitHandler}
                className="buttons py-2 px-6"
            >
                Guardar Cambios
            </button>
        </form>
    );

}

export default UpdateProviderForm;