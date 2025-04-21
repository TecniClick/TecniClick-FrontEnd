import ServiceProviderUser from "@/components/ServiceProviderUser/ServiceProviderUser";
import { getServiceProfileById } from "@/services/profileService";
import { Metadata } from "next";


export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const user = await getServiceProfileById(params.id);

  if (!user) {
    return {
      title: "Proveedor no encontrado | TecniClick",
    };
  }

  return {
    title: `${user.userName} | TecniClick`,
  };
}


const SlugProduct = async ({ params }: { params: { id: string } }) => {

  const { id } = params;
  console.log("params:", params);
  console.log("ID recibido en SlugProduct:", id);

  const user = await getServiceProfileById(id)

  return (
    <div className="mx-[4%]">
      {user ? (
        <div className="flex justify-center items-center">
          <ServiceProviderUser {...user}
          />

        </div>
      ) : (
        <h2 className="w-full pt-[20vh] text-center">Usuario no encontrado</h2>
      )}
    </div>
  );
};

export default SlugProduct;
