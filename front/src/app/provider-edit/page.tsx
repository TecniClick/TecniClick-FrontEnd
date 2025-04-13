"use client";

import { useAuth } from "@/contexts/authContext";
import providerFormValidators from "@/helpers/providerFormValidators";
import { addressType, CategoryType, ServiceRequestType, UserType } from "@/helpers/typeMock";
import { getCategories } from "@/services/categoryService";
import { createServiceProfile } from "@/services/profileService";

import Image from "next/image";
import { useState, useRef, useEffect, MouseEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";

type dataType = {
  title?: string,
  phone?: number,
  appointmentPrice?: number,
  description?: string,
}

const PerfilProveedorEditablePage = () => {
  const { user, token } = useAuth();

  const [editing] = useState(true);
  const [data, setData] = useState<dataType>();
  const [name, setName] = useState(user?.name);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [address, setAddress] = useState<addressType>({
    extNumber: "",
    intNumber: undefined,
    street: "",
    neighborhood: "",
    zipCode: undefined,
    city: "",
    state: "",
    country: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof dataType, string>>>({});
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState("");
  const [evidencias, setEvidencias] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const profileInputRef = useRef<HTMLInputElement | null>(null);
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
      setErrors(providerFormValidators(data));
    }
  }, [data]);

  // const reviews = [
  //   {
  //     user: "Laura Gómez",
  //     comment:
  //       "Excelente trabajo, llegó puntual y dejó todo funcionando perfecto. Súper recomendado.",
  //     rating: 5,
  //   },
  //   {
  //     user: "Daniel Ruiz",
  //     comment:
  //       "Muy amable y profesional. Solucionó una fuga que otros no pudieron. Lo volveré a contratar.",
  //     rating: 5,
  //   },
  //   {
  //     user: "Marta Villalba",
  //     comment: "Buen servicio, pero se tardó un poco más de lo acordado.",
  //     rating: 3,
  //   },
  // ];

  // const promedioRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const handleAddService = () => {
    const matchedCategory = categories.find(
      (cat) => cat.name.toLowerCase() === newService.toLowerCase()
    );

    if (matchedCategory && !services.includes(matchedCategory.name)) {
      setServices([...services, matchedCategory.name]);
      setNewService("");
      setShowSuggestions(false);
      return;
    } else if (!matchedCategory) {
      toast.warning("Solo puedes agregar una categoria pre-existente");
    } else if (services.includes(matchedCategory.name)) {
      toast.warning("No puedes agregar 2 veces la misma categoria");
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setEvidencias([...evidencias, ...newImages]);
    }
  };

  const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const addressCheck = () => { if ( !address.intNumber || !address.street || !address.zipCode || !address.city || !address.state || !address.country ) { return false } else return true }
    if (token && data && data.title && name && data.description && data.phone && data.appointmentPrice && addressCheck()) {
      const request: ServiceRequestType = {
        userName: name,
        serviceTitle: data.title,
        address,
        description: data.description,
        appointmentPrice: data.appointmentPrice,
        phone: data.phone,
        category: categories[0],
      };
      const response = createServiceProfile(token, request)
      toast.promise(response, {
        loading: "Enviando Formularo...",
        success: (data: UserType) => {
          return `Formulario cargado exitosamente, un administrador validará la informacion y sus resultados llegarán en unos dias a su correo: ${data.email}`;
        },
        error: (data) => {
          // if (data == "TypeError: Failed to fetch") {
          //   data = "Problemas al conectar con el servidor. Pro favor intente iniciar sesion más tarde";
          // }
          return `Error al registrar el cargar el formulario (${data})`;
        },
      });
      return
    }
    toast.warning('rellene los campos primero');
  };

  return (
    <div className="mx-[6%] p-[3%] oscuro shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-octonary">
        <div
          className="w-24 h-24 rounded-full bg-senary overflow-hidden relative cursor-pointer group"
          onClick={() => profileInputRef.current?.click()}
        >
          {profileImage ? (
            <Image
              src={profileImage}
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

          {/* <div className="flex items-center mt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`text-yellow-400 ${
                  i < Math.round(promedioRating) ? "opacity-100" : "opacity-30"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-opacity-85">{promedioRating.toFixed(1)} / 5</span>
          </div> */}
        </div>
      </div>

      {/* Descripción */}
      <section className="p-4">
        <h3 className="text-lg font-semibold mb-2">Descripcion del servicio</h3>
        {editing ? (
          <textarea
            value={data?.description ?? ""}
            onChange={(e) => setData({...data, description: e.target.value})}
            className="w-full text-sm impunts rounded-md p-2"
            placeholder="Treabajo de carpintero los dias de semana pintando paredes y aberturas"
            rows={4}
          />
        ) : (
          <p className="text-sm">{data?.description}</p>
        )}
      </section>

      {/* Servicios */}
      <section className="p-4">
        <h3 className="text-lg font-semibold mb-2">Servicios ofrecidos</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
          {services.map((service, index) => (
            <li
              key={index}
              className="bg-senary text-tertiary p-2 rounded-md text-sm flex justify-between items-center"
            >
              {service}
              {editing && (
                <button
                  onClick={() => setServices(services.filter((_, i) => i !== index))}
                  className="text-quinary text-xs ml-2"
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
        {editing && (
          <div className="relative w-full flex flex-col sm:flex-row gap-2">
            <div className="flex flex-1 gap-2 relative">
              <input
                value={newService ?? ""}
                onChange={(e) => {
                  setNewService(e.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Nuevo servicio"
                className="flex-1 impunts rounded-md p-2 text-sm"
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              />
              <button onClick={handleAddService} className="buttons aspect-square px-3">
                <FaPlus />
              </button>

              {showSuggestions && newService.trim() !== "" && (
                <ul className="absolute top-full left-0 right-0 bg-senary dark:bg-primary border rounded-md mt-1 max-h-48 overflow-y-auto z-10 shadow">
                  {categories
                    .filter((cat) => cat.name.toLowerCase().includes(newService.toLowerCase()))
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

      {/* Precio y Telefono */}
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

      {/* Direccion */}
      <section className="p-4 flex flex-row">
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
          <input type="number" value={address.intNumber ?? ''} onChange={(e) => {setAddress({ ...address, intNumber: Number(e.target.value) });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="text" value={address.street ?? ""} onChange={(e) => {setAddress({ ...address, street: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="text" value={address.neighborhood ?? ""} onChange={(e) => {setAddress({ ...address, neighborhood: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="number" value={address.zipCode ?? ''} onChange={(e) => {setAddress({ ...address, zipCode: Number(e.target.value) });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="text" value={address.city ?? ""} onChange={(e) => {setAddress({ ...address, city: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="text" value={address.state ?? ""} onChange={(e) => {setAddress({ ...address, state: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
          <input type="text" value={address.country ?? ""} onChange={(e) => {setAddress({ ...address, country: e.target.value });}} className="mx-[0_auto] flex-1 impunts rounded-sm m-1 p-1 text-md conter" /> 
        </div>

      </section>

      {/* Galería */}
      <section className="p-4">
        <h3 className="text-lg font-semibold mb-2">Trabajos realizados</h3>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {evidencias.map((src, index) => (
            <div key={index} className="relative w-full aspect-square rounded-md overflow-hidden">
              <Image
                src={src}
                fill
                alt={`Evidencia ${index + 1}`}
                className=" object-cover !relative"
              />
            </div>
          ))}
        </div>
        {editing && (
          <div>
            <button
              onClick={() => galleryInputRef.current?.click()}
              className="bg-senary hover:bg-secondary text-tertiary px-3 py-2 text-sm rounded-md"
              disabled={!user}
            >
              Subir nueva evidencia
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={galleryInputRef}
              onChange={handleGalleryUpload}
            />
          </div>
        )}
      </section>

      {/* Opiniones */}
      {/* <section className="p-4">
        <h3 className="text-lg font-semibold mb-2">Opiniones de clientes</h3>
        {reviews.map((review, i) => (
          <div key={i} className="mb-3 p-3 bg-white shadow-sm rounded-md border border-gray-100">
            <p className="text-sm font-semibold">{review.user}</p>
            <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
            <div className="flex text-yellow-500 text-sm">
              {Array.from({ length: review.rating }, (_, j) => (
                <FaStar key={j} />
              ))}
            </div>
          </div>
        ))}
      </section> */}

      {/* Botón guardar */}
      {editing && (
        <div className="p-4 sticky bottom-0">
          <div className="w-full bg-senary dark:bg-tertiary bg-opacity-75 dark:bg-opacity-75 text-quinary flex flex-col justify-center items-center">
            {errors.title && <p>{errors.title}</p>}
            {errors.description && <p>{errors.description}</p>}
            {errors.appointmentPrice && <p>{errors.appointmentPrice}</p>}
            {errors.phone && <p>{errors.phone}</p>}
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

export default PerfilProveedorEditablePage;
