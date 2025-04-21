import ServiceProviderUser from "@/components/ServiceProviderUser/ServiceProviderUser";
import { getServiceProfileById } from "@/services/profileService";
import { Metadata } from "next";

interface ProductParams {
  id: string;
}

type Props = {
  params: ProductParams;
};

export async function generateMetadata(
  { params }: Props
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

const SlugProduct = async ({ params }: Props) => {
  const { id } = params;
  console.log("params:", params);
  console.log("ID recibido en SlugProduct:", id);

  const user = await getServiceProfileById(id);

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
};

export default SlugProduct;
