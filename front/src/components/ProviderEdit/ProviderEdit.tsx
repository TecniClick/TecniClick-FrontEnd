"use client";

import { useAuth } from "@/contexts/authContext";
import providerFormValidators from "@/helpers/providerFormValidators";
import { addressType, CategoryType, galleriesType, MediaTypes, ServiceRequestType } from "@/helpers/typeMock";
import { getCategories } from "@/services/categoryService";
import { createServiceProfile } from "@/services/profileService";

import Image from "next/image";
import { useState, useRef, useEffect, MouseEvent } from "react";
import { FaXmark } from "react-icons/fa6";
import { toast } from "sonner";

type dataType = {
  title?: string,
  phone?: number,
  appointmentPrice?: number,
  description?: string,
}

const ProviderEdit = () => {
  const { user, token, updateService } = useAuth();

  const [editing] = useState(true);
  const [data, setData] = useState<dataType>({
    title: "",
    phone: undefined,
    appointmentPrice: undefined,
    description: "",
  });  
  const [name, setName] = useState(user?.name);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [address, setAddress] = useState<addressType>({
    extNumber: "",
    intNumber: "",
    street: "",
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

  const handleGalleryUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: MediaTypes
  ) => {
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
    e.preventDefault()
    if (imageType == MediaTypes.ID_DOCUMENT) {
      const newImages = images.id_document.filter((_, i) => i !== index)
      setImages({ ...images, id_document: newImages })
    }
    if (imageType == MediaTypes.CERTIFICATE) {
      const newImages = images.certificate.filter((_, i) => i !== index)
      setImages({ ...images, certificate: newImages })
    }
    if (imageType == MediaTypes.GALLERY) {
      const newImages = images.gallery.filter((_, i) => i !== index)
      setImages({ ...images, gallery: newImages })
    }
  }

  const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.warning("Revisa los campos con errores.");
      return;
    }    
    const addressCheck  = () =>
      ["intNumber", "street", "zipCode", "city", "state", "country"].every(
        (key) => address[key as keyof addressType]?.toString().trim()
      );
    const selectedServiceCategory = categories.find(
      (cat) => cat.name.toLowerCase() === newService.toLowerCase()
    );
    if (!selectedServiceCategory) {
      toast.warning("Selecciona un servicio válido de la lista");
      return;
    }

    if (token && user && data && data.title && name && profilePicture && data.description && data.phone && data.appointmentPrice && addressCheck()) {
      const request: ServiceRequestType = {
        serviceTitle: data.title,
        userName: name,
        address,
        description: data.description,
        appointmentPrice: data.appointmentPrice,
        phone: data.phone,
        category: selectedServiceCategory.name,
      };
      
      const response = createServiceProfile(token, request, profilePicture, images)
      toast.promise(response, {
        loading: "Enviando Formulario...",
        success: (service) => {
          updateService(service)
          return `Formulario cargado exitosamente, un administrador validará la informacion y sus resultados llegarán en unos dias a su correo`;
        },
        error: (data) => {
          return `Error al registrar el cargar el formulario (${data})`;
        },
      });
      return
    }
    toast.warning('rellene los campos primero');
  };

  return (
    <div className="mx-[6%] p-[3%] oscuro shadow-lg space-y-6">
      <section className="flex items-center gap-4 border-b border-octonary">
        <div
          className="w-24 h-24 rounded-full bg-senary overflow-hidden relative cursor-pointer group"
          onClick={() => profileInputRef.current?.click()}
        >
          {profilePicture ? (
            <Image
              src={URL.createObjectURL(profilePicture)}
              alt="Perfil"
              className="w-full h-full object-cover !relative"
              fill
            />
          ) : (
            <span className="flex items-center justify-center h-full w-full text-tertiary text-sm">
              Foto
            </span>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
            Editar
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={profileInputRef}
            onChange={handleProfileImageChange}
          />
        </div>

        <div className="flex-1">
          {editing ? (
            <input
              value={name ?? ""}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-bold bg-transparent border-b border-octonary focus:outline-none w-full"
            />
          ) : (
            <h2 className="text-xl font-bold">{name}</h2>
          )}

          <input
            value={data?.title ?? ""}
            onChange={(e) => setData({...data, title :e.target.value})}
            placeholder="Titulo (ej. Electricista Matriculado)"
            className="text-sm text-opacity-90 focus:outline-none w-full bg-transparent"
          />

        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Descripcion del servicio</h3>
        {editing ? (
          <textarea
            value={data?.description ?? ""}
            onChange={(e) => setData({...data, description: e.target.value})}
            className="w-full text-sm impunts rounded-md p-2"
            placeholder="Trabajo de carpintero los dias de semana pintando paredes y aberturas"
            rows={4}
          />
        ) : (
          <p className="text-sm">{data?.description}</p>
        )}
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Servicio que ofrecerás</h3>
        {editing && (
          <div className="relative w-full flex flex-col sm:flex-row gap-2">
            <div className="flex flex-1 gap-2 relative">
              <input
                type="text"
                value={newService}
                onChange={(e) => {
                  setNewService(e.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Selecciona un servicio"
                className="flex-1 impunts rounded-md p-2 text-sm"
              />

              {showSuggestions && categories && newService.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-senary dark:bg-primary border rounded-md mt-1 max-h-48 overflow-y-auto z-10 shadow">
                  {categories
                    .filter((cat) =>
                      cat.name.toLowerCase().includes(newService.toLowerCase())
                    )
                    .map((cat) => (
                      <li
                        key={cat.id}
                        className="px-3 py-1 text-sm hover:bg-quaternary dark:hover:bg-septenary hover:bg-opacity-50 dark:hover:hover:bg-opacity-50 cursor-pointer"
                        onMouseDown={() => {
                          setNewService(cat.name);
                          setShowSuggestions(false);
                        }}
                      >
                        {cat.name}
                      </li>
                    ))}
                </ul>
              )}

            </div>
          </div>
        )}
      </section>

      <section className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex items-center p-4 lg:pr-0">
         <span className="text-nowrap mr-1">Precio base del servicio:</span>
          <input
            type="number"
            value={data?.appointmentPrice ?? ""}
            className="mx-[0_auto] flex-1 impunts rounded-sm p-2 text-md conter"
            onChange={(e) => {setData({...data, appointmentPrice: Number(e.target.value)});}} />
        </div>
        <div className="w-full lg:w-1/2 flex items-center p-4">
         <span className="text-nowrap mr-1">Numero de telefono:</span>
          <input
            type="number"
            value={data?.phone ?? ""}
            className="mx-[0_auto] flex-1 impunts rounded-sm p-2 text-md conter"
            onChange={(e) => {setData({...data, phone: Number(e.target.value)});}} />
        </div>
      </section>

      <section className="flex flex-row">
        <div className="flex flex-col w-2/5 lg:w-1/4 pr-1 justify-around my-[0_auto] flex-1 items-end">
          <span>Apartamento (opcional):</span>
          <span>Nroº de domicilio:</span>
          <span>Calle:</span>
          <span>Barrio (opcional):</span>
          <span>Codigo postal:</span>
          <span>Ciudad:</span>
          <span>Provincia / Estado:</span>
          <span>Pais:</span>
        </div>
        <div className="flex flex-col w-3/5 lg:w-3/4">
          <input type="text" value={address.extNumber ?? ""} onChange={(e) => {setAddress({ ...address, extNumber: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="number" value={address.intNumber ?? ""} onChange={(e) => {setAddress({ ...address, intNumber: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="text" value={address.street ?? ""} onChange={(e) => {setAddress({ ...address, street: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="text" value={address.neighborhood ?? ""} onChange={(e) => {setAddress({ ...address, neighborhood: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="number" value={address.zipCode ?? ""} onChange={(e) => {setAddress({ ...address, zipCode: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="text" value={address.city ?? ""} onChange={(e) => {setAddress({ ...address, city: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="text" value={address.state ?? ""} onChange={(e) => {setAddress({ ...address, state: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="text" value={address.country ?? ""} onChange={(e) => {setAddress({ ...address, country: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
        </div>

      </section>

      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Documento de identidad</h3>
        <p>Para validar tu identidad, sube tanto el dorso como el reverso de tu DNI (documento de identidad, cédula de identidad, carné de identidad, tarjeta de identidad, carnet de identidad, cédula de ciudadanía)</p>
        {editing && (
          <>
            <button
              onClick={() => idDocumentInputRef.current?.click()}
              className="bg-senary hover:bg-secondary text-tertiary px-3 py-2 text-sm rounded-md"
              disabled={!user}
            >
              Subir documento
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={idDocumentInputRef}
              onChange={(e) => handleGalleryUpload(e, MediaTypes.ID_DOCUMENT)}
            />
          </>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2">
          {images?.id_document?.map((file, index) => (
            <div key={index} className="relative w-full aspect-video rounded-md overflow-hidden">
              <Image
                src={URL.createObjectURL(file)}
                fill
                alt={`gallery ${index + 1}`}
                loading="lazy"
                style={{ objectFit: "contain" }}
              />
              <button className="relative mt-1 mr-1" onClick={(e) => removeImage(e, index, MediaTypes.ID_DOCUMENT)}>
                <FaXmark size={25} color="#d31f4f"/>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Certificados de trabajo</h3>
        <p>si has cursado algun tipo de carrera, clases, curso, etc..., que certifiquen la legitimidad de tus conocimientos en el servicio que ofreces, esto te añadira mas credibilidad, poor favor subelos.</p>
        {editing && (
          <>
            <button
              onClick={() => certificateInputRef.current?.click()}
              className="bg-senary hover:bg-secondary text-tertiary px-3 py-2 text-sm rounded-md"
              disabled={!user}
            >
              Subir certificados
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={certificateInputRef}
              onChange={(e) => handleGalleryUpload(e, MediaTypes.CERTIFICATE)}
            />
          </>
        )}
        <div className="grid grid-cols-2 gap-2">
          {images?.certificate?.map((file, index) => (
            <div key={index} className="relative w-full aspect-video rounded-md overflow-hidden">
              <Image
                src={URL.createObjectURL(file)}
                fill
                alt={`gallery ${index + 1}`}
                loading="lazy"
                style={{ objectFit: "contain" }}
              />
              <button className="relative mt-1 mr-1" onClick={(e) => removeImage(e, index, MediaTypes.CERTIFICATE)}>
                <FaXmark size={25} color="#d31f4f"/>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Trabajos realizados</h3>
        <p>si tenes experiencia laboral, por favor compartenosla</p>
        {editing && (
          <>
            <button
              onClick={() => galleryInputRef.current?.click()}
              className="bg-senary hover:bg-secondary text-tertiary px-3 py-2 text-sm rounded-md"
              disabled={!user}
            >
              Subir algunas muestras
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={galleryInputRef}
              onChange={(e) => handleGalleryUpload(e, MediaTypes.GALLERY)}
            />
          </>
        )}
        <div className="grid grid-cols-2 gap-2">
          {images?.gallery?.map((file, index) => (
            <div key={index} className="relative w-full aspect-video rounded-md overflow-hidden">
              <Image
                src={URL.createObjectURL(file)}
                fill
                alt={`gallery ${index + 1}`}
                loading="lazy"
                style={{ objectFit: "contain" }}
              />
              <button className="relative mt-1 mr-1" onClick={(e) => removeImage(e, index, MediaTypes.GALLERY)}>
                <FaXmark size={25} color="#d31f4f"/>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Botón guardar */}
      {editing && (
        <div className="p-4 sticky bottom-0">
          <div className="w-full bg-senary dark:bg-tertiary bg-opacity-75 dark:bg-opacity-75 text-quinary flex flex-col justify-center items-center">
            {errors.profilePicture && <p>{errors.profilePicture}</p>}
            {errors.title && <p>{errors.title}</p>}
            {errors.description && <p>{errors.description}</p>}
            {errors.appointmentPrice && <p>{errors.appointmentPrice}</p>}
            {errors.phone && <p>{errors.phone}</p>}
            {errors.id_document && <p>{errors.id_document}</p>}
          </div>
          <button
            className="w-full buttons py-2 font-semibold"
            onClick={(event) => submitHandler(event)}
          >
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  );
};

export default ProviderEdit;
