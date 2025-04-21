import ServiceProviderUser from "@/components/ServiceProviderUser/ServiceProviderUser";
import { getServiceProfileById } from "@/services/profileService";
import { Metadata } from "next";

interface ProductParams {
  id: string;
}

export async function generateMetadata(
  { params }: { params: ProductParams }
): Promise<Metadata> {
  try {
    const user = await getServiceProfileById(params.id);
    if (!user) {
      return {
        title: "Proveedor no encontrado | TecniClick",
      };
    }
    return {
      title: `${user.userName} | TecniClick`,
    };
  } catch (error) {
    console.error("Error al obtener los datos del proveedor:", error);
    return {
      title: "Proveedor no disponible | TecniClick",
    };
  }
}

export default async function Page({ params }: { params: ProductParams }) {
  const { id } = params;
  console.log("params:", params);
  console.log("ID recibido en SlugProduct:", id);

  let user;
  try {
    user = await getServiceProfileById(id);
  } catch (error) {
    console.error("Error al obtener el perfil del proveedor:", error);
    user = null; // O manejar el error de alguna otra forma.
  }

  return (
    <div className="mx-[4%]">
      {user ? (
        <div className="flex justify-center items-center">
          <ServiceProviderUser {...user} />
        </div>
      ) : (
        <h2 className="w-full pt-[20vh] text-center">Usuario no encontrado</h2>
      )}
    </div>
  );
}
