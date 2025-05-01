"use client";

import { useAuth } from "@/contexts/authContext";
import providerFormValidators from "@/helpers/providerFormValidators";
import { addressType, CategoryType, galleriesType, MediaTypes, ServiceRequestType } from "@/helpers/typeMock";
import { getCategories } from "@/services/categoryService";
import { createServiceProfile } from "@/services/profileService";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, MouseEvent } from "react";
import { FaXmark } from "react-icons/fa6";
import { toast } from "sonner";

type dataType = {
  title?: string;
  phone?: number;
  appointmentPrice?: number;
  description?: string;
};

const ProviderEdit = () => {
  const { user, token, updateService } = useAuth();

  const [editing] = useState(true);
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
  const idDocumentInputRef = useRef<HTMLInputElement | null>(null);
  const certificateInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const mediaLabels: Record<MediaTypes, string> = {
    id_document: "Documento de identidad (DNI)",
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
    const fetchCategories = async () => {
      const categoriesList = await getCategories();
      setCategories(categoriesList);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (data) {
      setErrors(providerFormValidators(data, images.id_document, profilePicture));
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

    const currentErrors = providerFormValidators(data, images.id_document, profilePicture);
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

      const response = createServiceProfile(token, request, profilePicture, images);
      toast.promise(response, {
        loading: "Enviando Formulario...",
        success: (service) => {
          updateService(service);
          router.push("/dashboard");
          return `Formulario cargado exitosamente, un administrador validará la información y recibirás novedades por correo.`;
        },
        error: (data) => {
          return `Error al registrar el formulario (${data})`;
        },
      });
    } else {
      toast.warning("Rellena todos los campos obligatorios.");
    }
  };
  return (
    <form className="bg-quaternary/40 dark:bg-quinary/40 space-y-4 p-4">
      <div>
        <label className="block">Nombre del proveedor</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 dark:bg-tertiary"
        />
      </div>

      <div>
        <label className="block">Título del servicio</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full border p-2 dark:bg-tertiary"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="block">Teléfono</label>
        <input
          type="number"
          value={data.phone || ""}
          onChange={(e) => setData({ ...data, phone: Number(e.target.value) })}
          className="w-full border p-2 dark:bg-tertiary"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label className="block">Precio de turno</label>
        <input
          type="number"
          value={data.appointmentPrice || ""}
          onChange={(e) => setData({ ...data, appointmentPrice: Number(e.target.value) })}
          className="w-full border p-2 dark:bg-tertiary"
        />
        {errors.appointmentPrice && <p className="text-red-500">{errors.appointmentPrice}</p>}
      </div>

      <div>
        <label className="block">Descripción</label>
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="w-full border p-2 dark:bg-tertiary"
        />
        {errors.description && <p className="text-red-500">{errors.description}</p>}
      </div>

      <div>
        <label className="block">Categoría del servicio</label>
        <input
          type="text"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          className="w-full border p-2 dark:bg-tertiary"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {showSuggestions && (
          <ul className="border mt-1 max-h-40 overflow-y-auto ">
            {categories
              .filter((cat) =>
                cat.name.toLowerCase().includes(newService.toLowerCase())
              )
              .map((cat) => (
                <li
                  key={cat.id}
                  className="cursor-pointer p-2 hover:bg-gray-100 dark:bg-tertiary"
                  onClick={() => setNewService(cat.name)}
                >
                  {cat.name}
                </li>
              ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block">Foto de perfil</label>
        <input
          type="file"
          accept="image/*"
          ref={profileInputRef}
          onChange={handleProfileImageChange}
          className="block w-full"
        />
        {profilePicture && (
          <Image
            src={URL.createObjectURL(profilePicture)}
            alt="Preview"
            width={100}
            height={100}
            className="mt-2 object-cover"
          />
        )}
        {errors.profilePicture && <p className="text-red-500">{errors.profilePicture}</p>}
      </div>

      {/* Uploads por tipo */}
      {(["id_document", "certificate", "gallery"] as MediaTypes[]).map((type) => (
        <div key={type}>
          <label className="block capitalize font-medium">{mediaLabels[type]}</label>
          <input
            type="file"
            multiple
            ref={
              type === "id_document"
                ? idDocumentInputRef
                : type === "certificate"
                  ? certificateInputRef
                  : galleryInputRef
            }
            onChange={(e) => handleGalleryUpload(e, type)}
            className="block w-full cursor-pointer"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {images[type].map((file, index) => (
              <div key={index} className="relative w-24 h-24">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Imagen ${type}`}
                  fill
                  className="object-cover rounded"
                />
                <button
                  className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer"
                  onClick={(e) => removeImage(e, index, type)}
                >
                  <FaXmark />
                </button>
              </div>
            ))}
          </div>
          {type === "id_document" && errors.id_document && (
            <p className="text-red-500">{errors.id_document}</p>
          )}
        </div>
      ))}

      <div>
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
              className="w-full border p-2 dark:bg-tertiary"
            />
          </div>
        ))}
      </div>

      <button
        onClick={submitHandler}
        className="bg-blue-600 hover:bg-blue-700 dark:bg-quinary dark:hover:bg-red-500 text-white px-4 py-2 rounded"
      >
        Guardar Cambios
      </button>
    </form>
  );


};

export default ProviderEdit;
